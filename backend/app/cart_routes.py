from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Sneaker, CartItem, Order

cart_bp = Blueprint('cart', __name__, url_prefix='/api')


@cart_bp.route('/cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.to_dict() for item in items]), 200


@cart_bp.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    sneaker_id = data.get('sneaker_id')
    size = str(data.get('size', '42'))
    quantity = int(data.get('quantity', 1))

    if not user_id or not sneaker_id:
        return jsonify({'error': 'user_id and sneaker_id are required.'}), 400

    user = User.query.get(user_id)
    sneaker = Sneaker.query.get(sneaker_id)
    if not user or not sneaker:
        return jsonify({'error': 'Invalid user or sneaker.'}), 404

    existing_item = CartItem.query.filter_by(
        user_id=user_id,
        sneaker_id=sneaker_id,
        size=size
    ).first()

    if existing_item:
        existing_item.quantity += quantity
    else:
        existing_item = CartItem(
            user_id=user_id,
            sneaker_id=sneaker_id,
            size=size,
            quantity=quantity
        )
        db.session.add(existing_item)

    db.session.commit()
    return jsonify({
        'message': 'Added to cart.',
        'item': existing_item.to_dict()
    }), 201


@cart_bp.route('/cart/<int:item_id>', methods=['DELETE'])
def remove_from_cart(item_id):
    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'Cart item not found.'}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item removed from cart.'}), 200


@cart_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json() or {}
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({'error': 'user_id is required.'}), 400

    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({'error': 'Your cart is empty.'}), 400

    total_price = 0.0
    summary_parts = []

    for item in cart_items:
        if item.sneaker:
            line_total = item.sneaker.price * item.quantity
            total_price += line_total
            summary_parts.append(f"{item.sneaker.name} (Size {item.size}) x{item.quantity}")

    order = Order(
        user_id=user_id,
        total_price=round(total_price, 2),
        items_summary=', '.join(summary_parts)
    )
    db.session.add(order)

    for item in cart_items:
        db.session.delete(item)

    db.session.commit()

    return jsonify({
        'message': 'Order placed successfully!',
        'order': order.to_dict()
    }), 201


@cart_bp.route('/orders/<int:user_id>', methods=['GET'])
def get_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders]), 200

