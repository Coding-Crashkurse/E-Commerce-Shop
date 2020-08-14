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
db = SQLAlchemy(app)
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
            return {"message": "Invalid Email"}, 409

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


@api.route("/login")
class UserLogin(Resource):
    def post(self):
        """Allows a new user to login with his email and password"""

        email = request.get_json()["email"]
        password = request.get_json()["password"]

        user = User.query.filter_by(email=email).one_or_none()
        print(user)

        if user is None:
            return {"message": "user does not exist"}, 404

        user = user.format()
        if bcrypt.check_password_hash(pw_hash=user["password"], password=password):

            if user["active"]:
                access_token = create_access_token(identity=user["id"])
                refresh_token = create_refresh_token(identity=user["id"])
                return (
                    {"access_token": access_token, "refresh_token": refresh_token},
                    200,
                )

            else:
                return {"message": "User not activated"}, 400

        else:
            return {"message": "Wrong credentials"}, 401


@api.route("/confirm")
class Confirm(Resource):
    def post(self):
        email = request.get_json()["email"]

        user = User.query.filter_by(email=email).one_or_none()
        if user is None:
            return {"message": "User not found"}

        token = s.dumps(email, salt="email-confirmation")

        EMAIL_ADDRESS = os.environ.get("MAIL_USERNAME")
        EMAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")

        msg = EmailMessage()
        msg["Subject"] = "Confirmation email"
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = email

        msg.set_content(
            "Please copy this confirmation link into your browser: localhost:5000/confirm/"
            + token
        )

        with smtplib.SMTP_SSL(
            os.environ.get("MAIL_SERVER"), os.environ.get("MAIL_PORT")
        ) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return {"message": "mail sent successful"}


if __name__ == "__main__":
    app.run(port=5000, debug=True)
