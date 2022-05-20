const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
var Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});


app.use(bodyParser.urlencoded({
    extended: true}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/src/my-images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});

dotenv.config();
BASEURL = 'http://localhost:3000'; 
mongoose.connect(
	process.env.DB_CONNECT,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => console.log("connected to db")
)
// import routes 
const productRoutes = require("./routes/product");
const frontProductsRoutes = require("./routes/products");
// Middleware
app.use(express.json());
app.use(cors());
// route middleware
app.use("/api/products", productRoutes);
app.use("/products", frontProductsRoutes);


app.listen(3000, () => console.log("server up and running on port 3000"));

