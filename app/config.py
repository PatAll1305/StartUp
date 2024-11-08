import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'postgresql://my_app_academy_projects_445l_user:rGbBJ1msOLY3MEt7no85ozkWKFuGR1Zb@dpg-cr5lvl5umphs73e5tc40-a.ohio-postgres.render.com/my_app_academy_projects_445l')
    SQLALCHEMY_ECHO = True
