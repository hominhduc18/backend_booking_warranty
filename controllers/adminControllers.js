const Admin = require("../Models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const Otp = require("../Models/otp");

let RefreshToken = [];

const adminControllers = {
    register_admin: async (req, res) => {
        try {
            console.log(req.body);
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //create a new user account
            const new_admin = await new Admin({
                email: req.body.email,
                password: hashed,
                admin :req.body.admin
            });
            //lưu user vào database
            const adminn = await new_admin.save();
            res.status(200).json(adminn);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    AcessToken: (admin) => {// ngắn hạn
        return jwt.sign({
            id: admin.id,
            username: admin.username,

        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30h"}
        );
    },

    refreshToken: (admin) => {// ngdài hạn
        return jwt.sign({
            id: admin.id,
            admin: admin.admin,
            
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "365d"}
        );
    },
   

    loginAdmin: async(req, res) => {
        try {
            const admin = await Admin.findOne({username: req.body.username});
            if(!admin) {
                 return res.status(404).json("wrong username");
            }
            const validPassword = await bcrypt.compare(req.body.password,admin.password);
            if(!validPassword){
                return res.status(404).json("wrong password");
            }
            if(admin && validPassword){
                const accessToken = adminControllers.AcessToken(admin);
                
                
                const refreshToken = adminControllers.refreshToken(admin);
                // luu token vao cookie
                 res.cookie("RefreshToken",refreshToken,{
                     httpOnly: true,
                     secure: false,
                     path: "/",
                     sameSite: "strict"
                 })
                const {password, ...other} = admin._doc;
                
                res.status(200).json({...other,accessToken});
            }  
        }catch (err) {
            return res.status(500).json(err);
        }
    },

    logoutAdmin: async(req, res) => {
        res.clearCookie('RefreshToken');
        RefreshToken = RefreshToken.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logout successful");
    },
    
    updateAdmin: async (req, res) => {
        try {
            console.log(req.params.id);
            const admin = await Admin.findOneAndUpdate({id: req.params.id},
                {$set: {
                        email:req.body.email,
                        password:req.body.password,
                        
                    }
                });
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },

    getAllAdmin: async (req, res) => {
        try {
            const admin = await Admin.find();
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    getAnAdmin: async (req, res) => {
        try {
            const admin = await Admin.findById(req.params.id );
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json(error)
        }
    },
};



module.exports = adminControllers;