from flask import Blueprint, jsonify
from models.categories import Category
from .project_routes import Project

categories_routes = Blueprint('category', __name__)

@categories_routes.route('/', methods=['GET'])
def getCategories():
    categories = Category.query.all()


@categories_routes.route('/categories/<int:category_id>/projects', methods=['GET'])
def get_projects_by_category(category_id):
    projects = Project.query.filter_by(category_id=category_id).all()
    return jsonify([project.to_dict() for project in projects])
