from flask import current_app
from sqlalchemy.sql import text
from app.models import db, Project, environment, SCHEMA
from datetime import datetime, timedelta
from datetime import datetime, timedelta

seed_project_data = [
    {
        "user_id": 1,
        "title": "Project Alpha",
        "description": "A project focused on developing Alpha software features.",
        "body": "This project will introduce essential features for alpha testing.",
        "goal": 5000.00,
        "amount": 1200.00,
        "location": "New York, NY",
        "media_url": "https://example.com/media/alpha.jpg",
        "deadline": datetime.now() + timedelta(days=30),
        "backers": 50,
        "category_id": 1
    },
    {
        "user_id": 2,
        "title": "Beta Testing Project",
        "description": "Testing the new features for beta users.",
        "body": "We will implement and test new features with selected beta users.",
        "goal": 1500.00,
        "amount": 600.00,
        "location": "San Francisco, CA",
        "media_url": "https://example.com/media/beta.jpg",
        "deadline": datetime.now() + timedelta(days=15),
        "backers": 30,
        "category_id": 2
    },
    {
        "user_id": 1,
        "title": "Data Analysis Platform",
        "description": "Creating a platform for advanced data analysis.",
        "body": "The platform will enable powerful data processing and visualization.",
        "goal": 10000.00,
        "amount": 2500.00,
        "location": "Chicago, IL",
        "media_url": "https://example.com/media/data-analysis.jpg",
        "deadline": datetime.now() + timedelta(days=45),
        "backers": 70,
        "category_id": 3
    },
    {
        "user_id": 3,
        "title": "E-commerce Redesign",
        "description": "Redesigning the e-commerce platform for better UX.",
        "body": "We aim to enhance user experience and increase sales conversions.",
        "goal": 8000.00,
        "amount": 3200.00,
        "location": "Austin, TX",
        "media_url": "https://example.com/media/ecommerce.jpg",
        "deadline": datetime.now() + timedelta(days=60),
        "backers": 45,
        "category_id": 4
    },
    {
        "user_id": 2,
        "title": "Machine Learning Pipeline",
        "description": "Building an automated pipeline for ML models.",
        "body": "The pipeline will streamline data ingestion, training, and deployment.",
        "goal": 20000.00,
        "amount": 7500.00,
        "location": "Boston, MA",
        "media_url": "https://example.com/media/ml-pipeline.jpg",
        "deadline": datetime.now() + timedelta(days=90),
        "backers": 80,
        "category_id": 3
    },
    {
        "user_id": 4,
        "title": "Mobile App Development",
        "description": "Developing a new mobile app for iOS and Android.",
        "body": "This app will cater to users seeking on-the-go solutions.",
        "goal": 12000.00,
        "amount": 4600.00,
        "location": "Los Angeles, CA",
        "media_url": "https://example.com/media/mobile-app.jpg",
        "deadline": datetime.now() + timedelta(days=50),
        "backers": 60,
        "category_id": 5
    },
    {
        "user_id": 3,
        "title": "Customer Feedback System",
        "description": "Creating a system to collect customer feedback.",
        "body": "Our system will enable real-time feedback from users.",
        "goal": 3000.00,
        "amount": 1250.00,
        "location": "Miami, FL",
        "media_url": "https://example.com/media/feedback.jpg",
        "deadline": datetime.now() + timedelta(days=25),
        "backers": 35,
        "category_id": 6
    },
    {
        "user_id": 1,
        "title": "Game Development",
        "description": "Creating an RPG game for mobile devices.",
        "body": "An immersive mobile RPG experience with unique character development.",
        "goal": 15000.00,
        "amount": 5000.00,
        "location": "Seattle, WA",
        "media_url": "https://example.com/media/game-dev.jpg",
        "deadline": datetime.now() + timedelta(days=120),
        "backers": 110,
        "category_id": 7
    },
    {
        "user_id": 5,
        "title": "Real-Time Chat Application",
        "description": "Developing a real-time chat application.",
        "body": "This chat app will support high traffic and feature-rich interfaces.",
        "goal": 7000.00,
        "amount": 2500.00,
        "location": "Philadelphia, PA",
        "media_url": "https://example.com/media/chat-app.jpg",
        "deadline": datetime.now() + timedelta(days=40),
        "backers": 90,
        "category_id": 2
    },
    {
        "user_id": 2,
        "title": "AI Chatbot for E-commerce",
        "description": "Creating an AI-powered chatbot for customer support.",
        "body": "The chatbot will handle customer inquiries autonomously.",
        "goal": 2500.00,
        "amount": 1300.00,
        "location": "Denver, CO",
        "media_url": "https://example.com/media/ai-chatbot.jpg",
        "deadline": datetime.now() + timedelta(days=20),
        "backers": 40,
        "category_id": 8
    },
    {
        "user_id": 3,
        "title": "Social Media Integration",
        "description": "Integrating social media with the app.",
        "body": "This project focuses on seamless social media connectivity.",
        "goal": 6000.00,
        "amount": 2750.00,
        "location": "Las Vegas, NV",
        "media_url": "https://example.com/media/social-media.jpg",
        "deadline": datetime.now() + timedelta(days=35),
        "backers": 55,
        "category_id": 5
    },
    {
        "user_id": 4,
        "title": "Inventory Management System",
        "description": "Creating a system to manage product inventory.",
        "body": "Our inventory system will support real-time tracking and alerts.",
        "goal": 5000.00,
        "amount": 2100.00,
        "location": "Houston, TX",
        "media_url": "https://example.com/media/inventory.jpg",
        "deadline": datetime.now() + timedelta(days=75),
        "backers": 65,
        "category_id": 4
    },
    {
        "user_id": 1,
        "title": "Cloud Backup Service",
        "description": "Developing a backup service for cloud data.",
        "body": "Secure cloud backup services for business and personal use.",
        "goal": 3000.00,
        "amount": 1400.00,
        "location": "Chicago, IL",
        "media_url": "https://example.com/media/backup.jpg",
        "deadline": datetime.now() + timedelta(days=45),
        "backers": 32,
        "category_id": 6
    },
    {
        "user_id": 5,
        "title": "Weather Forecasting Tool",
        "description": "Building a tool for advanced weather forecasting.",
        "body": "The tool will integrate real-time data for precise forecasts.",
        "goal": 15000.00,
        "amount": 7800.00,
        "location": "Portland, OR",
        "media_url": "https://example.com/media/weather.jpg",
        "deadline": datetime.now() + timedelta(days=110),
        "backers": 95,
        "category_id": 7
    },
    {
        "user_id": 3,
        "title": "Expense Tracking App",
        "description": "Developing an app to track expenses and budgets.",
        "body": "A personal finance app with budgeting and reporting features.",
        "goal": 2000.00,
        "amount": 700.00,
        "location": "Phoenix, AZ",
        "media_url": "https://example.com/media/expense.jpg",
        "deadline": datetime.now() + timedelta(days=30),
        "backers": 20,
        "category_id": 3
    },
    {
        "user_id": 4,
        "title": "HR Management Software",
        "description": "Creating software for managing HR tasks.",
        "body": "HR software with employee tracking, payroll, and benefits management.",
        "goal": 13000.00,
        "amount": 5200.00,
        "location": "Baltimore, MD",
        "media_url": "https://example.com/media/hr.jpg",
        "deadline": datetime.now() + timedelta(days=80),
        "backers": 72,
        "category_id": 2
    },
    {
        "user_id": 2,
        "title": "Streaming Video Platform",
        "description": "Building a platform for streaming video content.",
        "body": "A scalable streaming solution for media and entertainment.",
        "goal": 18000.00,
        "amount": 9200.00,
        "location": "San Diego, CA",
        "media_url": "https://example.com/media/streaming.jpg",
        "deadline": datetime.now() + timedelta(days=90),
        "backers": 110,
        "category_id": 5
    },
    {
        "user_id": 5,
        "title": "Smart Home Controller",
        "description": "Developing a controller app for smart home devices.",
        "body": "A unified controller for managing all IoT smart home devices.",
        "goal": 9500.00,
        "amount": 3600.00,
        "location": "Dallas, TX",
        "media_url": "https://example.com/media/smart-home.jpg",
        "deadline": datetime.now() + timedelta(days=65),
        "backers": 83,
        "category_id": 6
    },
    {
        "user_id": 1,
        "title": "Photo Editing Software",
        "description": "Building software for advanced photo editing.",
        "body": "A powerful photo editing tool with AI-assisted features.",
        "goal": 8000.00,
        "amount": 4100.00,
        "location": "Newark, NJ",
        "media_url": "https://example.com/media/photo-editing.jpg",
        "deadline": datetime.now() + timedelta(days=100),
        "backers": 68,
        "category_id": 4
    },
    {
        "user_id": 4,
        "title": "Health and Fitness Tracker",
        "description": "Creating an app to track health and fitness metrics.",
        "body": "Track workouts, diet, and set health goals with ease.",
        "goal": 4000.00,
        "amount": 1850.00,
        "location": "Atlanta, GA",
        "media_url": "https://example.com/media/fitness.jpg",
        "deadline": datetime.now() + timedelta(days=50),
        "backers": 60,
        "category_id": 7
    }
]

def seed_projects():
    with current_app.app_context():
        try:
            for seed in seed_project_data:
                project = Project(
                    user_id=seed["user_id"],
                    title=seed["title"],
                    description=seed["description"],
                    goal=seed["goal"],
                    deadline=seed["deadline"],
                    category_id=seed["category_id"]
                )
                print(project)
                db.session.add(project)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()

