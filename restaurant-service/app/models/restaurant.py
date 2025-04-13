from bson import ObjectId

def serialize_restaurant(restaurant):
    return {
        "id": str(restaurant["_id"]),
        "name": restaurant["name"],
        "location": restaurant["location"]
    }

def serialize_menu(menu):
    return {
        "id": str(menu["_id"]),
        "restaurant_id": str(menu["restaurant_id"]),
        "items": menu["items"]
    }
