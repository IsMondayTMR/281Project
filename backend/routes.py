from flask import request, jsonify, make_response
import uuid
from werkzeug.security import check_password_hash, generate_password_hash
from backend import app
from backend import db
from backend.models import User, Card
import jwt
from functools import wraps
import logging
logging.basicConfig(level=logging.DEBUG)


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
    user = User.query.filter_by(email=data['email'])
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
        return jsonify({'token': token})

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
