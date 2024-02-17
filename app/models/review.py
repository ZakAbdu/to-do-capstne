from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):

    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    todo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('to-do.id')))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    review_image = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def username(self):
        return self.user.first_name + " " + self.user.last_name

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'todo_id': self.todo_id,
            'username': self.username,
            'rating': self.rating,
            'comment': self.comment,
            'reviewImage': self.review_image,
            'createdAt': self.created_at
        }