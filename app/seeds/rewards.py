from app.models import db, Reward, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rewards():
    reward1 = Reward(
        project_id = 1,
        pledge=20.00,
        name='Thank You!',
        content='Personalized thank you message from the creator!'
        ),
    reward2 = Reward(
        project_id = 1,
        pledge=25.00,
        name='Early Access',
        content='Get an early first view at the project before it goes out.'
        ),
    reward3 = Reward(
        project_id = 2,
        pledge=5.25,
        name='Stickers',
        content='Receive a pack of 25 stickers inspired by the project.'
        ),
    reward4 = Reward(
        project_id = 2,
        pledge=10.00,
        name='Custom painting',
        content='Get an amazing painting, painted by the creator!'
        ),
    reward5 = Reward(
        project_id = 3,
        pledge=15.15,
        name='T-shirt',
        content='Receive a graphic t-shirt of any size of your choice inspired by the project.'),
    reward6 = Reward(
        project_id = 3,
        pledge=25.00,
        name='Signed Poster',
        content='Get a signed poster of the project artwork.'),
    reward7 = Reward(
        project_id=4,
        pledge=5.00,
        name='Digital Download',
        content='Access to a digital download of the project content.'
    )
    reward8 = Reward(
        project_id=4,
        pledge=90.00,
        name='VIP Experience',
        content='Join a private Q&A session with the creator.'
    )
    reward9 = Reward(
        project_id=5,
        pledge=20.00,
        name='Thank You Card',
        content='Receive a personalized thank you card from the creator.'
    )
    reward10 = Reward(
        project_id=5,
        pledge=50.50,
        name='Exclusive T-shirt',
        content='An exclusive project-themed t-shirt.'
    )
    reward11 = Reward(
        project_id=6,
        pledge=50.25,
        name='Early Access Pack',
        content='Access the project content before the public release.'
    )
    reward12 = Reward(
        project_id=6,
        pledge=123.00,
        name='Limited Edition Item',
        content='Receive a limited-edition collectible from the project.'
    )
    reward13 = Reward(
        project_id=7,
        pledge=68.25,
        name='Thank You Package',
        content='A thank-you note plus exclusive project stickers.'
    )
    reward14 = Reward(
        project_id=7,
        pledge=100.00,
        name='Signed Book',
        content='A signed copy of the book associated with the project.'
    )
    reward15 = Reward(
        project_id=8,
        pledge=2525.25,
        name='Producer Credit',
        content='Your name in the credits as a project supporter.'
    )
    reward16 = Reward(
        project_id=8,
        pledge=5050.50,
        name='Executive Producer Credit',
        content='Receive an executive producer credit in the project.'
    )
    reward17 = Reward(
        project_id=9,
        pledge=100.10,
        name='Exclusive Content Access',
        content='Access exclusive content only for backers.'
    )
    reward18 = Reward(
        project_id=9,
        pledge=111.11,
        name='Behind-the-Scenes Access',
        content='See behind-the-scenes content and process updates.'
    )
    reward19 = Reward(
        project_id=10,
        pledge=25.00,
        name='Special Thanks',
        content='Receive a special thanks mention in project materials.'
    )
    reward20 = Reward(
        project_id=10,
        pledge=50.00,
        name='Project Hoodie',
        content='An exclusive project-branded hoodie.'
    )
    reward21 = Reward(
        project_id=11,
        pledge=25.00,
        name='Signed Photograph',
        content='Receive a signed photograph related to the project.'
    )
    reward22 = Reward(
        project_id=11,
        pledge=30.00,
        name='Exclusive Digital Wallpaper',
        content='A high-quality digital wallpaper from the project.'
    )
    reward23 = Reward(
        project_id=12,
        pledge=20.00,
        name='Bookmark',
        content='A project-themed bookmark.'
    )
    reward24 = Reward(
        project_id=12,
        pledge=25.00,
        name='Art Print',
        content='Receive a limited-edition art print from the project.'
    ),
    reward25 = Reward(
        project_id=13,
        pledge=10.00,
        name='Digital Poster',
        content='A high-resolution digital poster of the project.'
    )
    reward26 = Reward(
        project_id=13,
        pledge=40.00,
        name='Exclusive Mug',
        content='An exclusive project-branded coffee mug.'
    )
    reward27 = Reward(
        project_id=14,
        pledge=15.00,
        name='Personalized Video Message',
        content='Receive a personalized thank you video from the creator.'
    )
    reward28 = Reward(
        project_id=14,
        pledge=70.00,
        name='Collector’s T-shirt',
        content='A limited-edition project-themed t-shirt.'
    )
    reward29 = Reward(
        project_id=15,
        pledge=5.00,
        name='Exclusive Badge',
        content='Receive a digital badge to display on your profile.'
    )
    reward30 = Reward(
        project_id=15,
        pledge=100.00,
        name='Signed Limited Edition Print',
        content='A limited edition art print, signed by the creator.'
    )
    reward31 = Reward(
        project_id=16,
        pledge=20.00,
        name='Handwritten Letter',
        content='A handwritten letter of appreciation from the creator.'
    )
    reward32 = Reward(
        project_id=16,
        pledge=120.00,
        name='VIP Backer Experience',
        content='Receive access to a special backer experience with exclusive content.'
    )
    reward33 = Reward(
        project_id=17,
        pledge=30.00,
        name='Digital Art Pack',
        content='A collection of digital artwork related to the project.'
    )
    reward34 = Reward(
        project_id=17,
        pledge=80.00,
        name='Signed Album',
        content='A signed copy of the album associated with the project.'
    )
    reward35 = Reward(
        project_id=18,
        pledge=25.00,
        name='Thank You Video',
        content='A personal thank you video from the project team.'
    )
    reward36 = Reward(
        project_id=18,
        pledge=90.00,
        name='VIP Event Ticket',
        content='Ticket to a virtual VIP event with the creator.'
    )
    reward37 = Reward(
        project_id=19,
        pledge=15.00,
        name='Project Keychain',
        content='A custom keychain inspired by the project.'
    )
    reward38 = Reward(
        project_id=19,
        pledge=60.00,
        name='Limited Edition Notebook',
        content='A limited edition project-branded notebook.'
    )
    reward39 = Reward(
        project_id=20,
        pledge=50.00,
        name='Backstage Pass',
        content='Access to behind-the-scenes project updates and content.'
    )
    reward40 = Reward(
        project_id=20,
        pledge=200.00,
        name='Framed Artwork',
        content='A framed piece of artwork from the project.'
    )

    db.session.add_all(
        [
            reward1, reward2, reward3, reward4, reward5, reward6, reward7, reward8, reward9, reward10,
            reward11, reward12, reward13, reward14, reward15, reward16, reward17, reward18, reward19, reward20,
            reward21, reward22, reward23, reward24, reward25, reward26, reward27, reward28, reward29, reward30,
            reward31, reward32, reward33, reward34, reward35, reward36, reward37, reward38, reward39, reward40
        ]
    )
    db.session.commit()

def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards"))

    db.session.commit()
