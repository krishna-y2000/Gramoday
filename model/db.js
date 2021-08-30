const mongoose = require('mongoose');
const MONGOURI = 'mongodb://localhost:27017/cropDB';

const connectMongo = async(req,res) =>{
    try 
    {
        await mongoose.connect(MONGOURI , {useNewUrlParser: true, useUnifiedTopology: true} ) ;
        console.log("DB connected");
    }
    catch(e)
    {
        console.log(e);
    }
}

module.exports = connectMongo ;