from flask.cli import AppGroup
from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
       

        undo_projects()
        undo_users()
    seed_users()
    seed_projects
   


@seed_commands.command('undo')
def undo():
    undo_users()
    
