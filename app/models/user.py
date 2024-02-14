from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):

    __tablename__ = 'users'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    _password = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)

    reviews = db.relationship('Review', cascade="all, delete-orphan", lazy="joined", backref='user')
    favorites = db.relationship('Favorite', cascade='all, delete-orphan', lazy="joined", backref='user')
    to_do = db.relationship('To_Do', cascade='all, delete-orphan', lazy="joined", backref="user")


    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, plain_password):
        self._password = plain_password

    # def check_password(self, password):
    #     return check_password_hash(self.password, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'password': self._password,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

