from app.db import restaurant_collection
from bson import ObjectId

def create_restaurant(name, location):
    result = restaurant_collection.insert_one({
        "name": name,
        "location": location
    })
    return str(result.inserted_id)

def get_restaurant_by_id(restaurant_id):
    return restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})
