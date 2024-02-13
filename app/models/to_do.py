from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class To_Do(db.Model):

    __tablename__ = 'to-do'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False, unique=True)
    cover_image = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    category= db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, default= datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)

    reviews = db.relationship('Review', cascade='all, delete-orphan', lazy="joined", backref="to-do")
    favorites = db.relationship('Favorite', cascade='all, delete-orphan', lazy="joined", backref="to-do")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'coverImage': self.cover_image,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'category': self.category,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    
