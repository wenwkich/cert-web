from flask_restful import Resource
from flask import request

from copy import deepcopy
import uuid
from bson.objectid import ObjectId

from cert_tools.instantiate_v2_certificate_batch import instantiate_assertion, instantiate_recipient, Recipient
from cert_tools import helpers
from cert_issuer.issuer import Issuer
from cert_verifier.verifier import verify_certificate_json
from cert_core import Chain, URN_UUID_PREFIX

from config import Config
from dao import DAO


class Issue(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        # get recipient from the json_data
        fields = {}
        fields["identity"] = json_data['email']
        fields["name"] = json_data['name']
        recipient = Recipient(fields)

        # get the template from db
        template_col = DAO().get_collection('certificate_template')
        template = template_col.find_one({}, {"_id": 0})

        # get deep copy of the template as cert
        cert = deepcopy(template)

        # get the config
        config = Config().get()

        # call instantiate_assertion and instantiate_recipient
        uid = str(uuid.uuid4())
        issued_on = helpers.create_iso8601_tz()
        instantiate_assertion(cert, uid, issued_on)
        instantiate_recipient(
            cert, recipient, config.additional_per_recipient_fields, config.hash_emails)

        # get the config
        config = Config().get()

        # post it to blockchain
        # first instantiate handlers
        chain = config.chain
        if chain == Chain.ethereum_mainnet or chain == Chain.ethereum_ropsten:
            from cert_issuer.blockchain_handlers import ethereum
            certificate_batch_handler, transaction_handler, connector = ethereum.instantiate_blockchain_handlers(
                config, False)
        else:
            from cert_issuer.blockchain_handlers import bitcoin
            certificate_batch_handler, transaction_handler, connector = bitcoin.instantiate_blockchain_handlers(
                config, False)

        certificate_batch_handler.certificates_to_issue = [cert]
        issuer = Issuer(
            certificate_batch_handler=certificate_batch_handler,
            transaction_handler=transaction_handler,
            max_retry=config.max_retry)
        tx_id = issuer.issue(config.chain)


        issued_cert = certificate_batch_handler.certificates_to_issue[0]
        issued_cert_to_insert = deepcopy(issued_cert)
        cert_col = DAO().get_collection("certificates")
        cert_col.insert_one(issued_cert_to_insert)
        return issued_cert

        # for testing
        # cert_col = DAO().get_collection("certificates")
        # return cert_col.find_one({'id': URN_UUID_PREFIX + "f40dd673-3e2e-4a6d-be4f-1c299a0daac5"}, {'_id': 0})



class Verify(Resource):
    def get(self, id):
        '''
        verify a certificate according to id
        '''
        cert_col = DAO().get_collection("certificates")
        cert = cert_col.find_one({'id': URN_UUID_PREFIX + id}, {'_id': 0})
        return verify_certificate_json(cert)

    def post(self):
        '''
        verify a certificate according to json posted
        '''
        json = request.get_json(force=True)

        return verify_certificate_json(json)

class Revoke(Resource):
    pass

class Cert(Resource):
    def get(self, id):
        '''
        gets a certificate
        '''
        cert_col = DAO().get_collection("certificates")
        return cert_col.find_one({'id': URN_UUID_PREFIX + id}, {'_id':0})

class Certs(Resource):
    def get(self):
        '''
        return all the certs
        '''
        cert_col = DAO().get_collection("certificates")
        certs = cert_col.find({}, {'_id': 0})
        return list(certs)

class IssuerId(Resource):
    def get(self):
        issuer_id_col = DAO().get_collection("issuer_id")
        return issuer_id_col.find_one({}, {"_id": 0})

class RevocationList(Resource):
    def get(self):
        revocation_list_col = DAO().get_collection("revocation_list")
        return revocation_list_col.find_one({}, {"_id": 0})
