from app.models import db, BackedProject, environment, SCHEMA
from sqlalchemy.sql import text

def seed_backed_projects():
  backed_projects = [
    BackedProject(user_id=1, project_id=1, reward_id=2),
    BackedProject(user_id=2, project_id=1, reward_id=1),
    BackedProject(user_id=3, project_id=2, reward_id=3),
    BackedProject(user_id=4, project_id=3, reward_id=20),
    BackedProject(user_id=5, project_id=4, reward_id=5),
    BackedProject(user_id=3, project_id=5, reward_id=4),
    BackedProject(user_id=4, project_id=6, reward_id=18),
    BackedProject(user_id=5, project_id=7, reward_id=6),
    BackedProject(user_id=2, project_id=8, reward_id=7),
    BackedProject(user_id=1, project_id=9, reward_id=8),
    BackedProject(user_id=1, project_id=10, reward_id=15),
    BackedProject(user_id=2, project_id=11, reward_id=9),
    BackedProject(user_id=3, project_id=12, reward_id=10),
    BackedProject(user_id=4, project_id=13, reward_id=25),
    BackedProject(user_id=5, project_id=14, reward_id=11),
    BackedProject(user_id=4, project_id=15, reward_id=12),
    BackedProject(user_id=2, project_id=16, reward_id=23),
    BackedProject(user_id=3, project_id=17, reward_id=13),
    BackedProject(user_id=2, project_id=18, reward_id=14),
    BackedProject(user_id=5, project_id=19, reward_id=19)
  ]

  for project in backed_projects:
    db.session.add(project)

  db.session.commit()

def undo_backed_projects():
    if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.backed_projects RESTART IDENTITY CASCADE;")
    else:
      db.session.execute(text("DELETE FROM backed_projects"))

    db.session.commit()
