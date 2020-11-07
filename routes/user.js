var express = require('express');
var router = express.Router();
var uuid=require("node-uuid");
const admin=require("../sql/admin");

/* GET home page. */
router.get('/', function(req, res, next) {
   // 先请求数据库数据，将数据渲染到页面模板
  admin.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    res.render("user", {
      index:2,
      data:data
    });
  })
});



router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 2,
  });
});

router.post("/addAction", function (req, res, next) {


  let obj = req.body;
  // obj.age = Number(obj.age);
  // obj.height = obj.height - 0;
  // obj.weight = obj.weight * 1;
  console.log(obj);
  admin.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/user");
  })
   
});

//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  admin.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     res.redirect("/user");
  })
  

});

//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id
  console.log(req.query)
  const _id = req.query._id;
  console.log("_id", _id);

  admin.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdata',{
      index:2,
      data:data
    })
  })

 
});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  
  // obj.age = Number(obj.age);
  // obj.height = obj.height - 0;
  // obj.weight = obj.weight * 1;
  console.log('obj_id',obj)
  admin.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/user");

  })

  
});

//sort 排序
router.get("/sort1", (req, res, next) => {
  const obj = req.query;
    admin.find({}).sort({age:1}).exec((err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
       res.render("user", {
      index: 2,
      data,
    })
   })
  
});

router.get("/sort2", (req, res, next) => {
  const obj = req.query;
    admin.find({}).sort({age:-1}).exec((err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
       res.render("user", {
      index:2,
      data,
    })
   })
  // sql.sort(production, {}, {}, obj).then((data) => {
  //   res.render("pro", {
  //     index: 1,
  //     data,
  //   });
  // });
});

//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  admin.find({adminName:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index:2,
       data,
    });
  })

 
});


module.exports = router;
