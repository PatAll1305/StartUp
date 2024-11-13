from flask import Blueprint, request, jsonify
from models import db, Reward
from project_routes import check_project_ownership

reward_routes = Blueprint('reward', __name__)

@reward_routes.route('/', methods=['POST'])
@check_project_ownership
def create_reward():
    data = request.get_json()
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
@check_project_ownership
def update_reward(id):
    reward = Reward.query.get(id)
    data = request.get_json()

    reward.pledge = data.get('pledge', reward.pledge)
    reward.name = data.get('name', reward.name)
    reward.content = data.get('content', reward.content)

    db.session.commit()

    return jsonify(reward.to_dict())

@reward_routes.route('/<int:id>', methods=['Delete'])
@check_project_ownership
def delete_reward(id):
    reward = Reward.query.get(id)
    db.session.delete(reward)
    db.session.commit()
    return jsonify({'message': 'Reward removed'}), 200
