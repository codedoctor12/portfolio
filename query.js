var MongoClient = require('mongodb').MongoClient;


 const findCustomers = (request, response) => {
  const url = process.env.DB_URL
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    response.status(200).json(result.rows)
    db.close();
  });
});

}
module.exports = {
  findCustomers
 
}


var mongodb = require('mongodb');

module.exports = function() {

    this.getConnection = function(callback) {

        var MongoClient = mongodb.MongoClient;
        var url = process.env.DB_URL

        console.log(url);

        MongoClient.connect(url, function(err, db) {

            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                return;
            } else {
                console.log('Connection established to', url);
                return callback;
            } //else

        }); //MongoClient.connect

    }; //Connection

}
