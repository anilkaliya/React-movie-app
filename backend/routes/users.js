const express =require('express');
const router=express.Router();
const User=require('../models/users');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then((hash)=>
    {
        const user=new User({
            email:req.body.email,
            password:hash
        });

        user.save().then(data=>{
            console.log("data saved");
            return res.status(201).json({message:"Done"})
        }).
        catch(error=>{
           console.log(error.message);
           res.status(409).json({error:error});
        });
    
    });
});
router.post('/signin',(req,res,next)=>{
    let fetchedUser
    User.findOne({email:req.body.email}).
    then(user=>{
        if(!user){
            res.status(401).json({message:"User Does not Exist"});   
        }
         fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password)
    }).then(result=>{
        if(!result){
            console.log("that fails");
            res.status(401).json({message:"Password is wrong"});
        }
       const token= jwt.sign({email:fetchedUser.email,id:fetchedUser._id},
            "this_is_secret",{expiresIn:"1h"});
            res.status(200).json({message:"success",
                token: token,
                expiresAt: 3600,
                user_id:fetchedUser._id
              });
    }).catch(err=>{
        console.log("here fails");
        console.log(err);
        res.status(401).json({message:"Invalid authentication credentials!"});
    })
});


module.exports = router;