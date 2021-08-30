const express = require('express');
const router = express.Router();
const cropSchema = require('../model/cropSchema');
const connectMongo = require('../model/db');
connectMongo();

router.get('/:id' ,async (req,res) =>{
    try 
    {
        const cropRtr = await cropSchema.findById(req.params.id);
        if(cropRtr != null )
        {
            return res.statusCode(200).send(cropRtr );
        }
    }
    catch(e)
    {
        console.log(e);
        res.send(e);
    }
} )

router.post('/' ,async (req,res) => {
    
    const { userID , marketID ,marketName ,cmdtyID , cmdtyName , priceUnit ,convFctr ,price } = req.body ;
    const newCrop = new cropSchema( {       
        users : [userID] ,
        marketID , 
        marketName , 
        cmdtyID , 
        cmdtyName ,
        priceUnit : "Kg" , 
        price : price / convFctr,
       
   }  );
    try
    {
       const findData = await cropSchema.findOne({marketID:marketID});
       if( findData == null)
       {
            await newCrop.save();
            console.log("Data Saved");
            return res.send({
                status : "success" , 
                message : newCrop._id
            } )
        
       }
       else 
       {   
            var updatedPrice =  ( findData.price +  (price / convFctr  ) ) / (findData.users.length + 1) ;
           await cropSchema.updateOne({_id : findData._id } , { $set : { price : updatedPrice  }  ,
             $push : { users : userID } } ) ;

            return res.statusCode(200).send({
                status : "success" , 
                message : newCrop._id
            } )
    }

        
    }
    catch(e)
    {
        console.log(e);
        res.send(e);
    }
    
} )

module.exports = router ;