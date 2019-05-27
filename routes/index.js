var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  });

router.get('/home',function(req,res,next){
  res.render('home',{title:'Home page'})
})

router.get('/useradd',function(req,res,next){
  res.render('user-add',{title:'User add'})
})

router.post('/useradd',function(req,res,next){
  var user=new User();
  user.name=req.body.uname;
  user.email=req.body.uemail;
  user.password=req.body.pwd;
  user.save(function(err,rtn){
    if(err) throw err;
    res.redirect('/userlist')
  })
})
  router.get('/userlist',function(req,res,next){
    User.find({},function(err,rtn){
      if(err) throw err;
      res.render('user-list',{title:'User list',users:rtn})
  })
})
  router.get('/userupdate/:id',function (req,res,next){
    User.findById(req.params.id,function (err,rtn){
      if(err) throw err;
      console.log(rtn)
      res.render('user-update',{title:'User Update',users:rtn})
    })
})

router.post('/userupdate',function (req,res,next){
  var updateD={
    name: req.body.uname,
    email: req.body.uemail,
    password: req.body.pwd
  }
  User.findByIdAndUpdate(req.body.id,{$set:updateD},function (err,rtn){
    if (err) throw err;
    res.redirect('/userlist')
  })
})

router.get('/userdetail/:id',function (req,res,next){
  User.findById(req.params.id,function (err,rtn){
    if(err) throw err;
    res.render('user-detail',{title:"User Detail",user:rtn})
  })
})

router.get('/userdel/:id',function (req,res,next){
  User.findByIdAndRemove(req.params.id,function (err,rtn){
    if(err) throw err;
    res.redirect('/userlist')
  })
})

/* GET home page. */

module.exports = router;
