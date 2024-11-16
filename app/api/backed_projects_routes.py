from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_required, current_user
from app.models import db, BackedProject, Project, Reward
from app.forms import BackProjectForm, UpdateBackedProjectForm
from sqlalchemy.orm import joinedload

backed_project_routes = Blueprint('backed_projects', __name__)

def error_response(message, status_code=400):
  return jsonify({"error": message}), status_code

#Create a backing 
@backed_project_routes.route('/back', methods=['POST'])
@login_required
def back_project():
  form = BackProjectForm()
  if form.validate_on_submit():
    reward_id = form.data['reward_id']
    project_id = form.data['project_id']
      
    reward = Reward.query.filter_by(id=reward_id, project_id=project_id).first()
    if not reward:
      return error_response("Invalid reward or project", 400)

    backed_project = BackedProject(user_id=current_user.id, project_id=project_id, reward_id=reward_id)
    db.session.add(backed_project)
    db.session.commit()

    return jsonify(backed_project.to_dict()), 201
  return jsonify(form.errors), 400

# View all backedProjects by user
@backed_project_routes.route('/my-backed-projects', methods=['GET'])
@login_required
def view_backed_projects():
    try:
        backed_projects = (
            BackedProject.query
            .filter_by(user_id=current_user.id)
            .options(joinedload(BackedProject.project).joinedload(Project.category))  
            .all()
        )

        data = []
        for bp in backed_projects:
            project = bp.project
            data.append({
                "id": bp.id,
                "project_id": bp.project_id,
                "reward_id": bp.reward_id,
                "user_id": bp.user_id,
                "donation_amount": bp.donation_amount,
                "project": {
                    "id": project.id,
                    "title": project.title,
                    "description": project.description,
                    "goal": float(project.goal),
                    "amount": float(project.amount),
                    "user_id": project.user_id,
                    "category": project.category.title if project.category else None,
                },
            })

        return jsonify({"backed_projects": data, "total_backed_projects": len(data)})

    except Exception as e:
        return error_response(e, 500)

# Update backing (change reward)
@backed_project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_backed_project(id):
    data = request.get_json()
    
    if not data or not isinstance(data, dict):
        print('++++++++++++++++++++++++',data)
        return jsonify({"error": "Invalid data format"}), 400

    backed_project = BackedProject.query.get(id)

    if not backed_project or backed_project.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 404

    donation_amount = data.get('donation_amount')
    reward_id = data.get('reward_id')

    if donation_amount is not None:
        backed_project.donation_amount = donation_amount

    if reward_id is not None:
        if not isinstance(reward_id, int):
            return jsonify({"error": "reward_id must be an integer"}), 400
        backed_project.reward_id = reward_id

    db.session.commit()
    return jsonify(backed_project.to_dict()), 200

# Cancel backing 
@backed_project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_backed_project(id):
    backed_project = BackedProject.query.get(id)

    if not backed_project or backed_project.user_id != current_user.id:
      return jsonify({"error": "Unauthorized"}), 404

    db.session.delete(backed_project)
    db.session.commit()
    return jsonify({"message": "Cancelled project backing successfully"}), 200
