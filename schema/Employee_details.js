var mongoose= require('mongoose');
const schema= new mongoose.Schema({
   FirstName:{type:String , required: true},
    LastName:{type:String , required: true},
    Password:{type:String , required: true},
    Username:{type:String , required: true},
    Dateofbirth:{type:String , required: true},
    Address:{type:String , required: true},
    City:{type:String , required: true},
    State:{type:String , required: true},
    Nationality:{type:String , required: true},
    contact1:{type:Number , required: true},
    contact2:{type:Number , required: true},  
})
const Employee_details=mongoose.model("Employee_details", schema);
module.exports= Employee_details;