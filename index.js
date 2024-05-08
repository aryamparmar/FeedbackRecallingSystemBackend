const express = require('express');
const cors = require('cors')
const {routes} = require('./routes/index')
const app = express();
const db = require('./db')

app.use(cors())
app.use(express.json());

app.use('/auth', routes);
app.get('/', (req, res)=>{
    res.json({
        message:"Server is working fine!",
        person:"This is Aryam!"
    })
})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
})