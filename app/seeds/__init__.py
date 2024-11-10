from flask.cli import AppGroup
from ..models import environment
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    """Seed all data."""
    if environment == 'production':
        undo_projects()
        undo_users()
    
    seed_users()     
    seed_projects()  

@seed_commands.command('undo')
def undo():
    """Undo all seeded data."""
    undo_projects()
    undo_users()