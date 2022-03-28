const express = require('express')
const port = process.env.PORT
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const multiparty = require("multiparty")
require('dotenv').config();
let alert = require('alert');

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


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
app.post("/send", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
       alert('Error 500');
      } else {
      	 alert('Email successfully sent to recipient!!')
      }
    });
  });
});


app.listen(process.env.PORT || port)
