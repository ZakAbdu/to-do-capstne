
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    toDo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('to-do.id')), primary_key=True)
    # toSee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('to-see.id')), primary_key=True)
    # toEat_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('to-eat.id')), primary_key=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'todo_id': self.toDo_id
            # 'toSee_id': self.toSee_id,
            # 'toEat_id': self.toEat_id
        }