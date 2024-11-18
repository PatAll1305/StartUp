from sqlalchemy.sql import text
from app.models import db, Project, environment, SCHEMA
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
        "media_url": "https://yt3.googleusercontent.com/EWx42Dd538aX19hZtLvFdpxNFwVAvuurEPb39iFVgew2j2TmRg6pqHHDsabsMyXg1JUnOj8e=s900-c-k-c0x00ffffff-no-rj",
        "deadline": datetime.now() + timedelta(days=30),
        "category_id": 13
    },
    {
        "user_id": 2,
        "title": "Beta Testing Project",
        "description": "Testing the new features for beta users.",
        "body": "We will implement and test new features with selected beta users.",
        "goal": 1500.00,
        "amount": 600.00,
        "location": "San Francisco, CA",
        "media_url": "https://images.javatpoint.com/tutorial/software-testing/images/beta-testing-logo.png",
        "deadline": datetime.now() + timedelta(days=15),
        "category_id": 13
    },
    {
        "user_id": 1,
        "title": "Data Analysis Platform",
        "description": "Creating a platform for advanced data analysis.",
        "body": "The platform will enable powerful data processing and visualization.",
        "goal": 10000.00,
        "amount": 2500.00,
        "location": "Chicago, IL",
        "media_url": "https://www.sagedata.net/wp-content/uploads/2021/07/cohort-analysis.png",
        "deadline": datetime.now() + timedelta(days=45),
        "category_id": 4
    },
    {
        "user_id": 3,
        "title": "E-commerce Redesign",
        "description": "Redesigning the e-commerce platform for better UX.",
        "body": "We aim to enhance user experience and increase sales conversions.",
        "goal": 8000.00,
        "amount": 3200.00,
        "location": "Austin, TX",
        "media_url": "https://scandiweb.com/blog/wp-content/uploads/2023/03/customer-centric-ecommerce-redesign-banner-2.png",
        "deadline": datetime.now() + timedelta(days=60),
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
        "media_url": "https://www.xenonstack.com/hs-fs/hubfs/xenonstack-machine-learning-pipeline.png?width=1280&height=720&name=xenonstack-machine-learning-pipeline.png",
        "deadline": datetime.now() + timedelta(days=90),
        "category_id": 13
    },
    {
        "user_id": 4,
        "title": "Mobile App Development",
        "description": "Developing a new mobile app for iOS and Android.",
        "body": "This app will cater to users seeking on-the-go solutions.",
        "goal": 12000.00,
        "amount": 4600.00,
        "location": "Los Angeles, CA",
        "media_url": "https://www.orientsoftware.com/Themes/Content/Images/blog/2024-04-22/mobile-app-development-trend.jpg",
        "deadline": datetime.now() + timedelta(days=50),
        "category_id": 13
    },
    {
        "user_id": 3,
        "title": "Customer Feedback System",
        "description": "Creating a system to collect customer feedback.",
        "body": "Our system will enable real-time feedback from users.",
        "goal": 3000.00,
        "amount": 1250.00,
        "location": "Miami, FL",
        "media_url": "https://www.rapidoform.com/be/images/blog/Customer%20Feedback%20System.png",
        "deadline": datetime.now() + timedelta(days=25),
        "category_id": 13
    },
    {
        "user_id": 1,
        "title": "Game Development",
        "description": "Creating an RPG game for mobile devices.",
        "body": "An immersive mobile RPG experience with unique character development.",
        "goal": 15000.00,
        "amount": 5000.00,
        "location": "Seattle, WA",
        "media_url": "https://hiretop.com/content/images/2023/05/Masters-in-Game-Development.jpeg",
        "deadline": datetime.now() + timedelta(days=120),
        "category_id": 8
    },
    {
        "user_id": 5,
        "title": "Real-Time Chat Application",
        "description": "Developing a real-time chat application.",
        "body": "This chat app will support high traffic and feature-rich interfaces.",
        "goal": 7000.00,
        "amount": 2500.00,
        "location": "Philadelphia, PA",
        "media_url": "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
        "deadline": datetime.now() + timedelta(days=40),
        "category_id": 13
    },
    {
        "user_id": 2,
        "title": "AI Chatbot for E-commerce",
        "description": "Creating an AI-powered chatbot for customer support.",
        "body": "The chatbot will handle customer inquiries autonomously.",
        "goal": 2500.00,
        "amount": 1300.00,
        "location": "Denver, CO",
        "media_url": "https://miro.medium.com/v2/resize:fit:1400/0*RPJnm1-q-d7dJoTK.png",
        "deadline": datetime.now() + timedelta(days=20),
        "category_id": 6
    },
    {
        "user_id": 3,
        "title": "Social Media Integration",
        "description": "Integrating social media with the app.",
        "body": "This project focuses on seamless social media connectivity.",
        "goal": 6000.00,
        "amount": 2750.00,
        "location": "Las Vegas, NV",
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPcMz6yKhiYJ_-MQKKh3gpq2lSW4dYWGLQw&s",
        "deadline": datetime.now() + timedelta(days=35),
        "category_id": 6
    },
    {
        "user_id": 4,
        "title": "Inventory Management System",
        "description": "Creating a system to manage product inventory.",
        "body": "Our inventory system will support real-time tracking and alerts.",
        "goal": 5000.00,
        "amount": 2100.00,
        "location": "Houston, TX",
        "media_url": "https://www.waoconnect.com/wp-content/uploads/2020/07/Inventory-Management-System-Pic.jpg",
        "deadline": datetime.now() + timedelta(days=75),
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
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YlMSjU6kzrybBPc4utNPlJyWv08mC_XGeA&s",
        "deadline": datetime.now() + timedelta(days=45),
        "category_id": 13
    },
    {
        "user_id": 5,
        "title": "Weather Forecasting Tool",
        "description": "Building a tool for advanced weather forecasting.",
        "body": "The tool will integrate real-time data for precise forecasts.",
        "goal": 15000.00,
        "amount": 7800.00,
        "location": "Portland, OR",
        "media_url": "https://letstalkscience.ca/sites/default/files/2019-09/weather-station-in-iceland.jpg",
        "deadline": datetime.now() + timedelta(days=110),
        "category_id": 13
    },
    {
        "user_id": 3,
        "title": "Expense Tracking App",
        "description": "Developing an app to track expenses and budgets.",
        "body": "A personal finance app with budgeting and reporting features.",
        "goal": 2000.00,
        "amount": 700.00,
        "location": "Phoenix, AZ",
        "media_url": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d6/33/3d/d6333d62-028e-cfb0-badd-84a14c5b23dd/AppIcon-1x_U007emarketing-0-7-0-0-85-220-0.png/256x256bb.jpg",
        "deadline": datetime.now() + timedelta(days=30),
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
        "media_url": "https://planetpci-tech.com/wp-content/uploads/2020/07/best-human-resource-management-software.png",
        "deadline": datetime.now() + timedelta(days=80),
        "category_id": 13
    },
    {
        "user_id": 2,
        "title": "Streaming Video Platform",
        "description": "Building a platform for streaming video content.",
        "body": "A scalable streaming solution for media and entertainment.",
        "goal": 18000.00,
        "amount": 9200.00,
        "location": "San Diego, CA",
        "media_url": "https://www.vdocipher.com/blog/wp-content/uploads/2023/07/Roadmap-to-create-a-video-streaming-website.png",
        "deadline": datetime.now() + timedelta(days=90),
        "category_id": 6
    },
    {
        "user_id": 5,
        "title": "Smart Home Controller",
        "description": "Developing a controller app for smart home devices.",
        "body": "A unified controller for managing all IoT smart home devices.",
        "goal": 9500.00,
        "amount": 3600.00,
        "location": "Dallas, TX",
        "media_url": "https://cielowigle.com/wp-content/uploads/2021/03/woman-controlling-smart-home-appliances.jpg",
        "deadline": datetime.now() + timedelta(days=65),
        "category_id": 13
    },
    {
        "user_id": 1,
        "title": "Photo Editing Software",
        "description": "Building software for advanced photo editing.",
        "body": "A powerful photo editing tool with AI-assisted features.",
        "goal": 8000.00,
        "amount": 4100.00,
        "location": "Newark, NJ",
        "media_url": "https://www.cleveroad.com/images/article-previews/basic-features-to-integrate-to-a-filter-app-63-3x.webp",
        "deadline": datetime.now() + timedelta(days=100),
        "category_id": 11
    },
    {
        "user_id": 4,
        "title": "Health and Fitness Tracker",
        "description": "Creating an app to track health and fitness metrics.",
        "body": "Track workouts, diet, and set health goals with ease.",
        "goal": 4000.00,
        "amount": 1850.00,
        "location": "Atlanta, GA",
        "media_url": "https://www.apptunix.com/blog/wp-content/uploads/sites/3/2020/04/Health-Tracking-apps.jpg",
        "deadline": datetime.now() + timedelta(days=50),
        "category_id": 7
    },
    {
    "user_id": 2,
    "title": "Online Learning Platform",
    "description": "Creating a platform for virtual learning courses.",
    "body": "The platform will offer a variety of online courses.",
    "goal": 5000.00,
    "amount": 2100.00,
    "location": "Detroit, MI",
    "media_url": "https://inoxoft.com/wp-content/uploads/2024/04/2_2-scaled.jpg.webp",
    "deadline": datetime.now() + timedelta(days=35),
    "category_id": 15
    },
    {
    "user_id": 3,
    "title": "Blockchain Wallet Development",
    "description": "Developing a secure blockchain wallet.",
    "body": "The wallet will support multiple cryptocurrencies.",
    "goal": 8000.00,
    "amount": 3500.00,
    "location": "Miami, FL",
    "media_url": "https://www.antiersolutions.com/wp-content/uploads/2023/05/banner02-3-1.jpg",
    "deadline": datetime.now() + timedelta(days=55),
    "category_id": 13
    },
    {
    "user_id": 4,
    "title": "Food Delivery App",
    "description": "Creating an app to streamline food delivery services.",
    "body": "The app will provide real-time delivery tracking.",
    "goal": 9000.00,
    "amount": 4600.00,
    "location": "Los Angeles, CA",
    "media_url": "https://www.businessofapps.com/wp-content/uploads/2022/01/emizen_tech_food_deliver_img1.png",
    "deadline": datetime.now() + timedelta(days=60),
    "category_id": 7
    },
    {
    "user_id": 5,
    "title": "Digital Art Marketplace",
    "description": "Building a platform for digital art sales.",
    "body": "Artists can sell and showcase their digital work.",
    "goal": 7000.00,
    "amount": 3700.00,
    "location": "San Francisco, CA",
    "media_url": "https://www.antiersolutions.com/wp-content/uploads/2022/09/image_2022_09_27T11_49_39_879Z.png.webp",
    "deadline": datetime.now() + timedelta(days=65),
    "category_id": 1
    },
    {
    "user_id": 1,
    "title": "VR Travel Experience",
    "description": "Providing a virtual reality travel experience.",
    "body": "Users can explore travel destinations virtually.",
    "goal": 15000.00,
    "amount": 7200.00,
    "location": "New York, NY",
    "media_url": "https://www-sygic.akamaized.net/content/14-blog/0-2017/20170927-explore-the-world-with-sygic-travel-vr/1.png",
    "deadline": datetime.now() + timedelta(days=80),
    "category_id": 11
    },
    {
    "user_id": 3,
    "title": "AI Writing Assistant",
    "description": "Developing an AI-powered tool for writing assistance.",
    "body": "This assistant will help users with grammar and style.",
    "goal": 5000.00,
    "amount": 2500.00,
    "location": "Seattle, WA",
    "media_url": "https://writerzen.net/storage/photos/1/blog-3.2/ai-writing-assistant-enhance-not-replace-writers-creativity.webp",
    "deadline": datetime.now() + timedelta(days=50),
    "category_id": 13
    },
    {
    "user_id": 2,
    "title": "Language Learning App",
    "description": "Building an app for language learning.",
    "body": "The app will feature interactive lessons and quizzes.",
    "goal": 100000.00,
    "amount": 11308.15,
    "location": "San Diego, CA",
    "media_url": "https://storage.googleapis.com/static-greenice-net/public/posts/122%20-%20Language%20Learning/language%20website%20steps.png",
    "deadline": datetime.now() + timedelta(days=90),
    "category_id": 15
    },
    {
    "user_id": 4,
    "title": "Home Automation System",
    "description": "Developing a system for home automation.",
    "body": "Control and monitor home devices remotely.",
    "goal": 120000.00,
    "amount": 13008.15,
    "location": "Houston, TX",
    "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV0vIZW7-KtSzMA84e2nEs-I75FLpgYtnEWA&s",
    "deadline": datetime.now() + timedelta(days=75),
    "category_id": 13
    },
    {
    "user_id": 5,
    "title": "Electric Vehicle Charging App",
    "description": "Creating an app to find EV charging stations.",
    "body": "Users can locate and pay for charging stations.",
    "goal": 15000.00,
    "amount": 6300.00,
    "location": "Phoenix, AZ",
    "media_url": "https://images.tristatetechnology.com/blog-images/uploads/2021/12/EV-charging-station-finder-App-Work.jpg",
    "deadline": datetime.now() + timedelta(days=110),
    "category_id": 13
    },
    {
    "user_id": 3,
    "title": "Eco-friendly Packaging",
    "description": "Developing sustainable packaging options.",
    "body": "Reducing plastic waste through alternative packaging.",
    "goal": 4000.00,
    "amount": 1500.00,
    "location": "Chicago, IL",
    "media_url": "https://calbizjournal.com/wp-content/uploads/2023/09/recycled-boxes.jpg",
    "deadline": datetime.now() + timedelta(days=25),
    "category_id": 4
    },
    {
    "user_id": 2,
    "title": "Virtual Workout Trainer",
    "description": "Building a virtual workout platform.",
    "body": "Users can access customized workout plans.",
    "goal": 5000.00,
    "amount": 2500.00,
    "location": "Dallas, TX",
    "media_url": "https://example.com/media/virtual-workout.jpg",
    "deadline": datetime.now() + timedelta(days=45),
    "category_id": 13
    },
    {
    "user_id": 1,
    "title": "Pet Tracking Device",
    "description": "Developing a GPS device for pet tracking.",
    "body": "Pet owners can monitor their pet’s location in real-time.",
    "goal": 8000.00,
    "amount": 3600.00,
    "location": "Austin, TX",
    "media_url": "https://example.com/media/pet-tracking.jpg",
    "deadline": datetime.now() + timedelta(days=60),
    "category_id": 13
    },
    {
    "user_id": 4,
    "title": "Gardening Community App",
    "description": "Creating an app for gardening enthusiasts.",
    "body": "Users can share tips, track plant growth, and connect.",
    "goal": 3000.00,
    "amount": 1500.00,
    "location": "Sacramento, CA",
    "media_url": "https://example.com/media/gardening.jpg",
    "deadline": datetime.now() + timedelta(days=35),
    "category_id": 3
    },
    {
    "user_id": 5,
    "title": "Smart Lighting Solutions",
    "description": "Developing smart lighting systems for homes.",
    "body": "Control lighting remotely with an app.",
    "goal": 9500.00,
    "amount": 4200.00,
    "location": "Atlanta, GA",
    "media_url": "https://example.com/media/smart-lighting.jpg",
    "deadline": datetime.now() + timedelta(days=65),
    "category_id": 13
    },
    {
    "user_id": 3,
    "title": "Children’s E-Book Platform",
    "description": "Creating a digital platform for children’s books.",
    "body": "Access a wide range of e-books for children.",
    "goal": 6000.00,
    "amount": 2900.00,
    "location": "Denver, CO",
    "media_url": "https://example.com/media/ebooks.jpg",
    "deadline": datetime.now() + timedelta(days=40),
    "category_id": 12
    },
    {
    "user_id": 1,
    "title": "Eco-Friendly Building Materials",
    "description": "Creating sustainable building materials.",
    "body": "Materials will reduce carbon footprint.",
    "goal": 20000.00,
    "amount": 9100.00,
    "location": "San Jose, CA",
    "media_url": "https://example.com/media/building-materials.jpg",
    "deadline": datetime.now() + timedelta(days=100),
    "category_id": 3
    },
    {
    "user_id": 2,
    "title": "Music Production Software",
    "description": "Developing software for digital music production.",
    "body": "A full suite for recording, editing, and producing music.",
    "goal": 15000.00,
    "amount": 6000.00,
    "location": "Orlando, FL",
    "media_url": "https://example.com/media/music-production.jpg",
    "deadline": datetime.now() + timedelta(days=95),
    "category_id": 10
    },
    {
    "user_id": 3,
    "title": "AI-Powered Email Marketing",
    "description": "Creating AI tools for email marketing campaigns.",
    "body": "Automate and optimize email marketing.",
    "goal": 4000.00,
    "amount": 2200.00,
    "location": "Boston, MA",
    "media_url": "https://example.com",
    "deadline": datetime.now() + timedelta(days=95),
    "category_id": 13
    },
    {
    "user_id": 2,
    "title": "Music Production Software",
    "description": "Developing software for digital music production.",
    "body": "A full suite for recording, editing, and producing music.",
    "goal": 15000.00,
    "amount": 6000.00,
    "location": "Orlando, FL",
    "media_url": "https://example.com/media/music-production.jpg",
    "deadline": datetime.now() + timedelta(days=95),
    "category_id": 10
    },
    {
    "user_id": 3,
    "title": "Used 1 trillion FPS camera",
    "description": "Small time short film maker who needs a slow-motion capable camera.",
    "body": "Your donations will help me make more short films and possibly become a director one day.",
    "goal": 4000.00,
    "amount": 2200.00,
    "location": "Boston, MA",
    "media_url": "https://example.com/media/email-marketing.jpg",
    "deadline": datetime.now() + timedelta(days=50),
    "category_id": 6
    },
    {
    "user_id": 5,
    "title": "Remote Job Board Platform",
    "description": "Building a job board for remote work opportunities.",
    "body": "Focused on connecting remote workers with employers worldwide.",
    "goal": 8000.00,
    "amount": 3700.00,
    "location": "New York, NY",
    "media_url": "https://example.com/media/job-board.jpg",
    "deadline": datetime.now() + timedelta(days=45),
    "category_id": 4
    },
    {
    "user_id": 4,
    "title": "AI-Enhanced Video Editing Software",
    "description": "Video editing software with AI features.",
    "body": "Simplifies editing through AI-based recommendations.",
    "goal": 25000.00,
    "amount": 10000.00,
    "location": "Los Angeles, CA",
    "media_url": "https://example.com/media/video-editing.jpg",
    "deadline": datetime.now() + timedelta(days=80),
    "category_id": 6
    },
    {
    "user_id": 1,
    "title": "Eco-Friendly Transportation App",
    "description": "App promoting eco-friendly commute options.",
    "body": "Incentivizes sustainable travel methods.",
    "goal": 5000.00,
    "amount": 1500.00,
    "location": "San Francisco, CA",
    "media_url": "https://example.com/media/eco-transport.jpg",
    "deadline": datetime.now() + timedelta(days=35),
    "category_id": 15
    },
    {
    "user_id": 5,
    "title": "Voice-Controlled Smart Home Devices",
    "description": "Developing voice-activated smart home solutions.",
    "body": "Focuses on convenient, hands-free operation for users.",
    "goal": 7000.00,
    "amount": 3000.00,
    "location": "Portland, OR",
    "media_url": "https://example.com/media/voice-home.jpg",
    "deadline": datetime.now() + timedelta(days=55),
    "category_id": 4
    },
    {
    "user_id": 3,
    "title": "3D Printing for Prosthetics",
    "description": "Using 3D printing to create custom prosthetics.",
    "body": "Aims to make prosthetics more affordable and accessible.",
    "goal": 20000.00,
    "amount": 9200.00,
    "location": "Chicago, IL",
    "media_url": "https://example.com/media/3d-prosthetics.jpg",
    "deadline": datetime.now() + timedelta(days=75),
    "category_id": 3
    },
    {
    "user_id": 4,
    "title": "AI-Driven Investment Portfolio",
    "description": "Creating an AI-based portfolio manager for investments.",
    "body": "Helps users make data-driven investment decisions.",
    "goal": 15000.00,
    "amount": 6700.00,
    "location": "Seattle, WA",
    "media_url": "https://example.com/media/investment-ai.jpg",
    "deadline": datetime.now() + timedelta(days=85),
    "category_id": 9
    },
    {
    "user_id": 2,
    "title": "Sustainable Farming Solutions",
    "description": "Platform for eco-friendly farming practices.",
    "body": "Resources and tools to promote sustainable agriculture.",
    "goal": 12000.00,
    "amount": 4500.00,
    "location": "Phoenix, AZ",
    "media_url": "https://example.com/media/farming.jpg",
    "deadline": datetime.now() + timedelta(days=70),
    "category_id": 7
    },
    {
    "user_id": 1,
    "title": "Online Art Gallery",
    "description": "Creating a virtual art gallery for artists worldwide.",
    "body": "Enables artists to display and sell their work online.",
    "goal": 6000.00,
    "amount": 2500.00,
    "location": "Miami, FL",
    "media_url": "https://example.com/media/online-gallery.jpg",
    "deadline": datetime.now() + timedelta(days=40),
    "category_id": 1
    },
    {
    "user_id": 1,
    "title": "Fantasy Card Battler",
    "description": "A collectible card game with fantasy characters.",
    "body": "Engage in thrilling battles using a unique deck-building system.",
    "goal": 10000.00,
    "amount": 4200.00,
    "location": "Seattle, WA",
    "media_url": "https://example.com/media/card-battler.jpg",
    "deadline": datetime.now() + timedelta(days=60),
    "category_id": 8
    },
    {
    "user_id": 2,
    "title": "Open-World Survival RPG",
    "description": "An immersive survival experience in a vast open world.",
    "body": "Explore, craft, and survive in this expansive RPG.",
    "goal": 20000.00,
    "amount": 8500.00,
    "location": "Austin, TX",
    "media_url": "https://example.com/media/survival-rpg.jpg",
    "deadline": datetime.now() + timedelta(days=90),
    "category_id": 8
    },
    {
    "user_id": 3,
    "title": "Virtual Reality Puzzle Game",
    "description": "Solve intricate puzzles in a fully immersive VR environment.",
    "body": "Test your wits and immerse yourself in a unique VR world.",
    "goal": 15000.00,
    "amount": 5000.00,
    "location": "San Francisco, CA",
    "media_url": "https://example.com/media/vr-puzzle.jpg",
    "deadline": datetime.now() + timedelta(days=75),
    "category_id": 8
    },
    {
    "user_id": 4,
    "title": "Interactive Mystery Adventure",
    "description": "A story-driven mystery game with branching narratives.",
    "body": "Uncover secrets and make choices that shape the outcome.",
    "goal": 12000.00,
    "amount": 4600.00,
    "location": "Chicago, IL",
    "media_url": "https://example.com/media/mystery-adventure.jpg",
    "deadline": datetime.now() + timedelta(days=50),
    "category_id": 8
    },
    {
    "user_id": 5,
    "title": "Mobile Arcade Platformer",
    "description": "Fast-paced platforming action with endless challenges.",
    "body": "Perfect your timing and reflexes in this arcade-style game.",
    "goal": 5000.00,
    "amount": 2000.00,
    "location": "Los Angeles, CA",
    "media_url": "https://example.com/media/arcade-platformer.jpg",
    "deadline": datetime.now() + timedelta(days=30),
    "category_id": 8
    },
    {
        "user_id": 1,
        "title": "Pixel Art Roguelike",
        "description": "A procedurally generated roguelike with retro pixel art.",
        "body": "Battle enemies, collect loot, and survive as long as you can.",
        "goal": 7000.00,
        "amount": 3200.00,
        "location": "Portland, OR",
        "media_url": "https://example.com/media/pixel-roguelike.jpg",
        "deadline": datetime.now() + timedelta(days=40),
        "category_id": 8
    },
    {
        "user_id": 2,
        "title": "Educational Kids' Game",
        "description": "A fun and interactive game to teach math and science to kids.",
        "body": "Engaging puzzles and mini-games designed for young learners.",
        "goal": 8000.00,
        "amount": 4500.00,
        "location": "Denver, CO",
        "media_url": "https://example.com/media/kids-game.jpg",
        "deadline": datetime.now() + timedelta(days=50),
        "category_id": 8
    },
    {
        "user_id": 3,
        "title": "Sci-Fi Space Strategy Game",
        "description": "Command fleets and explore the galaxy in this strategy game.",
        "body": "Build alliances, mine resources, and conquer your enemies.",
        "goal": 20000.00,
        "amount": 9800.00,
        "location": "Miami, FL",
        "media_url": "https://example.com/media/space-strategy.jpg",
        "deadline": datetime.now() + timedelta(days=90),
        "category_id": 8
    },
    {
        "user_id": 4,
        "title": "Rhythm-Based Combat Game",
        "description": "A music-driven combat game with challenging levels.",
        "body": "Defeat enemies by syncing attacks to the beat of the music.",
        "goal": 15000.00,
        "amount": 6200.00,
        "location": "New York, NY",
        "media_url": "https://example.com/media/rhythm-combat.jpg",
        "deadline": datetime.now() + timedelta(days=70),
        "category_id": 8
    },
    {
        "user_id": 5,
        "title": "Monster Taming RPG",
        "description": "Train and battle with a variety of monsters in this RPG.",
        "body": "Capture, evolve, and master monsters in a vibrant world.",
        "goal": 12000.00,
        "amount": 5400.00,
        "location": "Chicago, IL",
        "media_url": "https://example.com/media/monster-rpg.jpg",
        "deadline": datetime.now() + timedelta(days=65),
        "category_id": 8
    },
    {
        "user_id": 1,
        "title": "Interactive Visual Novel",
        "description": "An emotional storytelling experience with player-driven choices.",
        "body": "Shape the narrative through meaningful choices and character interactions.",
        "goal": 10000.00,
        "amount": 4100.00,
        "location": "Boston, MA",
        "media_url": "https://example.com/media/visual-novel.jpg",
        "deadline": datetime.now() + timedelta(days=60),
        "category_id": 8
    },
    {
        "user_id": 2,
        "title": "Retro-Style Arcade Shooter",
        "description": "Fast-paced action with nostalgic retro aesthetics.",
        "body": "Blast through waves of enemies in this high-score chaser.",
        "goal": 6000.00,
        "amount": 3100.00,
        "location": "San Diego, CA",
        "media_url": "https://example.com/media/arcade-shooter.jpg",
        "deadline": datetime.now() + timedelta(days=45),
        "category_id": 8
    },
    {
        "user_id": 3,
        "title": "Asymmetrical Multiplayer Game",
        "description": "A competitive game with unique roles and objectives.",
        "body": "Players take on different roles to achieve their team's victory.",
        "goal": 18000.00,
        "amount": 8500.00,
        "location": "Philadelphia, PA",
        "media_url": "https://example.com/media/asymmetrical-multiplayer.jpg",
        "deadline": datetime.now() + timedelta(days=85),
        "category_id": 8
    },
    {
        "user_id": 4,
        "title": "Physics-Based Puzzle Platformer",
        "description": "Solve puzzles using innovative physics mechanics.",
        "body": "Navigate obstacles and use creative problem-solving to progress.",
        "goal": 14000.00,
        "amount": 6900.00,
        "location": "Seattle, WA",
        "media_url": "https://example.com/media/puzzle-platformer.jpg",
        "deadline": datetime.now() + timedelta(days=75),
        "category_id": 8
    },
    {
        "user_id": 5,
        "title": "Multiplayer Dungeon Crawler",
        "description": "Team up with friends to conquer challenging dungeons.",
        "body": "Collect loot, level up, and defeat epic bosses together.",
        "goal": 20000.00,
        "amount": 9200.00,
        "location": "Austin, TX",
        "media_url": "https://example.com/media/dungeon-crawler.jpg",
        "deadline": datetime.now() + timedelta(days=100),
        "category_id": 8
    }
]

def seed_projects():
    for seed in seed_project_data:
        project = Project(
            user_id=seed["user_id"],
            title=seed["title"],
            description=seed["description"],
            body=seed["body"],
            goal=seed["goal"],
            amount=seed["amount"],
            location=seed["location"],
            media_url=seed["media_url"],
            deadline=seed["deadline"],
            category_id=seed["category_id"]
        )
        db.session.add(project)
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
