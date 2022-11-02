const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// let refreshToken = [];

const authControllers = {
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
                        phone:req.body.phone
                    }
                });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    },
    // forget_password: async (req, res) => {
    //     const { email } = req.body;
    //     try {
    //       const user = await User.findOne({ email });
    //       if (!user) {
    //         return res.json({ status: "User Not Exists!!" });
    //       }
    //       const secret = JWT_SECRET + user.password;
    //       const token = jwt.sign({ email: oldUser.email, id: user._id }, secret, {
    //         expiresIn: "5m",})
    //     }catch (error){
    //         res.status(500).json(err);
    //     }
    // },


    loginUsers: async(req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user) {
                 return res.status(404).json("wrong username");
            }
            const validPassword = bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                return res.status(404).json("wrong password");
            }
            if(user && validPassword){
                res.status(200).json(user);
            }
        }catch(err){
            res.status(500).json(err);
        }
    },


};

module.exports = authControllers;
