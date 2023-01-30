const Employee = require("../Models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const Otp = require("../Models/otp");

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
    // Epl_Booking_service: async(req, res) => {
    //     try{
    //         const epl_booking = new Employee(
    //             {
    //                 maintenance:req.body.maintenance,
    //             });
    //         const epl = await epl_booking.save();
    //         res.status(200).json(epl); 
    //     }catch(error) {
    //         res.status(500).json(error);
    //         console.log(error);
    //     }
    // },
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
            console.log(req.params.id);
            const employee = await Employee.findOneAndUpdate({id: req.params.id},
                {$set: {
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        phone:req.body.phone
                    }
                });
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
            const employee = await Employee.findOne({username: req.body.username});
            if(!employee) {
                 return res.status(404).json("wrong username");
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
        let data = await Otp.find({ email:req.body.email, code:req.body.otpCode});
        console.log(data);
        const response =[]
        if(data){
            let currentTime = new Date().getTime();
            let diff = data.expiresIn - currentTime;
            if(diff < 0){
                response.message = 'Token expires'
                response.statusText = 'error'

            }else{
                let employee = await Employee.findOne({ email: req.body.email})
                employee.password = req.body.password;
                employee();
                response.message = "Password change Successfully"
                response.statusText ='success';
            }
        }else{
            response.statusText = 'Error';
            response.message = 'Email Id Not Exists';
        }
        res.status(200).json(response);

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
