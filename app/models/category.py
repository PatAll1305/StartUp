from models.db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title
        }
