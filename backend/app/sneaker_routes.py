from flask import Blueprint, request, jsonify
from app.models import Sneaker

sneaker_bp = Blueprint('sneakers', __name__, url_prefix='/api/sneakers')


@sneaker_bp.route('', methods=['GET'])
def get_sneakers():
    brand = request.args.get('brand')
    category = request.args.get('category')
    search = request.args.get('search')

    query = Sneaker.query

    if brand and brand.lower() != 'all':
        query = query.filter(Sneaker.brand.ilike(brand))

    if category and category.lower() != 'all':
        query = query.filter(Sneaker.category.ilike(category))

    if search:
        query = query.filter(Sneaker.name.ilike(f"%{search.strip()}%"))

    sneakers = query.all()
    return jsonify([s.to_dict() for s in sneakers]), 200


@sneaker_bp.route('/<int:sneaker_id>', methods=['GET'])
def get_sneaker_by_id(sneaker_id):
    sneaker = Sneaker.query.get(sneaker_id)
    if not sneaker:
        return jsonify({'error': 'Sneaker not found.'}), 404
    return jsonify(sneaker.to_dict()), 200

