from flask import Blueprint, jsonify
from ..models import Category
from .project_routes import Project

categories_routes = Blueprint('category', __name__)

@categories_routes.route('/', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])

@categories_routes.route('/<int:category_id>/projects', methods=['GET'])
def get_projects_by_category(category_id):
    projects = Project.query.filter_by(category_id=category_id).all()
    return jsonify([project.to_dict() for project in projects])
