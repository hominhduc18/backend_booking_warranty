const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


let RefreshToken = [];

const userControllers = {
    registerUser: async (req, res) => {
        try {
            console.log(req.body);
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //create a new user account
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone,
                sex: req.body.sex,
            });
            //lưu user vào database
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    getAllUser: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteAnUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete Successful");
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },

    putUsers: async function (req, res, next) {
        try {
            console.log(req.params.id);
            const user = await User.findOneAndUpdate({id: req.params.id},
                {$set: {
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        phone:req.body.phone
                    }
                });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    },

    AcessToken: (user) =>{// ngắn hạn
        return jwt.sign({
            id: user.id,
            username: user.username
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30h"}
        );
    },

    refreshToken: (user) =>{// dài hạn
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "365d"}
        );
    },
   
    loginUsers: async(req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user) {
                 return res.status(404).json("wrong username");
            }
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                return res.status(404).json("wrong password");
            }
            if(user && validPassword){
                const accessToken = userControllers.AcessToken(user);
                
                const refreshToken = userControllers.refreshToken(user);
                // luu token vao cookie
                 res.cookie("RefreshToken",refreshToken,{
                     httpOnly: true,
                     secure: false,
                     path: "/",
                     sameSite: "strict"
                 })
                const {password, ...other} = user._doc;
                
                res.status(200).json({...other, accessToken});
            }
            
        }catch (error) {
            return res.status(500).json(error);
        }
    },

    logoutUser: async(req, res) => {
        
        res.clearCookie('RefreshToken');
        RefreshToken = RefreshToken.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logout successful");
    },

    changePasswordUser: async (req, res) => {
        try{
            const v = new User(req.body,{
                old_password: 'required',
                new_password: 'required',
                confirm_password: 'required|same:new_password'
            });
            const matched = await v.check();
            if(!matched){
                return res.status(422).send(v.errors);
            }
            const current_user = req.user;
            if(bcrypt.compareSync(req.body.old_password, current_user.password)){
                const hashPassword = bcrypt.hashSync(req.body.new_password,10);
                
                await User.updateOne({
                    _id: current_user._id},
                     {password: hashPassword});
                    const userData = await User.findOne({_id: current_user._id});
                    // let jwt_secret = process.env.ACCESS_TOKEN_SECRET_KEY ;
                    // let token = jwt.sign({
                    //     data: userData
                    // },jwt_secret, {expiresIn: '12h'});
                    const accessToken = userControllers.AcessToken(userData);
                    return res.status(200).json(userData);   
            }else{
                return res.status(500).json("Password does not matched");
            }
        }catch (error) {
            return res.status(500).json(error);
           
        }
        

    }
};

module.exports = userControllers;