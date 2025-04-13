from app.db import restaurant_collection, menu_collection
from bson import ObjectId

# ======================
# RESTAVRACIJA
# ======================

def create_restaurant(name, location):
    restaurant = {"name": name, "location": location}
    result = restaurant_collection.insert_one(restaurant)
    return str(result.inserted_id)

def get_restaurant_by_id(restaurant_id):
    return restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})


# ======================
# MENIJI
# ======================

def add_menu_item(restaurant_id, name, description, price):
    menu_item = {
        "restaurant_id": ObjectId(restaurant_id),
        "name": name,
        "description": description,
        "price": price
    }
    result = menu_collection.insert_one(menu_item)
    return str(result.inserted_id)

def get_menu_by_restaurant(restaurant_id):
    return list(menu_collection.find({"restaurant_id": ObjectId(restaurant_id)}))

def update_menu_item(menu_id, name, description, price):
    result = menu_collection.update_one(
        {"_id": ObjectId(menu_id)},
        {"$set": {"name": name, "description": description, "price": price}}
    )
    return result.modified_count > 0

def delete_menu_item(menu_id):
    result = menu_collection.delete_one({"_id": ObjectId(menu_id)})
    return result.deleted_count > 0
