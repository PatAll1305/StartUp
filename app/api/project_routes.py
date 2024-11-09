from flask import Blueprint, request, jsonify
from ..models import db, Project
from datetime import datetime
from functools import wraps

project_routes = Blueprint('projects', __name__)

def check_project_ownership(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        project_id = kwargs.get('id')
        user_id = request.headers.get('user_id')

        if not user_id:
            return jsonify({"error": "User ID is required in headers"}), 401

        project = Project.query.get(project_id)
        if project is None:
            return jsonify({"error": "Project not found"}), 404

        if str(project.user_id) != user_id:
            return jsonify({"error": "Unauthorized access"}), 403

        return func(*args, **kwargs)
    return wrapper

@project_routes.route('/', methods=['POST'])
def create_project():
    data = request.get_json()
    new_project = Project(
        user_id=data['user_id'],
        title=data['title'],
        description=data['description'],
        goal=data['goal'],
        deadline=datetime.fromisoformat(data['deadline']),
        category_id=data['category_id']
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201

@project_routes.route('/', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@project_routes.route('/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict())

@project_routes.route('/<int:id>', methods=['PUT'])
@check_project_ownership
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.get_json()
    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.goal = data.get('goal', project.goal)
    project.deadline = datetime.fromisoformat(data['deadline']) if 'deadline' in data else project.deadline
    project.category_id = data.get('category_id', project.category_id)
    db.session.commit()
    return jsonify(project.to_dict())

@project_routes.route('/<int:id>', methods=['DELETE'])
@check_project_ownership
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted"}), 204


