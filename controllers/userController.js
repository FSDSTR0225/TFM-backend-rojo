const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const User = require('../models/user');
module.exports={
    login:async(req,res,next)=>{
        //hacer el login
        try{
            let email = req.body.email;
            let password = req.body.password;
            
            let user = await User.findOne({email:email});
            if(!user){
                res.status(404).json({'msj':'El usuario no existe'})
            }
            const {password:_,...rest} = user;
            console.log(rest);
            res.status(200).json(rest);

        }catch(err){
            res.status(500).json(err);
        }

    }
}