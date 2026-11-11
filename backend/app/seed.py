from app import db
from app.models import Sneaker

INITIAL_SNEAKERS = [
    {
        'name': 'Adidas Japan',
        'brand': 'Adidas',
        'category': 'Lifestyle',
        'price': 120.00,
        'description': 'Classic retro low-profile trainer inspired by the 1964 Japan edition.',
        'image_filename': 'Adidas Japan.jpeg'
    },
    {
        'name': 'Adidas Samba OG',
        'brand': 'Adidas',
        'category': 'Lifestyle',
        'price': 110.00,
        'description': 'Iconic indoor football shoe turned timeless streetwear staple.',
        'image_filename': 'Adidas Samba OG.jpeg'
    },
    {
        'name': 'Adidas Superstar II',
        'brand': 'Adidas',
        'category': 'Lifestyle',
        'price': 105.00,
        'description': 'Legendary shell-toe sneaker with smooth leather upper.',
        'image_filename': 'Adidas Superstar II .jpeg'
    },
    {
        'name': 'Air Jordan 1 Low',
        'brand': 'Jordan',
        'category': 'Lifestyle',
        'price': 130.00,
        'description': 'Low-top version of the classic 1985 Air Jordan 1 silhouette.',
        'image_filename': 'Air Jorda 1 Low.jpeg'
    },
    {
        'name': 'Air Jordan 1 High',
        'brand': 'Jordan',
        'category': 'Lifestyle',
        'price': 180.00,
        'description': 'The sneaker that started it all, featuring classic high-top court style.',
        'image_filename': 'Air Jordan 1.jpeg'
    },
    {
        'name': 'Air Jordan 4 Retro',
        'brand': 'Jordan',
        'category': 'Lifestyle',
        'price': 210.00,
        'description': 'Iconic 1989 basketball silhouette with visible Air cushioning and mesh panels.',
        'image_filename': 'Air Jordan 4.jpeg'
    },
    {
        'name': 'Adidas F50 Elite FG',
        'brand': 'Adidas',
        'category': 'Calcio',
        'price': 250.00,
        'description': 'Lightweight football boots engineered for explosive speed on firm ground.',
        'image_filename': 'Calcio Adidas F50.jpeg'
    },
    {
        'name': 'Nike Zoom Mercurial Vapor 16 (ZM 10)',
        'brand': 'Nike',
        'category': 'Calcio',
        'price': 260.00,
        'description': 'Responsive Air Zoom football cleats designed for fast-paced play.',
        'image_filename': 'Calcio Nike ZM 10.jpeg'
    },
    {
        'name': 'Puma Future Ultimate 9',
        'brand': 'Puma',
        'category': 'Calcio',
        'price': 220.00,
        'description': 'Adaptive football boots built for agility, playmaking, and ball control.',
        'image_filename': 'Calcio Puma Ultimate 9.jpeg'
    },
    {
        'name': 'New Balance 1000',
        'brand': 'New Balance',
        'category': 'Lifestyle',
        'price': 150.00,
        'description': 'Futuristic turn-of-the-millennium runner reissued with modern comfort.',
        'image_filename': 'New Balance 1000.jpeg'
    },
    {
        'name': 'New Balance 530',
        'brand': 'New Balance',
        'category': 'Lifestyle',
        'price': 115.00,
        'description': 'Breathable mesh and synthetic everyday runner with ABZORB cushioning.',
        'image_filename': 'New Balance 530.jpeg'
    },
    {
        'name': 'New Balance 9060',
        'brand': 'New Balance',
        'category': 'Lifestyle',
        'price': 160.00,
        'description': 'Bold Y2K-inspired chunky sneaker with dual-density midsole.',
        'image_filename': 'New Balance 9060.jpeg'
    },
    {
        'name': 'Puma Rebound V6 Low',
        'brand': 'Puma',
        'category': 'Lifestyle',
        'price': 75.00,
        'description': 'Court-inspired low-top everyday sneaker with soft cushioning.',
        'image_filename': 'Puma basse Rebound V6.jpeg'
    },
    {
        'name': 'Puma Rebound V6 Mid',
        'brand': 'Puma',
        'category': 'Lifestyle',
        'price': 85.00,
        'description': 'Retro basketball-inspired mid-top sneaker for daily wear.',
        'image_filename': 'Puma Rebound V6.jpeg'
    },
    {
        'name': 'Puma Speedcat OG',
        'brand': 'Puma',
        'category': 'Lifestyle',
        'price': 110.00,
        'description': 'Motorsport-inspired suede silhouette originally crafted for Formula 1 drivers.',
        'image_filename': 'Puma Speedcat.jpeg'
    }
]


def seed_sneakers():
    if Sneaker.query.count() == 0:
        for item in INITIAL_SNEAKERS:
            sneaker = Sneaker(**item)
            db.session.add(sneaker)
        db.session.commit()

