from models.db import db

class Reward(db.Model):
    __tablename__ = 'rewards'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    pledge = db.Column(db.Numeric(10, 2), nullable=False)
    name = db.Column(db.String(100))
    content = db.Column(db.Text)
