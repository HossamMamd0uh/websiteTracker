from flask import Flask, jsonify, request, redirect, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
import os
from datetime import datetime 
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import JWTManager , create_access_token
from flask_login import current_user

# Instantiation
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreact'
app.config['JWT_SECRET_KEY'] = 'secret'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
websiteHistory = []
# Settings
CORS(app)

# Database
db = mongo.db.users
db_website = mongo.db.websites

# Routes
@app.route('/users/register', methods=['POST'])
def createUser():

  id = db.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'password': bcrypt.generate_password_hash(request.json['password']).decode('utf-8'),
    'created': datetime.utcnow()
  })
  return jsonify(str(ObjectId(id)) + 'registered') 


@app.route('/users/login', methods=['POST'])
def loginUser():
  email = request.json['email']
  password = request.json['password']
  print(request.json)
  result = ""

  response = db.find_one({'email': email})
  if response:
    if bcrypt.check_password_hash(response['password'], password):
      access_token = create_access_token(identity = {
                'name': response['name'],
                'email': response['email']
            })
      print(access_token)
      result = jsonify({'token':access_token})

    else:
      result = jsonify({"error":"Invalid username and password"})
  else:
    result = jsonify({"result":"No results found"})
  return result

@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
  user = db.find_one({'_id': ObjectId(id)})
  print(user)
  return jsonify({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'email': user['email'],
      'password': user['password']
  })


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
  db.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'User Deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
  print(request.json)
  db.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  }})
  return jsonify({'message': 'User Updated'})

@app.route('/websites', methods=['POST'])
def createWebsite():
  print(request.json)
  id = db_website.insert({
    'websiteName': request.json['websiteName'],
    'websiteURL': request.json['websiteURL'],
    'websiteStatus': '',
    'websiteHistory': []
  })
  return jsonify(str(ObjectId(id)))

@app.route('/websites', methods=['GET'])

def getWebsites():
    websites = []
    for doc in db_website.find():
        websites.append({
            '_id': str(ObjectId(doc['_id'])),
            'websiteName': doc['websiteName'],
            'websiteURL': doc['websiteURL'],
            'websiteStatus': doc['websiteStatus'],
            'websiteHistory': doc['websiteHistory']
        })
    return jsonify(websites)


@app.route('/websites/<id>', methods=['GET'])
def getWebsite(id):
  website = db_website.find_one({'_id': ObjectId(id)})
  print(website)
  return jsonify({
      '_id': str(ObjectId(website['_id'])),
      'websiteName': website['websiteName'],
      'websiteURL': website['websiteURL'],
      'websiteStatus': website['websiteStatus'],
      'websiteHistory': website['websiteHistory']
  })

@app.route('/websitecheck/<id>', methods=['GET'])
def checkWebsite(id):
  website = db_website.find_one({'_id': ObjectId(id)})
  host = website['websiteURL']
  
  respone = os.system("ping -c 1" + host)
  if respone == 0:
      websiteHistory.append('is up at ' + str(datetime.utcnow()))
      db_website.update_one({'_id': ObjectId(id)}, {"$push": {

    'websiteHistory': websiteHistory
  }})
      db_website.update_one({'_id': ObjectId(id)}, {"$set": {
        'websiteStatus': 'is up'
      }})
    
  else:
      websiteHistory.append('is down at '  + str(datetime.utcnow()))
      db_website.update_one({'_id': ObjectId(id)}, {"$push": {
    'websiteHistory': websiteHistory
  }})
      db_website.update_one({'_id': ObjectId(id)}, {"$set": {
        'websiteStatus': 'is Down'
      }})
  
  return jsonify({'message': 'Website Checked'})
  

@app.route('/websites/<id>', methods=['DELETE'])
def deleteWebsite(id):
  db_website.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'Website Deleted'})

@app.route('/websites/<id>', methods=['PUT'])
def updateWebsite(id):
  print(request.json)
  db_website.update_one({'_id': ObjectId(id)}, {"$set": {
    'websiteName': request.json['websiteName'],
    'websiteURL': request.json['websiteURL']
  }})
  return jsonify({'message': 'Website Updated'})

if __name__ == "__main__":
    app.run(debug=True)
