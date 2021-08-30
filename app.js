const express = require('express');
const app = express();
const path = require('path');
const server = require('./controllers/server');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.get('/reports',(req,res) => {
    res.sendFile(__dirname + '/public/index.html')
} )
app.use('/reports' , server );
app.listen(3000 , () => {
    console.log("Server is running at 3000 ");
})