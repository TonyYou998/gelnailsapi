const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Booking=require('./model/booking');
const routeConst=require('./utils/RouteConst');
const moment=require("moment");
mongoose.connect("mongodb+srv://admin:39272762Bell@gelnails.hjldk.mongodb.net/gelnailsDB",{useNewUrlParser:true,useUnifiedTopology: true });



app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.send("gelnails")

})

app.route("/booking")
    .post((req,res)=>{
        
        const fullName=req.body.fullname;
        const email=req.body.email;
        const phone=req.body.phone;
        const appointmentDate=req.body.date;
        const time=req.body.time;
        let today=new Date;
        
        const booking=new Booking({
            fullName:fullName,
            email:email,
            phone:phone,
            bookAt: moment().format(),
            appointmentDate:appointmentDate,
            time:time
        })
        booking.save((err,docs)=>{
            if(docs)
                res.send({status:"successfully"})
            else
                res.send({
                    status:"there's some error,try again later"
                });

        });
        

    });


app.get("/booking/all",(req,res)=>{
        Booking.find({},(err,docs)=>{
            if(docs)
                res.send(docs)
            else
                res.send({status:"there some err"});

        })

});
app.get("/booking/today",(req,res)=>{
    
    
    const  today= moment().format();
    
    Booking.find({"appointmentDate":{$eq: today.slice(0,10)}},(err,docs)=>{
                    if(docs)
                        res.send(docs);
                    else
                        res.send({status:"there some err"});
    })
});
app.get("/booking/latest",(req,res)=>{
    
    
    const  latest= moment().format();
    console.log(latest);
    Booking.find({"bookAt":{$eq:latest.slice(0,10)}},(err,docs)=>{
            if(docs)
                res.send(docs);
            else
                res.send({status:"there some err"});
    })
})
    
let port= process.env.PORT;
if(port==null||port==""){
  port=3000;


}
app.listen(port,()=>{
    console.log("running on port 3000");
})
