from flask import Blueprint, request, jsonify
from app import db
from app.models import User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required.'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists.'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered.'}), 400

    user = User(username=username, email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message': 'Registration successful.',
        'user': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = (data.get('identifier') or data.get('username') or data.get('email') or '').strip()
    password = data.get('password') or ''

    if not identifier or not password:
        return jsonify({'error': 'Username/email and password are required.'}), 400

    user = User.query.filter(
        (User.username == identifier) | (User.email == identifier.lower())
    ).first()

    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username/email or password.'}), 401

    return jsonify({
        'message': 'Login successful.',
        'user': user.to_dict()
    }), 200

