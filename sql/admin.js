const db = require("./db.js");

const adminSchema = new db.mongoose.Schema({
    // "adminId":{type:String},
    "adminName":{type:String},
    "passWord":{type:String},
    // "photo":{type:String},
    // "sex":{type:String},
    // "age":{type:Number},
    // "height":{type:Number},
    // "weight":{type:Number},
    
})

module.exports = db.mongoose.model("admin", adminSchema);
