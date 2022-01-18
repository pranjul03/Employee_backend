var mongoose=require('mongoose');
const schema= new mongoose.Schema({
    Username:{type:String},
    Manager:{type:String},
    Department:{type:String},
    Performace:{type:Array}
})

const Employee_info= mongoose.model("Employee_info", schema);
module.exports= Employee_info;