const express = require('express');
const connectDB=require('./db/connection');
const User=require('./models/userModel');
const userRouter=require('./Router/router')
const cors=require('cors');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.get('/ping', (req, res) => {
//     res.send('pong');
// });
// app.get('/', (req, res) => {
//     res.send('Welcome to My Expense Tracker Project ');
// });





app.use('/api/user',userRouter);


// connect call
connectDB().then(()=>{
// Start the server
app.listen(PORT, () => {
    console.log(`Mongoose connected`);
    
    console.log(`Server is running on http://localhost:${PORT}`);
})
}).catch((error)=>{
    console.error(`Mongoose connection failed: ${error}`);
    
})


