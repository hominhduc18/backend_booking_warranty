const Admin = require("../Models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const Otp = require("../Models/otp");
const User = require("../Models/User");
const Employee = require("../Models/employee");
const geocoder = require('geocoder');

// sử dụng geocoder ở đây

let RefreshToken = [];

const adminControllers = {
    register_admin: async (req, res) => {
        try {
          const { email, password } = req.body;
          const adminExists = await Admin.findOne({ email });
          if (adminExists) {
            return res.status(400).json({ error: "Email already exists" });
          }
      
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newAdmin = new Admin({
            email: req.body.email,
            password: hashedPassword,
          });
      
          // Lưu tài khoản vào database
          const savedAdmin = await newAdmin.save();
      
          res.status(200).json(savedAdmin);
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Internal server error" });
        }
      };

        // kc_min: async (req, res) => {
        //     try {
        //         const user = await User.findById(req.params.id);
        //         const address = user.address;
        //         console.log(address);
        //         const location = await geocoder.geocode(address);
        //         console.log(location);
        //         const userLocation = {
        //             latitude: location[0].latitude,
        //             longitude: location[0].longitude,
        //         };
        //         const employees = await Employee.find({});
        //         const employeeLocations = employees.map((employee) => {
        //             return {
        //                 latitude: employee.location.latitude,
        //                 longitude: employee.location.longitude
        //             };
        //         });
        //         if (employeeLocations.length > 0) {
        //             const closestEmployee = geolib.findNearest(userLocation, employeeLocations);
        //             res.json(closestEmployee);
        //         } else {
        //             res.status(404).json({ message: "No employees found" });
        //         }
        //     } catch (err) {
        //         res.status(500).json(err);
        //         console.log(err);
        //     }
        // },
        

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
            const admin = await Admin.findOne({email: req.body.email});
            if(!admin) {
                 return res.status(404).json("wrong email");
            }
            const validPassword = await bcrypt.compare(req.body.password,admin.password);
            if(!validPassword){
                return res.status(404).json("wrong password");
            }
            if(admin && validPassword){
                const accessToken = adminControllers.AcessToken(admin);
                
                
                // const refreshToken = adminControllers.refreshToken(admin);
                // RefreshToken.push(refreshToken);
                // // luu token vao cookie
                //  res.cookie("RefreshToken",refreshToken,{
                //      httpOnly: true,
                //      secure: false,
                //      path: "/",
                //      sameSite: "strict"
                //  })
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
    deleteAdmin: async (req, res) => {
        try {
            await Admin.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successful");
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },


    update_status: async(req, res) => {
        try {
            const assignment = await User.findById({_id: req.params.id});
            if (!assignment) {
                return res.status(404).json({ error: 'Assignment not found' });
              }
              if (assignment.status !== 'unassigned') {
                return res.status(400).json({ error: 'Invalid assignment status' });
              }
              assignment.status = 'Success';
              await assignment.save();

              const user = await User.findById(assignment.userId);

              if (!user) {
                return res.status(404).json({ error: 'User not found' });
              }
              
        }catch(error) {
            res.status(500).json(error);
            console.log(error);
        }

    }
};



module.exports = adminControllers;