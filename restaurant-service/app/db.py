from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["PTS"]
restaurant_collection = db["restaurants"]
menu_collection = db["menus"]
