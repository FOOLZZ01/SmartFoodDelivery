import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
    client.admin.command('ping')  # preveri povezavo
    print("✅ Povezava z MongoDB uspešna:", MONGO_URI)
except Exception as e:
    print("❌ Napaka pri povezavi z MongoDB:", e)

db = client["PTS"]
restaurant_collection = db["restaurants"]
menu_collection = db["menus"]
