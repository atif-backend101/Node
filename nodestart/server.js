
console.log('May Node be with you')


const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient


const app = express();	
app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/quotes', (req, res) => {
  console.log(req.body)
})



// MongoClient.connect('mongodb+srv://mongodb+srv://dbUser:dbUser5220@cluster0.38str.mongodb.net/users?retryWrites=true&w=majority', (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
// })



MongoClient.connect('mongodb+srv://dbUser:eqpP39TbRKKYxYaicluster0.38str.mongodb.net/test?retryWrites=true&w=majority'
	// { user:'dbUser', pass: 'eqpP39TbRKKYxYai', useNewUrlParser: true, useUnifiedTopology: true}
	, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})


// mongodb+srv://dbUser:<password>@cluster0.38str.mongodb.net/test


// db password: eqpP39TbRKKYxYai