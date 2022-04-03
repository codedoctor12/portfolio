const express = require('express')
const port = process.env.PORT
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const multiparty = require("multiparty")
require('dotenv').config();
var timeout = require('connect-timeout')
const query = require('./query');
let alert = require('alert');
const customers = require('./models/customers')
const mongoose = require('mongoose');
app.use(express.urlencoded());
mongoose.connect(process.env.dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
  .then((result)=> console.log('connected to db'))
  .catch((err)=>console.log(err))




app.get('/allmessage',(req, res)=> {
  customers.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})
app.use(bodyParser.json())



app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/sendmessage',(req, res,next)=> {
  console.log(req.body)
  const { name, message } = req.body
  var customer = new customers ({
    name: name,
    message: message

 });
 customer.save((err, doc) => {
            if (!err){
                console.log('Works!');
              
              }
            else{
                console.log('Error during record insertion : ' + err);
              }
      });
 
})
app.use(express.static('./index'))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API '+process.env.PORT  })
})

app.get('/addRequest',(req,res)=>{

  const request = new customers({
    name : 'Mohamad',
    message: 'first messages on app.js'
  })
  request.save()
  .then((result)=>{
    res.send(result)
  })
})

app.get('/host',(req,res)=>{

  res.send(process.env.HOST)
})

app.get('/allmessage',(req, res)=> {
  customers.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})
app.listen(process.env.PORT || 30001)
