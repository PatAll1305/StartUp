from app.models import db, BackedProject, environment, SCHEMA
from sqlalchemy.sql import text

def seed_backed_projects():
  backed_projects = [
    BackedProject(user_id=1, project_id=45, reward_id=2, donation_amount=8008.15),
    BackedProject(user_id=2, project_id=1, reward_id=1, donation_amount=1200.00),
    BackedProject(user_id=3, project_id=2, reward_id=3, donation_amount=100.00),
    BackedProject(user_id=4, project_id=3, reward_id=20, donation_amount=50.00),
    BackedProject(user_id=5, project_id=4, reward_id=5, donation_amount=203.00),
    BackedProject(user_id=3, project_id=5, reward_id=4, donation_amount=111.11),
    BackedProject(user_id=4, project_id=6, reward_id=18, donation_amount=9999.99),
    BackedProject(user_id=5, project_id=7, reward_id=6, donation_amount=202.02),
    BackedProject(user_id=2, project_id=8, reward_id=7, donation_amount=909.09),
    BackedProject(user_id=1, project_id=27, reward_id=8, donation_amount=8008.15),
    BackedProject(user_id=1, project_id=28, reward_id=15, donation_amount=8008.15),
    BackedProject(user_id=2, project_id=11, reward_id=9, donation_amount=10101.01),
    BackedProject(user_id=3, project_id=12, reward_id=10, donation_amount=8938.00),
    BackedProject(user_id=4, project_id=13, reward_id=25, donation_amount=33.22),
    BackedProject(user_id=5, project_id=14, reward_id=11, donation_amount=8989.98),
    BackedProject(user_id=4, project_id=15, reward_id=12, donation_amount=2024.00),
    BackedProject(user_id=2, project_id=16, reward_id=23, donation_amount=2025.00),
    BackedProject(user_id=3, project_id=17, reward_id=13, donation_amount=202.60),
    BackedProject(user_id=2, project_id=18, reward_id=14, donation_amount=983.03),
    BackedProject(user_id=5, project_id=19, reward_id=19, donation_amount=989.00)
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
