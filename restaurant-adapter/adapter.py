from flask import Flask, request, jsonify
from flask_cors import CORS
import grpc
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "proto")))
import restaurant_pb2
import restaurant_pb2_grpc

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

RESTAURANT_SERVICE_HOST = os.getenv("RESTAURANT_SERVICE_HOST", "localhost")
RESTAURANT_SERVICE_PORT = os.getenv("RESTAURANT_SERVICE_PORT", "5001")  # <-- pomembno!
GRPC_TARGET = f"{RESTAURANT_SERVICE_HOST}:{RESTAURANT_SERVICE_PORT}"

def get_grpc_stub():
    channel = grpc.insecure_channel(GRPC_TARGET)
    return restaurant_pb2_grpc.RestaurantServiceStub(channel)


# ===============================
# 📌 Restavracija
# ===============================

@app.route('/restaurants/<restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    stub = get_grpc_stub()
    request_data = restaurant_pb2.GetRestaurantRequest(id=restaurant_id)
    try:
        response = stub.GetRestaurant(request_data)
        return jsonify({
            "id": response.id,
            "name": response.name,
            "location": response.location
        }), 200
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), 500

@app.route('/restaurants', methods=['POST'])
def add_restaurant():
    stub = get_grpc_stub()
    data = request.json

    print("📥 Prejeto:", data)  # <-- dodaj to vrstico za debug

    request_data = restaurant_pb2.AddRestaurantRequest(
        name=data.get("name", ""),
        location=data.get("location", "")
    )
    try:
        response = stub.AddRestaurant(request_data)
        print("✅ gRPC odgovor:", response)  # <-- dodaj tudi to
        return jsonify({"id": response.id}), 201
    except grpc.RpcError as e:
        print("❌ gRPC napaka:", e.details())  # <-- ključna za diagnostiko
        return jsonify({"error": e.details()}), 500


# ===============================
# 📌 Meni
# ===============================

@app.route('/restaurants/<restaurant_id>/menu', methods=['GET'])
def get_menu(restaurant_id):
    stub = get_grpc_stub()
    request_data = restaurant_pb2.GetMenuRequest(restaurant_id=restaurant_id)
    try:
        response = stub.GetMenu(request_data)
        return jsonify([
            {
                "menu_id": item.menu_id,
                "name": item.name,
                "description": item.description,
                "price": item.price
            } for item in response.items
        ]), 200
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), 500

@app.route('/restaurants/<restaurant_id>/menu', methods=['POST'])
def add_menu(restaurant_id):
    stub = get_grpc_stub()
    data = request.json
    request_data = restaurant_pb2.AddMenuRequest(
        restaurant_id=restaurant_id,
        name=data.get("name", ""),
        description=data.get("description", ""),
        price=float(data.get("price", 0))
    )
    try:
        response = stub.AddMenu(request_data)
        return jsonify({"menu_id": response.menu_id}), 201
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), 500

@app.route('/restaurants/menu/<menu_id>', methods=['PUT'])
def update_menu(menu_id):
    stub = get_grpc_stub()
    data = request.json
    request_data = restaurant_pb2.UpdateMenuRequest(
        menu_id=menu_id,
        name=data.get("name", ""),
        description=data.get("description", ""),
        price=float(data.get("price", 0))
    )
    try:
        stub.UpdateMenu(request_data)
        return jsonify({"success": True}), 200
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), 500

@app.route('/restaurants/menu/<menu_id>', methods=['DELETE'])
def delete_menu(menu_id):
    stub = get_grpc_stub()
    request_data = restaurant_pb2.DeleteMenuRequest(menu_id=menu_id)
    try:
        stub.DeleteMenu(request_data)
        return jsonify({"success": True}), 200
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), 500


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
