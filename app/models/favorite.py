from .db import db, environment, SCHEMA, add_prefix_for_prod

favorites = db.Table('favorites',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('toDo_id', db.Integer, db.ForeignKey(add_prefix_for_prod('to-do.id')), primary_key=True),
    db.Column('toSee_id', db.Integer, db.ForeignKey(add_prefix_for_prod('to-see.id')), primary_key=True),
    db.Column('toEat_id', db.Integer, db.ForeignKey(add_prefix_for_prod('to-eat.id')), primary_key=True)
)

if environment == 'production':
    favorites.schema = SCHEMA