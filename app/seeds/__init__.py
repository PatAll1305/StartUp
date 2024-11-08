from flask.cli import AppGroup
from .users import seed_users, undo_users

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
       

        undo_users()
    seed_users()
   


@seed_commands.command('undo')
def undo():
    undo_users()
    
