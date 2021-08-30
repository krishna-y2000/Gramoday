const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    users : [ ] ,

    marketID : {
        type : String , 
    },
    marketName : {
        type : String ,
    },
    cmdtyID : {
        type : String ,
    },
    cmdtyName : {
        type : String 
    },
    priceUnit : {
        type : String ,
    },
    price : {
        type : Number 
    }

});

module.exports = mongoose.model('cropSchema' , cropSchema) ;