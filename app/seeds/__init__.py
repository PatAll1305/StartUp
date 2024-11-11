from flask.cli import AppGroup
from ..models import environment
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .backedProjects import seed_backedProjects, undo_backedProjects

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    """Seed all data."""
    if environment == 'production':
        undo_backedProjects
        undo_projects()
        undo_users()
    
    seed_users()     
    seed_projects()
    seed_backedProjects()

@seed_commands.command('undo')
def undo():
    """Undo all seeded data."""
    undo_backedProjects
    undo_projects()
    undo_users()
    
