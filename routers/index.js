const express = require("express");
const homeSchema = require("../models/homeSchema");
const router = express.Router();
// const session=require('express-session');
const app=express();
// app.use(session({
//   secret: 'dsgfdh4e',
//   resave: true,
//   saveUninitialized: true,
// }))

//roter setting

router.get("/", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
//router end
const user = [];

router.post("/register", (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userData = new homeSchema({
      username,
      email,
      password,
    });
    userData.save((err) => {
      if (err) {
        res.send("Try another email");
      } else {
        res.redirect("/");
      }
    });
  } catch (err) {
    res.render("register");
  }
});

router.post('/',async(req,res)=>{
    const{
        email,
        password
    }=req.body;
    homeSchema.findOne({email:email},(err,result)=>{
        if(email=== result.email && password ===result.password){
          // req.session.email= req.body.email
            res.render('home')
        }
        else{
            res.send("check your password and email")
        }
    })
})


router.get('/adminlogin',(req,res)=>{
  res.render('adminlogin')
})


router.post('/adminlogin',(req,res)=>{
  const admin="admin@gmail.com";
  const adminpass="password";
  const {
    email,
    password
  }=req.body;
  if(admin==email && adminpass==password){
      res.render('admin')
  }
  else{
    res.send("you are not an admin")
  }
})

app.get('/add_user',(req,res)=>{
  res.render('add_user')
})

module.exports = router;
