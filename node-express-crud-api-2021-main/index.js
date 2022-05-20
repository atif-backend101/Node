const express = require("express");
const app = express();
const bodyParser= require('body-parser')	
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const cors = require("cors");
const path = require('path');
const __basedir = path.resolve();
const flash = require('express-flash')
const jwt = require('jsonwebtoken');
const router = express.Router();
		
const initializePassport = require('./passport-config')
initializePassport(
	passport,
	email => users.find(user => user.email === email)
	)
const users = [];
const session = require('express-session')
var sess;
console.log("__dirname ===== ",__dirname)
app.use("/uploads", express.static(__dirname + "/uploads/"));
dotenv.config();
var http = require('http');
var fs = require('fs');

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);
	app.use(express.json()); //Used to parse JSON bodies
	app.set('view engine', 'ejs')
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized : true,
	cookie: { secure: true }
}))

// Import routes
const productRoutes = require("./routes/product");
const productsRoutes = require("./routes/products");
const homeRoutes = require("./routes/homeRouter");

// Middlewares
app.use(express.json());
app.use(cors());

// route Middlewares
app.use("/api/products", productRoutes);
app.use("/products",  productsRoutes);
app.use("/home", homeRoutes);


var sess; // global session, NOT recommended

router.get('/',(req,res) => {
    sess = req.session;
    if(sess.email) {
        return res.render('index.ejs');
    }
    res.json('uffffffffffff');
});

router.post('/login',(req,res) => {
    sess = req.session;
    sess.email = req.body.email;
    res.end('done');
});

	
router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('ok');
    });

});
app.use('/', router);
app.listen(4000, () => console.log("server up and runing on port 4000!"));


