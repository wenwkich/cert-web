from flask_restful import Resource
from cert_tools.create_v2_issuer import generate_issuer_file
from cert_tools.create_v2_certificate_template import create_certificate_template
from cert_tools.create_revocation_addresses import generate_revocation_addresses
from dao import DAO
from config import Config

import logging

def initialize():
    config = Config().initialize().get()
    init_mongo(config)
    init_issuer_id(config)
    init_certificate_template(config)
    init_revocation_list(config)
    return config

def init_mongo(config):
    dao = DAO()
    dao.initialize(config)

def init_issuer_id(config):
    issuer_id = generate_issuer_file(config)
    col = DAO().get_collection("issuer_id")
    if col.find_one():
        _id = col.find_one()["_id"]
        selector = {"_id": _id} 
        col.replace_one(selector, issuer_id)
    if not col.find_one():
        col.insert_one(issuer_id)
    print(issuer_id)

def init_revocation_list(config):
    revocation_list = {}
    revocation_list["@context"] = "https://w3id.org/openbadges/v2"
    revocation_list["id"] = config.domain_name_prefix + config.revocation_list_path
    revocation_list["type"] = "RevocationList"
    revocation_list["issuer"] = config.domain_name_prefix + config.issuer_id_path
    
    col = DAO().get_collection("revocation_list")
    if col.find_one():
        _id = col.find_one()["_id"]
        selector = {"_id": _id}
        col.update_one(selector, {"$set": revocation_list})
    else:
        revocation_list["revokedAssertions"] = []
        col.insert_one(revocation_list)
    print(revocation_list)
    

def init_certificate_template(config):
    template = create_certificate_template(config)
    col = DAO().get_collection("certificate_template")
    if col.find_one():
        _id = col.find_one()["_id"]
        selector = {"_id": _id}
        col.replace_one(selector, template)
    else:
        col.insert_one(template)
    print(template)
