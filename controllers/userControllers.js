const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// let refreshToken = [];

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
                const accessToken =  jwt.sign(
                    {
                        id: user.id,
                    },
                    process.env.JWT_ACCESS_KEY,
                    {expiresIn:"30h"}
                    );
                const {password, ...other} = user._doc;
                return res.status(200).json({...other});
                // trả về hết ko trả pass
            }
            
        }catch (error) {
            return res.status(500).json(error);
        }
    }

};

module.exports = userControllers;