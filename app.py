from flask import Flask, request, url_for
from flask_restx import Resource, Api
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import re
import os


# https://stackoverflow.com/questions/49226806/python-check-for-a-valid-email
def is_valid_email(email):
    if len(email) > 7:
        return bool(
            re.match("^.+@(\[?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?)$", email)
        )


app = Flask(__name__)
app.secret_key = "markus"
CORS(app)
api = Api(
    app, version="1.0", title="Portfolio RestAPI", description="A simple portfolio API"
)
bcrypt = Bcrypt()


@api.route("/register")
class RegisterUser(Resource):
    def post(self):
        fullname = request.get_json()["fullname"]
        email = request.get_json()["email"]
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        return {
            "fullname": fullname,
            "email": email,
            "username": username,
            "password": bcrypt.generate_password_hash(password).decode("utf-8"),
        }


if __name__ == "__main__":
    app.run(port=5000, debug=True)
