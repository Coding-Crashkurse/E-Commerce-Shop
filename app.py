from flask import Flask, request, url_for
from flask_restx import Resource, Api
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from models import setup_db, User
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
setup_db(app, database_path="postgresql://markus:test@134.122.78.140:5432/register")
CORS(app)
api = Api(
    app, version="1.0", title="Portfolio RestAPI", description="A simple portfolio API"
)
bcrypt = Bcrypt()


@api.route("/register")
class RegisterUser(Resource):
    def post(self):
        error = False

        fullname = request.get_json()["fullname"]
        email = request.get_json()["email"]
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        if is_valid_email(email) is False:
            return {"message", "Invalid Email"}, 409

        filtereduser = User.query.filter_by(email=email).one_or_none()
        if filtereduser is not None:
            return {"message": "User already exists"}, 401

        filteredusername = User.query.filter_by(username=username).one_or_none()
        if filteredusername is not None:
            return {"message": "Username already taken"}, 401

        try:
            password = bcrypt.generate_password_hash(password).decode("utf8")
            newuser = User(
                fullname=fullname, email=email, username=username, password=password
            )
            newuser.insert()
        except:
            error = True
            db.session.rollback()
            return {"error": 404}, 404
        finally:
            db.session.close()
        if error is False:
            return {"created": 201}, 201


if __name__ == "__main__":
    app.run(port=5000, debug=True)
