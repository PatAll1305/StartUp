from flask.cli import AppGroup
from ..models import environment
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .rewards import seed_rewards, undo_rewards
from .categories import seed_categories, undo_categories

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    """Seed all data."""
    if environment == 'production':
        undo_projects()
        undo_users()
        undo_rewards()
        undo_categories()

    seed_users()
    seed_projects()
    seed_rewards()
    seed_categories()

@seed_commands.command('undo')
def undo():
    """Undo all seeded data."""
    undo_projects()
    undo_users()
    undo_rewards()
    undo_categories()
