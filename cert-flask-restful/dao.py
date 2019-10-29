import pymongo
from singleton import Singleton

class DAO(metaclass=Singleton):
    
    def initialize(self, config):
        self.client = pymongo.MongoClient(config.db_url)

    def get_db(self):
        return self.client["cert"]

    def get_collection(self, name):
        return self.get_db()[name]
    
