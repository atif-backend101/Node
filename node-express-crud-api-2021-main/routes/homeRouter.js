const express = require('express');
const router = express.Router();
const homeSchema = require('../model/homeSchema')
const jwt = require("jsonwebtoken")
router.get('/signup', (err, res)=>{

	res.render('register', {tilte : 'Fill From', password:'', email:''})
})

router.post('/register', async(req, res, err)=>{
	 let jwtSecretKey = process.env.JWT_SECRET_KEY;
	    let data = {
	        time: Date(),
	        userId: 12,
	    }
	const tokens = jwt.sign(data, jwtSecretKey);	
	console.log(jwtSecretKey)
	const userData = new homeSchema({
				name: req.body.title,
		        phone: req.body.phone,
		        email: req.body.email,
		        password:  req.body.password,
		        token: tokens
			})
	
		if(req.body.password === req.body.cpassword){
			const saveUser = await userData.save();			
    		return res.redirect('/products');
		} else {
    		res.redirect('back');				
		}
})	

router.get('/signin', (err, res)=>{

	res.render('login')
})

router.post('/login', async(req, res, err)=>{
		
	const {
		email,
		password
	} = req.body;
	
	homeSchema.findOne({email:email},(err,result)=>{

		if(email === result.email && password === result.password){
			console.log('successfully logged in')
			// console.log(results)
			sess = req.session;
			return res.redirect('/products');
		} else {
			console.log(err)
		}

	})

})	


module.exports = router ;
