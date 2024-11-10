from datetime import datetime, timedelta
from flask import current_app
from sqlalchemy.sql import text
from app.models import db, Project, environment, SCHEMA

seed_projects = [
    {
        "user_id": 1,
        "title": "Project Alpha",
        "description": "A project focused on developing Alpha software features.",
        "goal": 5000.00,
        "deadline": datetime.now() + timedelta(days=30),
        "category_id": 1
    },
    {
        "user_id": 2,
        "title": "Beta Testing Project",
        "description": "Testing the new features for beta users.",
        "goal": 1500.00,
        "deadline": datetime.now() + timedelta(days=15),
        "category_id": 2
    },
    {
        "user_id": 1,
        "title": "Data Analysis Platform",
        "description": "Creating a platform for advanced data analysis.",
        "goal": 10000.00,
        "deadline": datetime.now() + timedelta(days=45),
        "category_id": 3
    },
    {
        "user_id": 3,
        "title": "E-commerce Redesign",
        "description": "Redesigning the e-commerce platform for better UX.",
        "goal": 8000.00,
        "deadline": datetime.now() + timedelta(days=60),
        "category_id": 4
    },
    {
        "user_id": 2,
        "title": "Machine Learning Pipeline",
        "description": "Building an automated pipeline for ML models.",
        "goal": 20000.00,
        "deadline": datetime.now() + timedelta(days=90),
        "category_id": 3
    },
    {
        "user_id": 4,
        "title": "Mobile App Development",
        "description": "Developing a new mobile app for iOS and Android.",
        "goal": 12000.00,
        "deadline": datetime.now() + timedelta(days=50),
        "category_id": 5
    },
    {
        "user_id": 3,
        "title": "Customer Feedback System",
        "description": "Creating a system to collect customer feedback.",
        "goal": 3000.00,
        "deadline": datetime.now() + timedelta(days=25),
        "category_id": 6
    },
    {
        "user_id": 1,
        "title": "Game Development",
        "description": "Creating an RPG game for mobile devices.",
        "goal": 15000.00,
        "deadline": datetime.now() + timedelta(days=120),
        "category_id": 7
    },
    {
        "user_id": 5,
        "title": "Real-Time Chat Application",
        "description": "Developing a real-time chat application.",
        "goal": 7000.00,
        "deadline": datetime.now() + timedelta(days=40),
        "category_id": 2
    },
    {
        "user_id": 2,
        "title": "AI Chatbot for E-commerce",
        "description": "Creating an AI-powered chatbot for customer support.",
        "goal": 2500.00,
        "deadline": datetime.now() + timedelta(days=20),
        "category_id": 8
    },
    {
        "user_id": 3,
        "title": "Social Media Integration",
        "description": "Integrating social media with the app.",
        "goal": 6000.00,
        "deadline": datetime.now() + timedelta(days=35),
        "category_id": 5
    },
    {
        "user_id": 4,
        "title": "Inventory Management System",
        "description": "Creating a system to manage product inventory.",
        "goal": 5000.00,
        "deadline": datetime.now() + timedelta(days=75),
        "category_id": 4
    },
    {
        "user_id": 1,
        "title": "Cloud Backup Service",
        "description": "Developing a backup service for cloud data.",
        "goal": 3000.00,
        "deadline": datetime.now() + timedelta(days=45),
        "category_id": 6
    },
    {
        "user_id": 5,
        "title": "Weather Forecasting Tool",
        "description": "Building a tool for advanced weather forecasting.",
        "goal": 15000.00,
        "deadline": datetime.now() + timedelta(days=110),
        "category_id": 7
    },
    {
        "user_id": 3,
        "title": "Expense Tracking App",
        "description": "Developing an app to track expenses and budgets.",
        "goal": 2000.00,
        "deadline": datetime.now() + timedelta(days=30),
        "category_id": 3
    },
    {
        "user_id": 4,
        "title": "HR Management Software",
        "description": "Creating software for managing HR tasks.",
        "goal": 13000.00,
        "deadline": datetime.now() + timedelta(days=80),
        "category_id": 2
    },
    {
        "user_id": 2,
        "title": "Streaming Video Platform",
        "description": "Building a platform for streaming video content.",
        "goal": 18000.00,
        "deadline": datetime.now() + timedelta(days=90),
        "category_id": 5
    },
    {
        "user_id": 5,
        "title": "Smart Home Controller",
        "description": "Developing a controller app for smart home devices.",
        "goal": 9500.00,
        "deadline": datetime.now() + timedelta(days=65),
        "category_id": 6
    },
    {
        "user_id": 1,
        "title": "Photo Editing Software",
        "description": "Building software for advanced photo editing.",
        "goal": 8000.00,
        "deadline": datetime.now() + timedelta(days=100),
        "category_id": 4
    },
    {
        "user_id": 4,
        "title": "Health and Fitness Tracker",
        "description": "Creating an app to track health and fitness metrics.",
        "goal": 4000.00,
        "deadline": datetime.now() + timedelta(days=50),
        "category_id": 7
    }
]
def seed_projects():
    with current_app.app_context():
        for seed in seed_projects:
         project = Project(
            user_id=seed["user_id"],
            title=seed["title"],
            description=seed["description"],
            goal=seed["goal"],
            deadline=seed["deadline"],
            category_id=seed["category_id"]
        )
        db.session.add(project)
    db.session.commit()

seed_projects()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()

