from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    category1 = Category(id = 1, title='Art')
    category2 = Category(id = 2, title='Comics')
    category3 = Category(id = 3, title='Crafts')
    category4 = Category(id = 4, title='Design')
    category5 = Category(id = 5, title='Fashion')
    category6 = Category(id = 6, title='Film')
    category7 = Category(id = 7, title='Food')
    category8 = Category(id = 8, title='Games')
    category9 = Category(id = 9, title='Journalism')
    category10 = Category(id = 10, title='Music')
    category11 = Category(id = 11, title='Photography')
    category12 = Category(id = 12, title='Publishing')
    category13 = Category(id = 13, title='Technology')
    category14 = Category(id = 14, title='Theater')
    category15 = Category(id=15, title='Discover')

    db.session.add_all(
        [
            category1, category2, category3, category4, category5,
            category6, category7, category8, category9, category10,
            category11, category12, category13, category14, category15
        ]
    )
    db.session.commit()


def undo_categories():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
