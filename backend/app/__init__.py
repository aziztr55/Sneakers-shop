import os
from flask import Flask, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(
        __name__,
        static_folder=Config.FRONTEND_BUILD_FOLDER,
        static_url_path='/'
    )
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    with app.app_context():
        from app import models
        from app.seed import seed_sneakers
        db.create_all()
        seed_sneakers()

    from app.auth_routes import auth_bp
    from app.sneaker_routes import sneaker_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(sneaker_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'ok', 'message': 'Sneakers Shop API is running'}), 200

    @app.route('/images/<path:filename>', methods=['GET'])
    def serve_image(filename):
        return send_from_directory(app.config['IMAGES_FOLDER'], filename)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        build_dir = app.config['FRONTEND_BUILD_FOLDER']
        if os.path.exists(build_dir):
            if path != '' and os.path.exists(os.path.join(build_dir, path)):
                return send_from_directory(build_dir, path)
            index_path = os.path.join(build_dir, 'index.html')
            if os.path.exists(index_path):
                return send_from_directory(build_dir, 'index.html')
        return jsonify({
            'message': 'Sneakers Shop Flask Backend is running. Start the React frontend or run npm run build.'
        }), 200

    return app

