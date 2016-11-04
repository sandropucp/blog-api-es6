const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/blog-api-development', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.close();
});
