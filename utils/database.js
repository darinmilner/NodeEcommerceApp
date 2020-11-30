const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://dbuser:dbuser@cluster0.bcy4w.mongodb.net/Restaurant-App?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("DB connected");
      _db = result.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }

  throw "No Database Found!";
};
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
