from flask import request, jsonify, make_response
import uuid
from werkzeug.security import check_password_hash, generate_password_hash
from backend import app
from backend import db
from backend.models import User, Card, Transaction, Vehicle
import jwt
from functools import wraps
import logging
logging.basicConfig(level=logging.DEBUG)

from backend import test_carla
import datetime;

import pymongo
from base64 import encodebytes

def token_required(f):  # takes in function f, then wraps f, then return f with a new argument 'current_user'
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'token is missing'}), 401

        try:
            app.logger.debug(token)
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            app.logger.debug(data['public_id'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):  # current_user always comes first
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'no user found'})

    user_data = {'public_id': user.public_id, 'first_name': user.first_name, 'last_name': user.last_name,
                 'password': user.password, 'admin': user.admin, 'email': user.email}

    return jsonify({'user': user_data})


@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):  # current_user always comes first
    if not current_user.admin:
        return jsonify({'message': 'you do not have access to all users'}), 403

    users = User.query.all()
    output = []

    for user in users:
        user_data = {'public_id': user.public_id, 'first_name': user.first_name, 'last_name': user.last_name,
                     'password': user.password, 'admin': user.admin, 'email': user.email}
        output.append(user_data)

    return jsonify({"users": output})


@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    # check if request body is missing some value
    if 'email' not in data or 'first_name' not in data or 'last_name' not in data or 'password' not in data:
        return jsonify({'message': 'missing data, must have first name, last name, email, and password'}), 400

    password_hash = generate_password_hash(data['password'], method='sha256')
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({'message': 'email has been registered before'}), 409

    new_user = User(public_id=str(uuid.uuid4()), first_name=data['first_name'], last_name=data['last_name'],
                    email=data['email'], password=password_hash, admin=False)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'new user saved'}), 200


@app.route('/user/<public_id>', methods=['PUT'])
@token_required
def update_user(current_user, public_id):  # current_user always comes first
    if current_user.public_id != public_id:
        return jsonify({'message': 'can not update an user other than yourself'})

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'no user found'})

    data = request.get_json()
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    db.session.commit()

    return jsonify({'message': 'user info updated'})


# uses http basic authentication
@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required'})

    user = User.query.filter_by(email=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id': user.public_id}, app.config['JWT_SECRET_KEY'])  # default algorithm is HA256
        return jsonify({'token': token, 'admin': user.admin})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required'})


@app.route('/card', methods=['POST'])
@token_required
def create_card(current_user):
    data = request.get_json()
    # check if request body is missing some value
    if 'exp' not in data or 'name' not in data or 'type' not in data or 'card_number' not in data:
        return jsonify({'message': 'missing data, must have card number, type, name, and exp'}), 400

    card = Card.query.filter_by(card_number=data['card_number']).first()
    if card:
        return jsonify({'message': 'card has been registered before'}), 409

    user = User.query.filter_by(id=current_user.id).first()
    new_card = Card(name=data['name'], card_number=data['card_number'],
                    exp=data['exp'], type=data['type'], user_id=user.id)
    db.session.add(new_card)
    db.session.commit()

    return jsonify({'message': 'new card saved'}), 200


@app.route('/card/<card_id>', methods=['DELETE'])
@token_required
def delete_card(current_user, card_id):
    card = Card.query.filter_by(id=card_id).first()

    if not card:
        return jsonify({'message': 'no card to be deleted'}), 400
    if card.user_id != current_user.id:
        return jsonify({'message': 'card is not yours'}), 403

    db.session.delete(card)
    db.session.commit()

    return jsonify({'message': 'card deleted'}), 200


@app.route('/card', methods=['GET'])
@token_required
def get_all_cards(current_user):
    cards = Card.query.filter_by(user_id=current_user.id)

    output = []
    for card in cards:
        data = {'card_number': card.card_number, 'type': card.type, 'id': card.id, 'exp': card.exp, 'name': card.name}
        output.append(data)

    return jsonify({'cards': output})


@app.route('/start', methods=['POST'])
@token_required
def start_trip(current_user):
    model = request.args.get('model')
    color = request.args.get('color')
    departure = request.args.get('departure')
    destination = request.args.get('destination')
    if not model or not color or not destination or not departure:
        return jsonify({'message': 'missing data, must have model, color, departure, destination'}), 400

    # get vehicle id
    vehicle = Vehicle.query.filter((Vehicle.model == model) & (Vehicle.color == color)).first()
    # add 1 to vehicle transaction count
    vehicle.tx_count = vehicle.tx_count + 1
    db.session.commit()

    # start simulation
    trip_duration = test_carla.start_taxi(vehicle.id, model, color, departure, destination)

    # get finish time & start time
    end_time = datetime.datetime.now()
    start_time = end_time - datetime.timedelta(seconds=trip_duration)

    # bill current_user
    payment = 0.5 * trip_duration

    return jsonify({'message': 'success',
                    'start_time': start_time,
                    'end_time': end_time,
                    'duration': trip_duration,
                    'payment': payment})


@app.route('/pay', methods=['POST'])
@token_required
def create_transaction(current_user):
    data = request.get_json()

    if 'c_num' not in data or 'payment_method' not in data or 'car_model' not in data or 'car_color' not in data\
        or 'start_time' not in data or 'end_time' not in data or 'start_location' not in data\
        or 'end_location' not in data or 'payment' not in data:
        return jsonify({'message': 'missing data'}), 400

    new_tx = Transaction(u_id=current_user.id, c_num=data['c_num'], payment_method=data['payment_method'],
                         car_model=data['car_model'], car_color=data['car_color'], start_time=data['start_time'],
                         end_time=data['end_time'], start_location=data['start_location'], end_location=data['end_location'],
                         payment=data['payment'])
    db.session.add(new_tx)
    db.session.commit()

    return jsonify({'message': 'transaction complete'}), 200


@app.route('/transaction', methods=['GET'])
@token_required
def get_transaction_history(current_user):
    transactions = Transaction.query.filter_by(u_id=current_user.id)

    output = []
    for tx in transactions:
        data = {'payment_method': tx.payment_method, 'card_number': tx.c_num, 'start_time': tx.start_time, 'end_time': tx.end_time, 'start_location': tx.start_location, 'end_location': tx.end_location, 'car_model': tx.car_model, 'car_color': tx.car_color, 'payment': tx.payment}
        output.append(data)
    return jsonify({'transaction_history': output})


@app.route('/inventory', methods=['GET'])
@token_required
def get_all_inventory(current_user):
    if not current_user.admin:
        return jsonify({'message': 'only the admin can get inventory'}), 400

    vehicles = Vehicle.query.all()

    output = []
    for car in vehicles:
        data = {'id': car.id, 'model': car.model, 'color': car.color, 'maintenance': car.maintenance, 'accidents': car.accidents, 'transactions': car.tx_count}
        output.append(data)
    return jsonify({'vehicle list': output})


@app.route('/inventory', methods=['POST'])
@token_required
def add_inventory(current_user):
    if not current_user.admin:
        app.logger.debug(current_user.email)
        app.logger.debug(current_user.admin)
        return jsonify({'message': 'only the admin can add inventory'}), 400

    data = request.get_json()
    if 'model' not in data or 'color' not in data:
        return jsonify({'message': 'missing data, must have model and color'}), 400

    new_car = Vehicle(model=data['model'], color=data['color'], maintenance=0, accidents=0, tx_count=0)
    db.session.add(new_car)
    db.session.commit()

    return jsonify({'message': 'new car added to inventory'}), 200


@app.route('/inventory/<car_id>', methods=['DELETE'])
@token_required
def delete_inventory(current_user, car_id):
    if not current_user.admin:
        return jsonify({'message': 'only the admin can delete inventory'}), 400

    car = Vehicle.query.filter_by(id=car_id).first()

    if not car:
        return jsonify({'message': 'no car to be deleted'}), 400

    db.session.delete(car)
    db.session.commit()

    return jsonify({'message': 'vehicle deleted'}), 200


@app.route('/inventory/<car_id>', methods=['PUT'])
@token_required
def update_inventory(current_user, car_id):
    if not current_user.admin:
        return jsonify({'message': 'only the admin can update inventory'}), 400

    car = Vehicle.query.filter_by(id=car_id).first()

    if not car:
        return jsonify({'message': 'no inventory found'})

    data = request.get_json()

    if data['maintenance'] != 'None':
        car.maintenance = data['maintenance']

    if data['accidents'] != 'None':
        car.accidents = data['accidents']

    if data['transactions'] != 'None':
        car.tx_count = data['transactions']
    db.session.commit()

    return jsonify({'message': 'inventory info updated'})


@app.route('/sensordata/<car_id>', methods=['GET'])
@token_required
def get_sensor_data(current_user, car_id):
    if not current_user.admin:
        return jsonify({'message': 'only the admin can get sensor data'}), 400

    # mongo db connection
    connection_url = 'mongodb+srv://admin:HKEX9h2Sni5NtQU11dla@cluster0.sa5c7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    m_client = pymongo.MongoClient(connection_url)

    carla_db = m_client.get_database('carla_data')
    carla_img = carla_db.carla_image

    myquery = {"v_id": f'{car_id}'}
    mydoc = carla_img.find(myquery)

    output = []
    print("pic_count", mydoc.count())
    for x in range(mydoc.count()):
        #img = blosc.unpack_array(mydoc[x]['img'])
        img = mydoc[x]['img']
        data = {'v_id': mydoc[x]['v_id'], 'frame': mydoc[x]['frame'], 'timestamp': mydoc[x]['timestamp'], 'image': f'{img}'}
        output.append(data)

    print("output_count", len(output))
    # close mongo db connection
    m_client.close()

    return jsonify({'sensor data list': output})
