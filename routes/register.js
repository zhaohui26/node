var express = require("express");
//建立一个路由空表！！！！
var router = express.Router();
//引入user 模型 类似于英雄联盟  只能有六神装的设计
const admin = require("../sql/admin");


router.get("/", function (req, res, next) {
    console.log('此时进入了register')
      res.render("register");
    });


    router.post("/in", function (req, res, next) {
        console.log("进入register 的in 处理");
      
        let obj = req.body;
        console.log(obj)
        console.log(obj.adminName);
        console.log(obj.passWord)
        

        //重复用户的解决问题，方案一
        // admin.insertMany(obj,(err,data)=>{
        //     if (err) {
        //         console.log(err);
        //       }
        //       if(data) {
        //           res.redirect("/login")
        //       } else {
        //           res.redirect("/register")
        //       }
        // });


       
       
        //重复用户的解决问题，方案二
        // admin.findOne({adminName:obj.adminName},(err,data)=>{
        //     if(err){
        //         console.log(err);     
        //     }
        //     if(data){
        //         res.redirect("/register")
        //     }else{
        //         admin.insertMany(obj,(err,data)=>{
        //             if(err){
        //                 console.log(err);                        
        //             }
        //             console.log(data);
        //             res.redirect("/login");                  
        //         })
        //     }
        // })
        


        //重复用户的解决问题，方案三
        admin.findOne({adminName:obj.adminName},(err,data)=>{
            if(err){
                console.log(err);
            }
            if(data){
                res.redirect("/register");
            }else{
                admin.insertMany(obj,(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(data);
                    if(data){
                        res.redirect("/login");
                    }else{
                        res.redirect("/register");
                    }
                    
                })
            }
        })



    });

module.exports = router;