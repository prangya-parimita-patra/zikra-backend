require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');
const User = require('./model/user')
var cors = require('cors');

mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully!')
});
connection.on('error', (err) => {
    console.log("MongoDB connection error." + err);
    process.exit();
});

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", Post);
async function Post(req, res, next) {
  console.log(req.body)
	let user = new User({
		fname:req.body.firstName,
    lname: req.body.lastName,
    email:req.body.email,
    address:req.body.address,
    phone:req.body.number,
    gender:req.body.Gender,
    age:req.body.age
  });
  let userData= await user.save()
  return(
    res.status(200).json(userData)
  )
}

app.get("/", async (req, res) => {
  res.send("It works!")
});

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3360,()=>{
  console.log('local host running')

});
module.exports = app;