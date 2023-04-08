const Employee = require("../Models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const Otp = require("../Models/otp");
const fetch = require('node-fetch');
const Maintenance = require('../Models/maintenance');
let RefreshToken = [];

const employeeControllers = {
    registerEmployee: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newEmployee = await new Employee({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone,
              
            });
            const employee = await newEmployee.save();
            res.status(200).json(employee);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    emp_set_address: async (req, res)=>{
        try{
            const employee = await Employee.findById(req.params.id);
            if(!employee){
                res.status(404).send('Employee not found');
            }else{
                employee.address = req.body.address;
                employee.save();
            }
            res.status(200).json(employee);
        }catch(error) {
            res.status(500).json(error)
        }
    },
    get_location_emp:async (req, res) =>{
        try{
            const employee = await Employee.findById(req.params.id);
            const address = employee.address;
            console.log(address);

            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
            console.log(url);
            fetch(url,{ timeout: 10000 })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0 && data[0].hasOwnProperty('lat') && data[0].hasOwnProperty('lon')) {
                    console.log(data);
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

        }catch(error) {
            res.status(500).json(error)
        }

    },
    getAnEmployee_main: async (req, res) => {
        try {
            const authors = await Employee.findById(req.params.id).populate("maintenance_Id");
            res.status(200).json(authors);
        } catch (err) {
            res.status(500).json(err);
        }
      },
    getAllEmployee: async (req, res) => {
        try {
            const employees = await Employee.find();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    getAnEmployee: async (req, res) => {
        try {
            const employee = await Employee.findById(req.params.id);
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    deleteAnEmployee: async (req, res) => {
        try {
            await Employee.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successful");
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
   
    updateAnEmployee: async (req, res) => {
        try {
            const employee = await Employee.findOneAndUpdate({_id: req.params.id},
                {$set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone,
                    address: req.body.address
                }},
                {new: true}
            );
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    

    AcessToken: (employee) =>{
        return jwt.sign({
            id: employee.id,
            username: employee.username
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30h"}
        );
    },

    refreshToken: (employee) =>{// dài hạn
        return jwt.sign({
            id: employee.id,
            admin: employee.admin,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "365d"}
        );
    },
   
    loginEmployee: async(req, res) => {
        try {
            const employee = await Employee.findOne({email: req.body.email});
            if(!employee) {
                 return res.status(404).json("wrong email");
            }
            const validPassword = await bcrypt.compare(req.body.password,employee.password);
            if(!validPassword){
                return res.status(404).json("wrong password");
            }
            if(employee && validPassword){
                const accessToken = employeeControllers.AcessToken(employee);
                
                const refreshToken = employeeControllers.refreshToken(employee);
                // luu token vao cookie
                 res.cookie("RefreshToken",refreshToken,{
                     httpOnly: true,
                     secure: false,
                     path: "/",
                     sameSite: "strict"
                 })
                const {password, ...other} = employee._doc;
                
                res.status(200).json({...other, accessToken});
            }
            
        }catch (error) {
            return res.status(500).json(error);
        }
    },

    logoutEmployee: async(req, res) => {
        res.clearCookie('RefreshToken');
        RefreshToken = RefreshToken.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logout successful");
    },

    emailSendEmployee: async (req, res) => {
        const data = await Employee.findOne({email: req.body.email});
        console.log(data);
        const response = {};
        if(data){
            const otpCode = Math.floor((Math.random() *10000)+1);
            console.log(otpCode);
            const otpData = await new Otp({
                email: req.body.email,
                code: otpCode,
                expiresIn: new Date().getTime() +300*1000
            })
            const otpResponse = await otpData.save();
            response.statusText = 'success';
            response.message = 'Please check Your Email Id';
            res.status(200).json(otpResponse);
        }else{
            response.statusText = 'Error';
            response.message = 'Email Id Not Exists';
        }
    },

    changePasswordEmployee:async (req, res) => {
        try {
            const { email, otp, newPassword } = req.body;

            // Tìm kiếm mã OTP tương ứng với email người dùng
            const otpData = await emailss.findOne({ email, code: otp });
        
            // Kiểm tra mã OTP
            if (!otpData || otpData.expiresIn < new Date().getTime()) {
              return res.status(400).json({ message: 'Invalid OTP' });
            }
        
            // Tìm kiếm người dùng theo email
            const user = await Employee.findOne({ email });
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
    add_address:async (req, res) => {
        try{
            const add_address_Epl = await new Employee({
                _id:req.params.id,
                address:req.body.address,
            });
            
            const add = await add_address_Epl.save();
            res.status(200).json(add);

        }catch (error) {
            res.status(500).json(error);
        }
    },

};


module.exports = employeeControllers;
