const express = require('express');
const app = express();
const PORT = 3000;
const connectDB=require('./db/connection');
const User=require('./models/userModel');

app.use(express.json());


app.get('/ping', (req, res) => {
    res.send('pong');
});
app.get('/', (req, res) => {
    res.send('Welcome to My Expense Tracker Project ');
});



app.post('./users',async (req,res)=>{
    try{
        const user=new User(res.body);
        await user.save();
        res.status(201).json(user);
    }
    catch(err){
        res.status(400).json({error:error.message})
    }
})



app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// connect call
connectDB().then(()=>{
// Start the server
app.listen(PORT, () => {
    console.log(`Mogoose connected`);
    
    console.log(`Server is running on http://localhost:${PORT}`);
})
}).catch((err)=>{
    console.error(`Not Mngoose connected${err}`);
    
})


