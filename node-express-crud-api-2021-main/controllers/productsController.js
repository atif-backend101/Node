const Product = require("../model/Product");
const path = require('path');
const multer = require('multer');
const FileReader = require('filereader')
var url = 'http://127.0.0.1:4000/';
const Joi = require('joi');
const session = require('express-session')
const bcrypt = require("bcrypt")
const __basedir = path.resolve();
const fs = require('fs');
const jwt = require("jsonwebtoken");

const schema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),  
})
const product_all = async (req, res) => {
    try {
      const products = await Product.find();
      const url = 'http://127.0.0.1:4000/';
      res.render('index.ejs', {quotes:products, url:url});
    } catch (error) {
      res.json({ message: error });
    }
};

// Single product
const product_details = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
      } catch (error) {
        res.json({ message: error });
      }
};

// add form products
const product_add = async (req, res) => {
    try {
        res.render('create.ejs');
      } catch (error) {
        res.json({ message: error });
      }
};
// Add New product
const product_create = async (req, res) => {

    console.log(req.body)
  console.log(Object.keys(req.file))

if(!req.file){
  res.json("invalid image format")
  return
}
const product = new Product({

        title: req.body.title,
        price: req.body.price,
        details: req.body.details,

        image:  req.file.filename
      });    
     
        const savedProduct = await product.save();
        return res.redirect('/products');  
  
};

// view single product
const product_view = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId)
        res.render('view.ejs', { quotes:product });
      } catch (error) {
        res.json({ message: error });
      }
};


// edit form products
const product_edit = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId)
        res.render('update.ejs', { quotes:product });
      } catch (error) {
        res.json({ message: error });
      }
};

// Update product
const product_update = async (req, res) => {

    try {
        const product = {
          title: req.body.title,
          price: req.body.price,
          image: req.body.image,
          details: req.body.details
        };
    
        const updatedProduct = await Product.findByIdAndUpdate(
          { _id: req.params.productId },
          product
        );
        return res.redirect('/products');
      } catch (error) {
        res.json({ message: error });
      }
};

// Delete product
const product_delete = async (req, res) => {
    try {
        const removeProduct = await Product.findByIdAndDelete(req.params.productId);
        return res.redirect('/products');
      } catch (error) {
        res.json({ message: error });
      }
};

const login = async(req, res)=> {
    res.render('login')
}

const login_check = async (req, res) => {
    var results = await Product.find({email:req.body.email}, {});
    console.log(results)
    if(results){
        sess = req.session;
    sess.email = req.body.email;
      // var check = await bcrypt.compare(req.body.password, results.password)
      
        // sess = req.session;
        // sess.email = results.email;
        res.redirect('/products')
    } else {
        res.redirect('products.signin')      
    }
};

const logout = async (req, res,next)=>{

  req.session.destroy(function(err) {
          if(err) {
              return next(err);
          } else {
              req.session = null;
              console.log("logout successful");
              return res.redirect('/products/login');
          }
      });
}

  function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
  }

module.exports = {
    product_all, 
    product_details, 
    product_add,
    product_create, 
    product_view,
    product_edit,
    product_update, 
    product_delete,
    login,
    login_check,
    logout
  }