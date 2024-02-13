from flask.cli import AppGroup
from .users import seed_users, undo_users
from .todos import seed_todo, undo_todo
from .tosees import seed_tosee, undo_tosee
from .toeats import seed_toeat, undo_toeat
from .reviews import seed_reviews, undo_reviews


from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_reviews()
        undo_toeat()
        undo_tosee()
        undo_todo()
        undo_users()
    seed_users()
    seed_todo()
    seed_tosee()
    seed_toeat()
    seed_reviews()

@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_toeat()
    undo_tosee()
    undo_todo()
    undo_users()        