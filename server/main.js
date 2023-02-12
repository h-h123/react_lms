const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser")
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const path = require('path')
const db = require('./database/index')
const userModel = require('./database/models/user');
const otpModel = require('./database/models/otp')
const memberModel = require('./database/models/member')
const bookModel = require("./database/models/book")
const sendMail = require('./utils/sendMail');

var app = express();


app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

db.init();


const authorization = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = data.userId;
    req.email = data.email;
    req.fname = data.fname;
    req.lname = data.lname;
    req.userType = data.userType;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
app.get('/authenticate', authorization, function(req, res){
  const obj = {
    userId: req.userId, 
    email: req.email,
    fname: req.fname,
    lname: req.lname,
    userType: req.userType
  }
  res.status(200).json(obj);
})


app.post('/register', function(req, res){
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let userType = req.body.userType;
  let password = req.body.password;
  console.log(userType);
  // res.cookie('token', 'kjdczn,mjnndzfkj', {maxAge: 9000000, httpOnly:true});

  userModel.findOne({email: email}, function(err, user){
    if(user) res.status(404).end();
    else{
      bcrypt.hash(password, 10)
      .then((hashedPassword) => {
        userModel.create({
          fname: fname,
          lname: lname,
          email: email,
          password: hashedPassword,
          userType: userType,
          isVerified: false,
        })
        .then((user)=>{
          console.log(user.email, user.fname);
          sendMail(
            user.email, 
            user.fname+" "+user.lname,
            "Welcome to LMS | Verify email",
            generateOtp(user._id),
            "verify email",
            function(err){
              if(err){
                res.status(500).end();
              }
              else{
                res.status(200).end(JSON.stringify({userId: user._id, email: user.email}));
              }
            }
          );
        })
        .catch(err =>{
          console.log(err);
          res.status(500).end();
        })
      })
    }
  })
});



function createExpiry(){
  var expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 10);
  return expiryDate;
}

function generateOtp(userId){
  let otp = ""+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
  bcrypt
  .hash(otp, 10)
  .then((hashedOtp) => {
    otpModel.updateOne(
      {userId: userId},
      {
        userId: userId,
        otp: hashedOtp,
        expireAt: createExpiry()
      },
      {upsert : true}
    )
    .then(function(res){
      console.log(res);
    })
    .catch(function(err){
      console.log(err);
    })
  })
  
  return otp;
}

app.post("/verifyUser", function(req, res){
  var userId = req.body.userId;
  var otp = req.body.otp;
  console.log(userId);
  if(!userId || !otp){
    res.status(400).end();
    return;
  }
otpModel.findOne({userId: userId})
  .then(function(value){
    var currentDate = new Date();
    console.log(value.expireAt, currentDate);
    console.log(value.expireAt.getTime() > currentDate.getTime())
    if(value.expireAt.getTime() > currentDate.getTime()){
      console.log(2);
      bcrypt
      .compare(otp, value.otp)
      .then(function(flag){
        if(flag){
          console.log(2)
          deleteOtpFromDatabase(userId);
          makeUserVerified(userId);
          console.log(2)
          res.status(200).end();
        }
        else{
          res.status(401).end();
        }
      })
      .catch(function(err){
        res.status(401).end();
      })
    }
    else{
      console.log(1);
      res.status(404).end();  
    }
  })
  .catch(function(err){
    console.log(1);
    res.status(404).end();  
  })
})


function deleteOtpFromDatabase(userId){
  otpModel.deleteMany({userId: userId})
  .then(function(del){
    console.log("1");
  })
}

function makeUserVerified(userId){
  userModel.updateOne(
    {_id: userId},
    {isVerified: true}
  ).then(function(res){
    console.log(1)
  })
}


app.post("/resendOtp", function(req, res){
  userModel.findOne({_id: req.body.userId}).then(function(user){

    sendMail(
      user.email,
      user.fname+" "+user.lname,
      "Welcome to LMS | Verify email",
      generateOtp(user._id),
      "verify email",
      function(err){
        if(err){
          res.status(500).end();
        }
        else{
          res.status(201).end();
        }
      }
    )
  })
})


app.post('/login', function(req, res){
  let email = req.body.email;
  let password = req.body.password;

  userModel.findOne({email: email})
  .then((user)=>{
    if(user.isVerified){
      bcrypt.compare(password, user.password)
      .then(flag => {
        if(flag){
          var token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
              fname: user.fname,
              lname: user.lname,
              userType: user.userType,
            }, 
            process.env.TOKEN_SECRET
          );

          res.cookie('token', token, {maxAge: 9000000, httpOnly:true});
          res.status(200).end()
        }
        else{
          console.log(err);
          res.status(401).end();
        }
      })
      .catch(err=>{
        res.status(401).end();
      })
    }
    else{
      sendMail(
        user.email, 
        user.fname+" "+user.lname,
        "Welcome to LMS | Verify email",
        generateOtp(user._id),
        "verify email",
        function(err){
          if(err){
            res.status(500).end();
          }
          else{
            res.status(201).end(JSON.stringify({userId: user._id, email: user.email}));
          }
        }
      );
    }
  })
  .catch((err)=>{
    console.log(err);
    res.status(401).end();
  })
})

app.get("/logout", authorization, function(req, res){
  res.clearCookie("token");
  res.status(200).end();
});



app.post('/addMember', authorization, function(req, res){
  
  if(req.userType != 'librarian')
    res.status(401).end();

  let obj = {
    mname: req.body.mname,
    mnumber: req.body.mnumber,
  }

      memberModel.create(obj)
      .then((member)=>{
        console.log(member)
        res.status(200).end();
      })
      .catch(err => {
        console.log(err)
        res.status(500).end();
      })
    
  })

  app.post('/removeMember', authorization, function(req, res){
  
    if(req.userType != 'librarian')
      res.status(401).end();
  
    let obj = {
      mname: req.body.mname,
      mnumber: req.body.mnumber,
    }
  
        memberModel.deleteOne(obj)
        .then((member)=>{
          console.log(member)
          res.status(200).end();
        })
        .catch(err => {
          console.log(err)
          res.status(500).end();
        })
      
    })


   
  app.post('/addBook', authorization, function(req, res){
  
      if(req.userType != 'librarian')
        res.status(401).end();
    
      let obj = {
        aname: req.body.aname,
        bname: req.body.bname
      }
    
          bookModel.create(obj)
          .then((book)=>{
            console.log(book)
            res.status(200).end();
          })
          .catch(err => {
            console.log(err)
            res.status(500).end();
          })
        
      })

  app.post('/removeBook', authorization, function(req, res){

    if(req.userType != 'librarian')
      res.status(401).end();
  
    let obj = {
      aname: req.body.aname,
      bname: req.body.bname,
    }
  
        bookModel.deleteOne(obj)
        .then((book)=>{
          console.log(book)
          res.status(200).end();
        })
        .catch(err => {
          console.log(err)
          res.status(500).end();
        })
      
    })
  
    app.post('/assignBook', authorization, function(req, res){

      if(req.userType != 'librarian')
        res.status(401).end();
    
      let obj = {
        aname: req.body.aname,
        bname: req.body.bname,
        // userName: req.body.userName
      }
    
          bookModel.findOne(obj)
          .then((book)=>{
            console.log(book)
            memberModel.findOne({mname: req.body.userName})
            .then((member)=>{
              console.log(member)
              bookModel.updateOne(obj, {$set: {aname: req.body.aname, bname: req.body.bname, userName: member.mname, userId: member._id}})
              .then((item)=>{
                res.status(200).end();
              })
              .catch(err=>{
                console.log(err)
              })
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).end();
          })
        
      })


app.get('/getBooks', authorization, function(req, res){
  
  if(req.userType != 'librarian') res.status(401).end();

  bookModel.find({})
  .then(data=>{
    console.log(1);
    res.status(200).send(data).end();
  })
  .catch(err=>{
    console.log(err);
    res.status(500).end();
  })

})

app.get('/getMembers', authorization, function(req, res){
  
  if(req.userType != 'librarian') res.status(401).end();

  memberModel.find({})
  .then(data=>{
    console.log(data);
    res.status(200).send(data).end();
  })
  .catch(err=>{
    console.log(err);
    res.status(500).end();
  })

})

app.listen(5500, function(){
  console.log("server is ok");
});