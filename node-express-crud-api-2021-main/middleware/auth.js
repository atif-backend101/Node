const jwt = require("jsonwebtoken");
const register = require('../model/homeSchema');
const homeSchema = require('../model/homeSchema')


const auth = async (req, res, next)=> {
	var email = req.body.email;
    sess = req.session;
    if(sess.email){
    	next();
    } else {
    	res.redirect('/products/login')
    }
}


module.exports = auth;