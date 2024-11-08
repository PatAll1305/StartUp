from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
db = SQLAlchemy(app)

class Project(db.Model):
    __tablename__ = 'Projects'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    goal = db.Column(db.Numeric(10, 2), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False, default=datetime.now())
    category_id = db.Column(db.Integer, db.ForeignKey('Categories.id'), nullable=False)

    def __repr__(self):
        return f"<Project {self.title}>"

with app.app_context():
    db.create_all()
