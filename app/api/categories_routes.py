from flask import Blueprint
from models.categories import Category

categories_routes = Blueprint('category', __name__)

@categories_routes.route('/', methods=['GET'])
def getCategories():
    categories = Category.query.all()
