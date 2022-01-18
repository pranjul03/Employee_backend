var express= require("express");
var app = express();


var cors= require('cors');
app.use(cors());

app.use(express.json());


app.listen(8080 ,(err)=>{
    if(err) console.log(err)
    console.log("server started successfully")
})

var mongoose= require('mongoose');

var user_schema1= require('./schema/Employee_details');
var user_schema2= require('./schema/Employee_info');
var url="mongodb+srv://pranjul03:NMGRBkFYniE48QoQ@cluster0.3gl2o.mongodb.net/Employee_database?retryWrites=true&w=majority";

mongoose.connect(url , (err)=>{
    if(err) console.log(err)
    console.log("database connection successful")
})

var jwt= require('jsonwebtoken');
var mysalt="1234567890"


app.post('/Signup' ,async(req,res)=>{
    
    var Userobject={
        Username:req.body.Username
    }

    var user= new user_schema1(req.body);
    var user2= new user_schema2(Userobject);
    console.log(user2);

    try {
        const added2= await user2.save();
        const added = await user.save();
        if(added ){
            res.status(200).send({
                msg: "successfully added a new employee"
            })

        }
        else{
            res.status(500).send({
                msg:"failed to add a new user"
            })
        }
        
    } catch (error) {
        console.log(error)
        
    }
})


app.post('/Login' ,async(req, res)=>{
    console.log(req.body);
    
    try {
        const findResult = await user_schema1.find({
            Username : req.body.Username
        })
       console.log(findResult.length)
        if(findResult.length!==0){
            var pass= findResult[0].Password;
            console.log("inside findresult")
            if(req.body.Password=== pass){
                
                var token = jwt.sign(findResult[0].toJSON(), mysalt);
                res.status(200).send({
                    token
                })
            }
            else{
               res.status(250).send({
                   msg:"wrong password"
               })
            }
        }
        else{
            console.log("Record not found")
            res.status(250).send({
                msg:"Record not found"
            })
        }
        
    } 
    catch (error) {
        console.log(error);
        console.log("inside catch");
        
    }



})