from backend import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    card = db.relationship('Card')


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_number = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    exp = db.Column(db.String(20))
    name = db.Column(db.String(100))
    type = db.Column(db.String(20))

# Maintenance will be updated everytime tx_count (number of trip done by the car is updated)
# Vehicle will need one maintenance very 50 trip done


class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(50))
    color = db.Column(db.String(50))
    maintenance = db.Column(db.Boolean)
    accidents = db.Column(db.Integer)
    tx_count = db.Column(db.Integer)


class Transaction(db.Model):
    tx_id = db.Column(db.Integer, primary_key=True)
    u_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    c_num = db.Column(db.String(50))
    payment_method = db.Column(db.String(20))
    car_model = db.Column(db.String(50))
    car_color = db.Column(db.String(50))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    start_location = db.Column(db.String(50))
    end_location = db.Column(db.String(50))
    payment = db.Column(db.Integer)

