from concurrent import futures
import grpc
import logging
import os
import sys
from dotenv import load_dotenv

# 🛠️ omogoči uvoz iz app/
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
load_dotenv()

from app.proto import restaurant_pb2, restaurant_pb2_grpc
from app.services import menu_service

PORT = os.getenv("PORT", "5002")

class RestaurantServiceServicer(restaurant_pb2_grpc.RestaurantServiceServicer):
    
    # Restavracija
    def AddRestaurant(self, request, context):
        restaurant_id = menu_service.create_restaurant(request.name, request.location)
        logging.info(f"✅ Dodana restavracija z ID: {restaurant_id}")
        return restaurant_pb2.AddRestaurantResponse(id=restaurant_id)

    def GetRestaurant(self, request, context):
        restaurant = menu_service.get_restaurant_by_id(request.id)
        if not restaurant:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Restavracija ne obstaja')
            return restaurant_pb2.GetRestaurantResponse()
        return restaurant_pb2.GetRestaurantResponse(
            id=str(restaurant["_id"]),
            name=restaurant["name"],
            location=restaurant["location"]
        )

    # Meni
    def AddMenu(self, request, context):
        menu_id = menu_service.add_menu_item(
            request.restaurant_id,
            request.name,
            request.description,
            request.price
        )
        logging.info(f"✅ Dodan meni z ID: {menu_id}")
        return restaurant_pb2.AddMenuResponse(menu_id=menu_id)

    def GetMenu(self, request, context):
        menu_items = menu_service.get_menu_by_restaurant(request.restaurant_id)
        items = [
            restaurant_pb2.MenuItem(
                menu_id=str(item["_id"]),
                name=item["name"],
                description=item["description"],
                price=item["price"]
            )
            for item in menu_items
        ]
        return restaurant_pb2.GetMenuResponse(items=items)

    def UpdateMenu(self, request, context):
        updated = menu_service.update_menu_item(
            request.menu_id,
            request.name,
            request.description,
            request.price
        )
        if not updated:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("Meni ni bil najden")
            return restaurant_pb2.UpdateMenuResponse(message="Neuspešno")
        return restaurant_pb2.UpdateMenuResponse(message="Uspešno posodobljeno")

    def DeleteMenu(self, request, context):
        deleted = menu_service.delete_menu_item(request.menu_id)
        if not deleted:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("Meni ni bil najden")
            return restaurant_pb2.DeleteMenuResponse(message="Neuspešno")
        return restaurant_pb2.DeleteMenuResponse(message="Meni uspešno izbrisan")

def serve():
    logging.basicConfig(level=logging.INFO)
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    restaurant_pb2_grpc.add_RestaurantServiceServicer_to_server(RestaurantServiceServicer(), server)
    server.add_insecure_port(f"[::]:{PORT}")
    logging.info(f"🍽️ Restaurant Service running on port {PORT}")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
