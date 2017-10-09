var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  var isLoginData = {}
  console.log('/index ....')
  //console.log(req)
  isLoginData.isLogin = false
  if(req.session.user){
    isLoginData = {
      isLogin:true,
      user:{
        username:req.session.user.username,
        avatar_url: req.session.user.avatar_url
      }
    }
  }
 
  res.render('index', isLoginData );
});




module.exports = router;
