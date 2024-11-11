from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Project, Reward

# Validation functions
def project_exists(form, field):
  project_id = field.data
  project = Project.query.get(project_id)
  if not project:
    raise ValidationError('The specified project does not exist.')

def reward_exists(form, field):
  reward_id = field.data
  reward = Reward.query.get(reward_id)
  if not reward:
    raise ValidationError('The specified reward does not exist.')

def reward_belongs_to_project(form, field):
  reward_id = form.reward_id.data
  project_id = form.project_id.data
  reward = Reward.query.filter_by(id=reward_id, project_id=project_id).first()
  if not reward:
    raise ValidationError('The reward does not belong to the specified project.')

### Back Project Form
class BackProjectForm(FlaskForm):
  project_id = IntegerField('Project ID', validators=[DataRequired(), project_exists])
  reward_id = IntegerField('Reward ID', validators=[DataRequired(), reward_exists, reward_belongs_to_project])

### Update Backed Project Form
class UpdateBackedProjectForm(FlaskForm):
  reward_id = IntegerField('Reward ID', validators=[DataRequired(), reward_exists])
