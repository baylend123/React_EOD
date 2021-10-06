import requests
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from app.models import db, Comment
from .config import Configuration

app = Flask(__name__)
app.config.from_object(Configuration)
db.init_app(app)
migrate = Migrate(app, db)


@app.route('/seed')
def seed_route():
    text = requests.get("https://baconipsum.com/api/?type=meat-and-filler")
    text = text.json()[0]
    for i in range(10):
        new_comment = Comment(user_name='Baylend123', body=text)
        db.session.add(new_comment)
        db.session.commit()
    return {'':''}
    
@app.route('/comments')
def commants_route():
    comments = Comment.query.all()
    return{
        'comments': {comment.id:comment.to_dict() for comment in comments}
    }

@app.route('/delete/<int:id>')
def delete(id):
    print('hi')
    deleted_comment = Comment.query.filter(Comment.id == id).first()
    Comment.query.filter(Comment.id == id).delete()
    db.session.commit()

    return {
        'deleted_comment': deleted_comment.to_dict()
    }
