from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_required, current_user
from app.models import db, BackedProject, Project, Reward
from app.forms import BackedProjectForm, UpdateBackedProjectForm

backed_project_routes = Blueprint('backed_projects', __name__)

def error_response(message, status_code=400):
  return jsonify({"error": message}), status_code

#Create a backing 
@backed_project_routes.route('/back', methods=['POST'])
@login_required
def back_project():
  try:
    form = BackedProjectForm()
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

  except SQLAlchemyError as e:
    db.session.rollback()
    return error_response("Unable to create backing.", 500)

# View all backedProjects by user
@backed_project_routes.route('/my-backed-projects', methods=['GET'])
@login_required
def view_backed_projects():
  try:
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    sort_by = request.args.get('sort_by', 'created_at')
    sort_order = request.args.get('sort_order', 'desc')

    query = BackedProject.query.filter_by(user_id=current_user.id)

    if sort_by in ['created_at', 'project_id']:
      sort_attr = getattr(BackedProject, sort_by)
      if sort_order == 'desc':
        query = query.order_by(sort_attr.desc())
      else:
        query = query.order_by(sort_attr.asc())

    paginated_backed_projects = query.paginate(page=page, per_page=per_page)
    backed_projects = [bp.to_dict() for bp in paginated_backed_projects.items]

    return jsonify({
      'backed_projects': backed_projects,
      'page': paginated_backed_projects.page,
      'total_pages': paginated_backed_projects.pages,
      'total_backed_projects': paginated_backed_projects.total
    })

  except SQLAlchemyError as e:
    return error_response("Unable to retrieve backed projects.", 500)

# Update backing (change reward)
@backed_project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_backed_project(id):
    form = UpdateBackedProjectForm()
    if form.validate_on_submit():
      backed_project = BackedProject.query.get(id)

      if not backed_project or backed_project.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 404

      backed_project.reward_id = form.data['reward_id']
      db.session.commit()
      return jsonify(backed_project.to_dict())

    return jsonify(form.errors), 400

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
