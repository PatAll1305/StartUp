from datetime import datetime
from .db import db, environment, SCHEMA

class BackedProject(db.Model):
  __tablename__ = 'backed_projects'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id' if environment == "production" else 'users.id', ondelete='CASCADE'), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.projects.id' if environment == "production" else 'projects.id', ondelete='CASCADE'), nullable=False)
  reward_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.rewards.id' if environment == "production" else 'rewards.id', ondelete='SET NULL'))
  donation_amount = db.Column(db.Numeric(10, 2), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())

  user = db.relationship('User', back_populates='backed_projects')
  project = db.relationship('Project', back_populates='backed_projects')
  reward = db.relationship('Reward', back_populates='backed_projects')
  

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'project_id': self.project_id,
      'reward_id': self.reward_id,
      'donation_amount': self.donation_amount
    }
