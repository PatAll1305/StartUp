from flask import Blueprint, request, jsonify
from ..models import db, Reward, Project
from .project_routes import check_project_ownership
from functools import wraps

reward_routes = Blueprint('reward', __name__)

def check_reward_ownership(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        project_id = kwargs.get('id')
        user_id = request.headers.get('user_id')
        if user_id == None:
            user_id = request.cookies.get('user_id')
        headers_project_id = request.headers.get('project_id')
        if project_id != headers_project_id:
            project_id = headers_project_id

        if not user_id:
            return jsonify({"error": "User ID is required in headers or as a cookie"}), 401

        project = Project.query.get(project_id)
        if project is None:
            return jsonify({"error": "Project not found"}), 404

        if str(project.user_id) != user_id:
            return jsonify({"error": "Unauthorized access"}), 403

        return func(*args, **kwargs)
    return wrapper

@reward_routes.route('/', methods=['GET'])
def get_rewards():
    rewards = Reward.query.all()
    return jsonify([reward.to_dict() for reward in rewards])

@reward_routes.route('/', methods=['POST'])
@check_reward_ownership
def create_reward():
    data = request.get_json()
    print(data)
    new_reward = Reward(
        project_id = data['project_id'],
        pledge = data['pledge'],
        name = data['name'],
        content = data['content']
    )
    db.session.add(new_reward)
    db.session.commit()
    return jsonify(new_reward.to_dict())

@reward_routes.route('/<int:id>', methods=['PUT'])
@check_reward_ownership
def update_reward(id):
    reward = Reward.query.get(id)
    data = request.get_json()

    reward.pledge = data.get('pledge', reward.pledge)
    reward.name = data.get('name', reward.name)
    reward.content = data.get('content', reward.content)

    db.session.commit()

    return jsonify(reward.to_dict())

@reward_routes.route('/<int:id>', methods=['Delete'])
@check_reward_ownership
def delete_reward(id):
    reward = Reward.query.get(id)
    db.session.delete(reward)
    db.session.commit()
    return jsonify({'message': 'Reward removed'}), 200
