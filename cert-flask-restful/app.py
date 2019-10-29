from flask import Flask, request
from flask_restful import Api
import os
import sys
import configargparse

from init import initialize
from config import Config
from apis import *

app = Flask(__name__)
api = Api(app)

if __name__ == '__main__':
    config = initialize()

    # TODO: add api of authentication
    api.add_resource(Issue, '/api/issue')
    api.add_resource(Verify, '/api/verify/<string:id>', '/api/verify')
    api.add_resource(Revoke, '/api/revoke')

    api.add_resource(Cert, '/api/cert/<string:id>.json')
    api.add_resource(Certs, '/api/certs')

    api.add_resource(IssuerId, config.issuer_id_path)
    api.add_resource(RevocationList, config.revocation_list_path)

    app.run(debug=True)
