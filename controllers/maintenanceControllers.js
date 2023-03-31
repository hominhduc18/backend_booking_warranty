const Employee = require("../Models/employee");
const Maintenance = require("../Models/maintenance");
const User = require("../Models/User");
// const DatePicker = require('date-picker');
// const timepicker = require('timepicker');
const maintenanceControllers = {
    addMaintenance: async (req, res) => {
        try {
            const newMaintenance = await new Maintenance({
                name: req.body.name,
                employee: req.body.employee,
                description: req.body.description,
                history: {
                    comment: req.body.history.comment,
                    start: req.body.history.start
                }
            });
            const maintenance = await newMaintenance.save();
            res.status(200).json(maintenance);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    user_booking_service:async(req, res)=>{
        try{
            const userorderMaintenances = new Maintenance({
                description: req.body.description,
                noted: req.body.noted,
                date: req.body.date,
                user: req.body.user,
                startHour:req.body.startHour,
                address:req.body.address,
                status: "unassigned" // Thêm trường status với giá trị mặc định "unassigned"
            });
            const addbooking = await userorderMaintenances.save();
            if(req.body.user) {
                const user = User.findById(req.body.user);
    
                await user.updateOne({ $push: { maintenance_Id: addbooking._id } });
                res.status(200).json(addbooking);  
            }
        }catch (error) {
            res.status(500).json(error);
        }    
    },
    
    add_employee_service: async (req, res) => {
        try {
            const maintenance = await Maintenance.findById(req.params.id);
            if (!maintenance) {
                return res.status(404).json({ message: 'Maintenance not found' });
            }
    
            // Cập nhật thông tin nhân viên
            maintenance.employee = req.body.employee;
    
            // Kiểm tra nếu trạng thái đơn hàng là "unassigned" thì cập nhật thành "đã nhận đơn"
            if (maintenance.status === "unassigned") {
                maintenance.status = "assigned";
            }
            // Lưu thông tin đơn hàng đã cập nhật
            const updatedMaintenance = await maintenance.save();
            res.status(200).json(updatedMaintenance);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    complete_maintenance_service: async (req, res) => {
        try {
          const maintenance = await Maintenance.findById(req.params.id);
          if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance not found' });
          }
      
          // Kiểm tra nếu trạng thái đơn hàng không phải là "assigned" thì không thể hoàn thành
          if (maintenance.status !== "assigned") {
            return res.status(400).json({ message: 'Cannot complete maintenance that is not assigned' });
          }
      
          // Cập nhật trạng thái đơn hàng thành "completed"
          maintenance.status = "completed";
      
          // Lưu thông tin đơn hàng đã cập nhật
          const updatedMaintenance = await maintenance.save();
          res.status(200).json(updatedMaintenance);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      user_feed_back: async(req, res) =>{
        try {
            const maintenance = await Maintenance.findById(req.params.id);
            if (!maintenance) {
              return res.status(404).json({ message: 'Maintenance not found' });
            }
        
            // Check if the maintenance has been completed
            if (maintenance.status !== "completed") {
              return res.status(400).json({ message: 'Cannot give feedback for maintenance that is not completed' });
            }
        
            // Add the feedback to the maintenance
            
            maintenance.feedback = {
              rating: req.body.rating,
              comment: req.body.comment
            };
        
            // Save the updated maintenance
            const updatedMaintenance = await maintenance.save();
            res.status(200).json(updatedMaintenance);
          } catch (error) {
            res.status(500).json(error);
          }
      },
    Epl_booking_service:async(req, res)=>{
        try{
            const Eml_take_orderMaintenances = await new Maintenance({
                description: req.body.description,
                date: req.body.date,
                startHour:req.body.startHour,
                user: req.body.user,
                employee: req.body.employee,
            });
            
            const addbooking = await Eml_take_orderMaintenances.save();
            res.status(200).json(addbooking);

        }catch (error) {
            res.status(500).json(error);
        }

    },
    create_booking_app: async (req, res) => {
        try{ 
            const userId = req.user._id;
            const { date,startHour} = req.body;
            const parsedDate = DatePicker.parseDate(date);
            const newMaintenance = await new Maintenance({
                username: req.body.username,
                phone: req.body.phone,
                address: req.body.address,
                date: parsedDate,
                description: req.body.description,
                noted: req.body.noted
            });
            if(req.body.user) {
                const addbooking = await userorderMaintenances.save();
                
                const user = User.findById(req.body.user);
    
                await user.updateOne({ $push: { maintenance_Id: addbooking._id } });
                res.status(200).json(addbooking);
                
            }
            
        }catch (error) {
            
            res.status(500).json(error);
        }
    },
    user_all_Booking_service: async(req, res) =>{
        try {
            // viết id roi populate
            //user_id tự đặt đỡ nhầm _id
            const user = await Maintenance.find({ _id: req.body.user_id}).populate({path: 'user'});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    },
    Epl_all_Booking_service: async(req, res) =>{
        try {
            const epl = await Maintenance.find({ _id: req.body.epl_id}).populate({path: 'employee'});
            res.status(200).json(epl);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    },
    get_User_Booking_service: async (req, res) => {
        try {
            const user = await Maintenance.findById(req.params.id).populate("user");
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    addBooking:async(req,res) => {
        try{
            const orderMaintenances = await new Maintenance({
                description: req.body.description,
                date: req.body.date,
                startHour:req.body.startHour
            });
            
            const addbooking = await orderMaintenances.save();
            res.status(200).json(addbooking);

        }catch (error) {
            res.status(500).json(error);
        }

    },
    getAllMaintenance: async (req, res) => {
        try {
            const maintenance = await Maintenance.find()
            res.status(200).json(maintenance)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAMaintenance: async (req, res) => {
        try {
            const maintenance = await Maintenance.findById(req.params.id).populate("employee");
            res.status(200).json(maintenance);// .employee.id
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteAMaintenance: async (req, res) => {
        try {
            const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
            res.status(200).json(`Delete successfully`)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateAMaintenance: async (req, res) => {
        try {
            const maintenance =  await Maintenance.findById(req.params.id)
            await maintenance.updateOne({$set: req.body});
            res.status(200).json('Updated successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    },
   
    getorderMaintenance:async(req, res)=>{
        try {
            const order_maintenance = await Maintenance.findById(req.params.id).populate("user");;
            res.status(200).json(order_maintenance);
        }catch(error) {
            res.status(500).json(error);
        }
    }
};

module.exports = maintenanceControllers;
