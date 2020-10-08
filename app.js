const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function(err, client){
 if(err) return console.log(err);
 dbClient = client;
 app.locals.collection = client.db("usersdb").collection("users");
 app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
 });
});

app.get("/api/users", function(req, res){
 let collection = req.app.locals.collection;
 collection.find({}).toArray(function(err, users){
 if(err) return console.log(err);
 res.send(users)
 });
});

app.get("/api/users/:id", function(req, res){
 let id = new objectId(req.params.id);
 let collection = req.app.locals.collection;
 collection.findOne({_id: id}, function(err, user){
 if(err) return console.log(err);
 res.send(user);
 });
});

app.post("/api/users", jsonParser, function (req, res) {
 if(!req.body) return res.sendStatus(400);
 let userName = req.body.name;
 let userSurname = req.body.surname;
 let userCity = req.body.city;
 let userTelephoneNumber= req.body.telephoneNumber;
 let userEmail = req.body.email;
 let user = {
  name: userName,surname:userSurname, city:userCity,
  telephoneNumber:userTelephoneNumber,email:userEmail
 };

 let collection = req.app.locals.collection;
 collection.insertOne(user, function(err, result){
  if(err) return console.log(err);
  res.send(user);
 });
});

app.delete("/api/users/:id", function(req, res){
 let id = new objectId(req.params.id);
 let collection = req.app.locals.collection;
 collection.findOneAndDelete({_id: id}, function(err, result){
  if(err) return console.log(err);
  let user = result.value;
  res.send(user);
 });
});

app.put("/api/users", jsonParser, function(req, res){
 if(!req.body) return res.sendStatus(400);

 let id = new objectId(req.body.id);
 let userName = req.body.name;
 let userSurname = req.body.surname;
 let userTelephoneNumber= req.body.telephoneNumber;
 let userCity = req.body.city;
 let userEmail = req.body.email;

 let collection = req.app.locals.collection;
 collection.findOneAndUpdate({_id: id}, { $set:
  {
   name: userName,surname:userSurname, city:userCity,
   telephoneNumber:userTelephoneNumber,email:userEmail
  }
 },{returnOriginal: false },function(err, result){
  if(err) return console.log(err);
  let user = result.value;
  res.send(user);
 });
});

process.on("SIGINT", () => {
 dbClient.close();
 process.exit();
});
