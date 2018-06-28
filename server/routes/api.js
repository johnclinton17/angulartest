const express = require('express');
const router = express.Router();
var multer = require('multer');
// upload 
var uplFileImage = 'null';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dist/uploads/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    var fileName = Date.now() + '.' + extension;
      cb(null, fileName)
      uplFileImage = fileName;
  } 
})
  
var upload = multer({ storage: storage }).single('photo');
router.post('/uploadget', function (req, res, next) {
  upload(req, res, function (err) {
    return res.send("Upload Complete");
  });    
})
  

const MongoClient = require('mongodb').MongoClient;
var  ObjectID = require('mongodb').ObjectID;
const jwt    = require('jsonwebtoken'); 
const config = {  'secret': 'sectoken'};
var safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;

var allUsers;
const database = MongoClient.connect('mongodb://localhost:27017/', function(err, client) {
  if (err) { throw err; } else {
var db = client.db('john');
//console.log(db.collection('companies'));
  myUsers = db.collection('users');
  allUsers = db.collection('allusers');
  comDet = db.collection('companies');
  myPost = db.collection('myPost');
  myPopup = db.collection('popup');
}
});


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});



// login
router.post('/userlogin', (request, response) => {
let frm_email_id = request.body.username;
let frm_password = request.body.password;
console.log(frm_email_id,frm_password);
    myUsers.findOne({ 'email' : frm_email_id ,'password' : frm_password},function(err, ruser)
    {     
      if(ruser)
      {
         
          var token = jwt.sign(ruser, config.secret, { expiresIn : 88500 });
          return  response.json({
          success: true,
          logged_status:1,
          message: 'Enjoy your token!',
          token: token
          });
      }else
      {
        return  response.json({success: false,message: 'Invalid credentials'});
      }
    });   
});


// <!--Add Users-->
router.post('/register', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;
  let password = req.body.password;
  
myUsers.insertOne({ name: name, email: email, phone: phone, address: address ,password:password}, function(err, res) {
    console.log('1document insterted')
    if (err) throw err;
  });

  return res.json({success: true})
});

// Get users
router.get('/allusers', (req, res) => {
  myUsers.find({}).toArray(function(err, result) {
    return res.json({success: true, data: result, message: 'Enjoy Your Token'});
  });  
});



// <!--Add Company-->
router.post('/company', (req, res) => {
  let name = req.body.name;
  let cemail = req.body.cemail;
  let phone = req.body.phone;
  let address = req.body.address;
  let city = req.body.city;
  
comDet.insertOne({ name: name, cemail: cemail, phone: phone, address: address, city: city }, function(err, res) {
    console.log('1document insterted')
    if (err) throw err;
  });

  return res.json({success: true})
});


// Get Company
router.get('/users', (req, res) => {
  comDet.find({}).toArray(function(err, result) {
    return res.json({success: true, data: result, message: 'Enjoy Your Token'});
  });  
});

// <!--Update Company-->
router.post('/upcompany',(req, res)=> {

   var obj_id = new ObjectID(req.body._id);
  comDet.updateOne({"_id": obj_id},{$set: req.body.data},function(err, res) {
    console.log('1document updated')
    if (err) throw err;
  });

  return res.json({success: true})
});



router.get('/deletemycompany/:id',function(req, res) {
    
    var obj_id = new ObjectID(req.params.id);
    comDet.deleteOne({"_id":obj_id}, function(err, result) {
      if(err) {
        return res.json({success: false, data: req.params.id, message: 'Enjoy Your Token'});
      }  else {
        return res.json({success: true, data: req.params.id, message: 'Enjoy Your Token'});
      }

    })
    
})

router.get('/deletereguser/:id',function(req, res) {
    
    var obj_id = new ObjectID(req.params.id);
    comDet.deleteOne({"_id":obj_id}, function(err, result) {
      if(err) {
        return res.json({success: false, data: req.params.id, message: 'Enjoy Your Token'});
      }  else {
        return res.json({success: true, data: req.params.id, message: 'Enjoy Your Token'});
      }

    })
    
})



router.get('/deleteposts/:id',function(req, res) {
    
    var obj_id = new ObjectID(req.params.id);
    myPost.deleteOne({"_id":obj_id}, function(err, result) {
      if(err) {
        return res.json({success: false, data: req.params.id, message: 'Enjoy Your Token'});
      }  else {
        return res.json({success: true, data: req.params.id, message: 'Enjoy Your Token'});
      }

    })
    
})


router.get('/deleteallusers/:id',function(req, res) {
    
    var obj_id = new ObjectID(req.params.id);
    myUsers.deleteOne({"_id":obj_id}, function(err, result) {
      if(err) {
        return res.json({success: false, data: req.params.id, message: 'Enjoy Your Token'});
      }  else {
        return res.json({success: true, data: req.params.id, message: 'Enjoy Your Token'});
      }

    })
    
})

// <!--Add Company-->
router.post('/popupmy', (req, res) => {
  let name = req.body.name;
  let cemail = req.body.cemail;
  let phone = req.body.phone;
  let address = req.body.address;
  let city = req.body.city;
  let profile_pic = '';
          
          if(uplFileImage == 'null'){
            profile_pic = 'default_user_icon.png';
          }
          else{
            profile_pic = uplFileImage;
            uplFileImage = 'null';
          }
  
myPopup.insertOne({ name: name, cemail: cemail, phone: phone, address: address, city: city, profile_pic: profile_pic }, function(err, res) {
    console.log('1document insterted')
    if (err) throw err;
  });

  return res.json({success: true});
});

// Get Company
router.get('/getpopup', (req, res) => {
  myPopup.find({}).toArray(function(err, result) {
    return res.json({success: true, data: result, message: 'Enjoy Your Token'});
  });  
});

// <!--Update Company-->
router.post('/updatepopup',(req, res)=> {

   var obj_id = new ObjectID(req.body._id);
  myPopup.updateOne({"_id": obj_id},{$set: req.body.data },function(err, res) {
    console.log('1document updated')
    if (err) throw err;
  });

  return res.json({success: true})
});

// <!--delete Company-->

router.get('/deletepopup/:id',function(req, res) {
    
    var obj_id = new ObjectID(req.params.id);
    myPopup.deleteOne({"_id":obj_id}, function(err, result) {
      if(err) {
        return res.json({success: false, data: req.params.id, message: 'Enjoy Your Token'});
      }  else {
        return res.json({success: true, data: req.params.id, message: 'Enjoy Your Token'});
      }

    })
    
})

// <!--Add post-->
router.post('/post', (req, res) => {
  let title = req.body.title;
  
myPost.insertOne({ title: title}, function(err, res) {
    console.log('1document insterted')
    if (err) throw err;
  });

  return res.json({success: true})
});

// Get post
router.get('/posts', (req, res) => {
  myPost.find({}).toArray(function(err, result) {
    return res.json({success: true, data: result, message: 'Enjoy Your Token'});
  });  
});




module.exports = router;