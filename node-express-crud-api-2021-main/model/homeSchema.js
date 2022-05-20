const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
	name:{
		type:String,
		required:true
	},
	phone:{
		type:Number,
		required:true
	},
	email:{
		type:String,
		
		required:true
	},
	password:{
		type:String,
		required:true
	},
	token:{
		type:String,
		required:true
	},
})

module.exports = mongoose.model('Users', userSchema)