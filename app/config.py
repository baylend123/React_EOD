import os

class Configuration():
    SQLALCHEMY_DATABASE_URI=os.environ.get('SQLALCHEMY_DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS=False