const mongoose =require('mongoose');

const mongoUrL='mongodb+srv://aman:aman1@expensetracker.dbjgw.mongodb.net/';


const connectDB=async()=>{
    try{
        await mongoose.connect(mongoUrL,{
           useNewUrlParser: true,
            useUnifiedTopology: true
        });
console.log("MongoDb Connected");

    }catch(error){
        console.error('Not connected mongoose ');
        process.exit(1);
    }};
    module.exports=connectDB;