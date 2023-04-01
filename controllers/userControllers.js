const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
// const fetch = import('node-fetch').then((module) => module.default);
const cookieParser = require('cookie-parser');
const Employee = require('../Models/employee')
const Maintenance = require('../Models/maintenance');
const emailss= require("../Models/otp");// dat trung vs ten 
const fetch = require('node-fetch');
const geolib = require('geolib');


   // Hàm tính khoảng cách giữa hai điểm trên bề mặt trái đất dựa trên kinh độ và vĩ độ
      function getDistance(point1, point2) {
        const R = 6371e3; // Bán kính trái đất
        const phi1 = toRadians(point1.latitude);
        const phi2 = toRadians(point2.latitude);
        const deltaPhi = toRadians(point2.latitude - point1.latitude);
        const deltaLambda = toRadians(point2.longitude - point1.longitude);
        const a =
          Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
          Math.cos(phi1)
      }
let RefreshToken = [];
let employeeLocations = [];


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
     get_address_userMain :async(req, res) => {
        try {
          const user = await User.findById(req.params.id).populate("maintenance_Id");
          const address = user.maintenance_Id.address;
          console.log(address);
      
          const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
          console.log(url);
          fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0 && data[0].hasOwnProperty('lat') && data[0].hasOwnProperty('lon')) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    res.status(200).json({ 
                      latitude: latitude,
                      longitude: longitude
                    });
                  } else {
                    console.log('Cannot find longitude and latitude for the address');
                    res.status(404).json({ message: 'Cannot find longitude and latitude for the address' });
                  }
            });
      
        } catch (error) {
          res.status(500).json(error);
          console.log(error);
        }
      },

      getNearbyEmployees: async (req, res) => {
        try {
          // Lấy địa chỉ từ request của người dùng
          const user = await User.findById(req.params.id).populate("maintenance_Id");
          const address = user.maintenance_Id.address;
          console.log(address);
        //   const userAddress = req.query.address;
      
          // Tìm vị trí (tọa độ) của địa chỉ của người dùng bằng Geocoding
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
          const data = await response.json();
      
          if (data.length > 0 && data[0].hasOwnProperty('lat') && data[0].hasOwnProperty('lon')) {
            const userLatitude = data[0].lat;
            const userLongitude = data[0].lon;
            console.log(userLatitude, userLongitude);

            // nhân viên 
		    const employeeLocations = [];

            const employees = await Employee.find({ role: 'Employee' });
            console.log(employees);
            for (const employee of employees) {
            const address = employee.address;
            console.log(address);
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
            const data = await response.json();

                if (data.length > 0 && data[0].hasOwnProperty('lat') && data[0].hasOwnProperty('lon')) {
                    const employeeLatitude= employee.latitude = data[0].lat;
                    console.log(employeeLatitude)
                
                    const employeeLongitude= employee.longitude = data[0].lon;
                    console.log(employeeLongitude)
                    // const allepl = await employee.save();
                    // console.log(allepl);
                    employeeLocations.push({ latitude: employeeLatitude,
                         longitude: employeeLongitude });
                         //console.log("địa điểm gần nhất là:")
                         console.log(employeeLocations.push({
                            latitude: employeeLatitude,
                            longitude: employeeLongitude }))
                }
            }
 //             Find all nearby employees within a 1km radius
                const nearbyEmployees = employeeLocations.filter(employeeLocation => {
                    const distance = geolib.getDistance(
                    { latitude: userLatitude, longitude: userLongitude },
                    { latitude: employeeLocation.latitude, longitude: employeeLocation.longitude });
                    // console.log("địa điểm gần nhất là:")
                    console.log(distance <= 100);
                    return distance <= 1000;
                });

                

                // Create array of locations to display on map
                const locations = [
                    { latitude: userLatitude, 
                    longitude: userLongitude,
                     title: 'Your Location' },

                    nearbyEmployees.map(employeeLocation => ({
                      latitude: employeeLocation.latitude,
                      longitude: employeeLocation.longitude,
                      title: employees.find(
                        employee => employee.latitude === employeeLocation.latitude 
                        && employee.longitude === employeeLocation.longitude).name
                    }))]
                  res.status(200).json({ locations });
                } 
                    else {
                    res.status(404).json(
                        { message: 'Cannot find longitude and latitude for the user address' });}
            } catch (error) {
                console.log(error)
                    res.status(500).json(error);
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
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        username: req.body.username,
                        email: req.body.email,
                        phone: req.body.phone,
                        address: req.body.address
                    }
                },
                { new: true } // trả về bản ghi mới sau khi cập nhật
            );
            res.status(200).json(user);
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
    updatePassword: async (req, res) => {
        try {
            const { email, otp, newPassword } = req.body;

            // Tìm kiếm mã OTP tương ứng với email người dùng
            const otpData = await emailss.findOne({ email, code: otp });
        
            // Kiểm tra mã OTP
            if (!otpData || otpData.expiresIn < new Date().getTime()) {
              return res.status(400).json({ message: 'Invalid OTP' });
            }
        
            // Tìm kiếm người dùng theo email
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            // Mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
        
            // Xóa mã OTP khỏi cơ sở dữ liệu
            await emailss.deleteOne({ email, code: otp });
        
            res.status(200).json({ message: 'Password reset successfully' });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
          }
    },
    
};


module.exports = userControllers;