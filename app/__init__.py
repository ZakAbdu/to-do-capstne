import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')

db.init_app(app)
Migrate(app, db)
CORS(app)
