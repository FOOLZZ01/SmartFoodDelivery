import unittest
from app.services import menu_service
from bson.objectid import ObjectId

class TestRestaurantService(unittest.TestCase):

    def test_create_restaurant(self):
        restaurant_id = menu_service.create_restaurant("Testna Restavracija", "Ljubljana")
        self.assertTrue(ObjectId.is_valid(restaurant_id))

    def test_add_menu_item(self):
        restaurant_id = menu_service.create_restaurant("Testna R2", "Maribor")
        menu_id = menu_service.add_menu_item(
            restaurant_id,
            "Test Pizza",
            "Pikantna salama in sir",
            9.99
        )
        self.assertTrue(ObjectId.is_valid(menu_id))

if __name__ == '__main__':
    unittest.main()
