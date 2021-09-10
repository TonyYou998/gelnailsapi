const mongoose=require('mongoose');
const bookingSchema=new mongoose.Schema(
    {
        fullName:{
            type:String,
           
            max:5

        },
        email:{
            type:String,
            lowercase:true
        },
        phone:{
            type:String,
            required:true
        },
        bookAt:{
            type:Date,
            required:true,

        },
        appointmentDate:{
            type:Date,
            required:true,

        },
        time:String


    }
);
const Booking=new mongoose.model("booking",bookingSchema);
module.exports=Booking;