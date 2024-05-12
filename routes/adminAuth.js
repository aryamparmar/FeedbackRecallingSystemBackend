const express = require('express');
const adminRouter = express.Router();
const zod = require('zod');
const { Admin } = require('../models/adminModel');
const { SECRET_KEY } = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const signinBody = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

const postSignup = async(req,res) => {
    try{
        const {success} = await signinBody.safeParse(req.body);
        if(!success){
            res.json({
                message:"Credential filling by you are incorrect!"
            })
            return
        }
        const { email, password} = req.body;
        const existingUser = await Admin.findOne({email});
        if(existingUser){
            res.json({
                message:"User with this credential are already exist!"
            })
            return
        }

        const hashPassword = await bcrypt.hashSync(password, 10);

        const admin = await Admin.create({
            email,
            password:hashPassword
        })

        const adminId = user._id;
        const token = jwt.sign({adminId, email}, SECRET_KEY );

        res.json({
            message:"You are logged in Successfuly",
            token:token,
            _id:admin._id,
            success:true
        })
        return

    }catch(error){
        res.json({
            message:error.message,
            success:true
        })
        return
    }
}

const postSignin = async (req, res)=>{
    try{
        const {success} = signinBody.safeParse(req.body);
        if(!success){
            res.json({
                message:"Credential are wrong!"
            })
            return
        }
    
        const admin = await Admin.findOne({email:req.body.email});
    
        if(!admin){
            res.json({
                message:"User with this email does not exist!"
            })
            return
        }
        console.log(admin)
        const checkPassword = await bcrypt.compareSync(req.body.password,admin.password);

        if(!checkPassword){
            res.json({
                message:"Your password is wrong!"
            })
            return
        }

        const adminId = admin._id;
        const token = await jwt.sign({adminId}, SECRET_KEY );

        res.json({
            message:"Admin is login",
            token:token,
            adminId,
            success:true
        })
        
    }catch(error){
        res.json({
            message:error.message,
            success:false
        })
    }
}

const checkUser = async (req, res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token ,  SECRET_KEY);
        const adminId = decodedToken.userId;
    
        const adminData = await Admin.find({_id:adminId});
    
        res.json({
            adminData,
            message:"User exist",
            success:true
        })
    }catch(error){
        res.json({
            message:error.message,
            success:false
        })
    }

}

adminRouter
    .route('/signup')
    .post(postSignup)
adminRouter
    .route('/signin')
    .post(postSignin)

adminRouter
    .route('/checkUser')
    .get(checkUser)
   
module.exports={
    adminRouter
}    
