from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reward(db.Model):
  __tablename__ = 'rewards'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(
        db.Integer, 
        db.ForeignKey(f'{SCHEMA}.users.id' if environment == "production" else 'users.id', ondelete='CASCADE'), 
        nullable=False
    )
    pledge = db.Column(db.Numeric(10, 2), nullable=False)
    name = db.Column(db.String(100))
    content = db.Column(db.Text)

  project = db.relationship('Project', back_populates='rewards')

  def to_dict(self):
    return {
      'id': self.id,
      'project_id': self.project_id,
      'pledge': self.pledge,
      'name': self.name,
      'content': self.content
    }
