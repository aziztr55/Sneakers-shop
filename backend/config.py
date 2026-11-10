import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..'))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'sneakers-shop-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        f"sqlite:///{os.path.join(BASE_DIR, 'sneakers.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    IMAGES_FOLDER = os.path.join(PROJECT_ROOT, 'Images')
    FRONTEND_BUILD_FOLDER = os.path.join(PROJECT_ROOT, 'frontend', 'build')

