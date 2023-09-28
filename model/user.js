var mongoose = require("mongoose");
let usersschema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
		trim: true,
	},
	lname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
  address:{
    type: String,
    required: true,
  },
  age:{
    type: Number,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  phone:{
    type:Number,
    required: true,
  },
});

var user = mongoose.model("users", usersschema);
module.exports = user;
