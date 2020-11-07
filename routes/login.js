var express = require('express');
var router = express.Router();
// var uuid=require("node-uuid");
const admin=require("../sql/admin");

/* GET home page. */
router.get("/", function(req, res, next) {
    // 先请求数据库数据，将数据渲染到页面模板
    console.log('此时进入Login');
    
     res.render("login");
   
 });


router.post("/in",function(req,res,next){
    console.log('进入login的in处理');
    
    let obj=req.body;
    console.log(obj)
    console.log(obj.adminName);
    console.log(obj.passWord);

    admin.findOne(obj,(err,data)=>{
        if (err) {
            console.log(err);
          }
          if(data) {
            //    res.cookie('islogin','ok')
               req.session.islogin = 'ok'
            console.log('我在login  路由 /in 里面')             
            res.redirect("/pro")
          } else {
              res.redirect("/register")
          }
    });
});








module.exports = router;
