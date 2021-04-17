# Python Flask & React Hooks with Mongodb

## Backend
Using Flask.
You can find the guide here [link](backend/src/README.md)

## Frontend
Using React.
You can find the guide here [link](frontend/README.md)

## Database
Using MongoDB.
### How to install mongodb:
1. Import the public key used by the package management system `wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -`
2. Create a list file for MongoDB `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list`
3. Reload local package database `sudo apt-get update`
4. Install the MongoDB packages `sudo apt-get install -y mongodb-org`
5. Start MongoDB `sudo systemctl start mongod`