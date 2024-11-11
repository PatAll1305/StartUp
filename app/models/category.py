from models.db import db, environment, SCHEMA

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title
        }