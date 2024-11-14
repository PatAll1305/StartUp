from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .backedProjects import seed_backed_projects, undo_backed_projects
from .categories import seed_categories, undo_categories
from .rewards import seed_rewards, undo_rewards
from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_categories()
        undo_projects()
        undo_backed_projects()
        undo_rewards()
    seed_users()
    seed_projects()
    seed_backed_projects()
    seed_categories()
    seed_rewards()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_projects()
    undo_backed_projects()
    undo_categories()
    undo_rewards()
