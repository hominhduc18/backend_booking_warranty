const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const fetch = import('node-fetch').then((module) => module.default);
const cookieParser = require('cookie-parser');
const Maintenance = require('../Models/maintenance');
const emailss= require("../Models/otp");// dat trung vs ten 
const axios = require('axios');


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
                
            });
            //lưu user vào database
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    
    Booking_service: async(req, res) => {
        try{
            const user_booking = new User(
                {
                    maintenance_Id:req.body.maintenance_Id,
                });
            const user = await user_booking.save();
            res.status(200).json(user); 
        }catch(error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    all_Booking_service: async(req, res) =>{
        try {
            // viết id roi populate
            const user = await User.find({ _id: req.body.user_id}).populate({path: 'maintenance_Id'});
            
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    },
    get_Booking_service: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
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
            const order_maintenance = await User.findById(req.params.id);
            res.status(200).json(order_maintenance);
        }catch(error) {
            res.status(500).json(error);
        }
    
    },
    getAnAuthor: async (req, res) => {
        try {
            const author = await User.findById(req.params.id).populate("maintenance_Id");
            res.status(200).json(author);
        } catch (err) {
            res.status(500).json(err);
        }
      },
    //API Lấy vị trí khách hàng 
    get_location_user: async(req, res) =>{
        try {
            // Tìm kiếm thông tin người dùng theo id
            const user = await User.findById(req.params.id);
        
            // Kiểm tra xem người dùng có tồn tại hay không
            if (!user) {
              return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
        
            // Lấy thông tin địa điểm của người dùng
            const latitude = user.location.latitude;
            const longitude = user.location.longitude;
        
            // Trả về phản hồi cho client
            res.status(200).json({ 
                latitude: latitude,
                 longitude: longitude 
                });
            
        }catch (error) {
        
            res.status(500).json({ message: 'Đã xảy ra lỗi' });
          }
              
    },
    get_address_userMain:async(req, res)=>{
        try{
            const user = await User.findById(req.params.id).populate("maintenance_Id");
            const address = user.maintenance_Id.address;
            console.log(address);
            const geocodeUrl = 
             `https://nominatim.openstreetmap.org/search?q=${
                encodeURIComponent(address)}&format=json&limit=1`;
            const geocodeResponse = await fetch.get(geocodeUrl)
            .then(res => res.data);

            // fetch ko đc dung request mà dùng then để trả về json 
            const location = geocodeResponse[0].geometry.location;
            res.status(200).json({ latitude: location.latitude, longitude: location.longitude });
            
        }catch(error){
            res.status(500).json(error);
            console.log(error);
        }
    },

    deleteAnUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id );
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
                        phone:req.body.phone,
                        address:req.body.address
                    }
                });
                const response = await user.save();
                res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    },
    putUsers_location: async function (req, res, next) {
        try {
            console.log(req.params.id);
            const user = await User.findOneAndUpdate({id: req.params.id},
                {$set: {
                        username:req.body.username,// phai có 
                        location:{ 
                            latitude: req.body.latitude,
                            longitude: req.body.longitude
                        }
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
            const user = await User.findOne({email: req.body.email});
            console.log(req.body.email);
            if(!user) {
                 return res.status(404).json("wrong email");
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

    emailSendUser: async (req, res) => {
        try{
            const response = {};
            const user = await User.findOne({email: req.body.email});
            console.log(req.body.email);
            if(!user) {
                return res.status(404).json("wrong email");
           }
            if(user){
                const otpCode = Math.floor((Math.random() *10000)+1);
                console.log(otpCode);


                const otpData = await new emailss({
                        
                        email: req.body.email,
                        code: otpCode,
                        expiresIn: new Date().getTime()+300*1000

                })
                console.log(otpData);

                const response = await otpData.save();
                console.log(response);
                // response.message = 'Please check Your Email Id';
                res.status(200).json(response);
                }
               
            
        }catch (error) {
            return res.status(500).json(error);
        }
        

    },
    changePasswordUser:async (req, res) => {
        try{

            const data = await emailss.find({code:req.body.code});
            
            console.log(req.body.otpCode);
            
            const response ={}
            if(data){
                 currentTime = new Date().getTime();
                let diff = data.expiresIn - currentTime;
                console.log(data.expiresIn - currentTime);
                if(diff < 0){
                    response.statusText = 'OTP Expired. PLEASE SEND THE CODE'
                }else{
                    response.statusText = 'OTP oke'
                    const user = await User.findOneAndUpdate({code: req.body.otpCod},
                        {$set: {
                            password:req.body.password,
                            }
                        });
                        console.log(user)
                    const response = await user.save();
                    
                }
            }else{
                response.statusText = 'Error';
            }
            res.status(200).json(response);
        }catch (error) {
            return res.status(500).json(error);
        }
        

    },
    updatePassword: async (req, res) => {
        try {
            const username = req.user.sub
            const { password, newPassword, cfPassword } = req.body
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);
            const data = {
                password: hash
            }
           
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                const newUser = await User.findOneAndUpdate({ username: username }, data, { new: true })
                if (newUser) {
                    return res.status(200).json({ message: "Cập nhật thành công" })
                }
                return res.status(400).json({ message: "Cập nhật không thành công" })
            }
            return res.status(400).json({ message: "Sai mật khẩu" })


        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Lỗi cập nhật tài khoản" })
        }
    },
};


module.exports = userControllers;