const Maintenance = require("../Models/maintenance");
const User = require("../Models/User");
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
            const userorderMaintenances = await new Maintenance({
                description: req.body.description,
                noted: req.body.noted,
                date: req.body.date,
                startHour:req.body.startHour,
                user: req.body.user,
                address: req.body.address,
            });
            
            const addbooking = await userorderMaintenances.save();
            res.status(200).json(addbooking);

        }catch (error) {
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
            
            const newMaintenance = await new Maintenance({
            username: req.body.username,
            phone: req.body.phone,
            address: req.body.address,
            date: req.body.date,
            startHour:req.body.startHour,
            description: req.body.description,
            noted: req.body.noted
        });
        const maintenance = await newMaintenance.save();
        
        res.status(200).json(maintenance);

    }catch (error) {
        response.statusText = "App_Booking_Err"
        res.status(500).json(error);
    }
    },
    get_infor_booking: async(req, res) => {
        try {
            const booking = await Maintenance.findById({_id: req.params.id});
            if(booking){
                

            }else{

            }

        }catch (error) {
            response.statusText = "App_Booking_Err"
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
            // viết id roi populate
            //user_id tự đặt đỡ nhầm _id
            const epl = await Maintenance.find({ _id: req.body.epl_id}).populate({path: 'employee'});
            res.status(200).json(epl);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    },
    get_User_Booking_service: async (req, res) => {
        try {
            const user = await Maintenance.findById(req.params.id);
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
            const maintenance = await Maintenance.findById(req.params.id);
            res.status(200).json(maintenance);
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
            const order_maintenance = await Maintenance.findById(req.params.id);
            res.status(200).json(order_maintenance);
        }catch(error) {
            res.status(500).json(error);
        }
    }
};

module.exports = maintenanceControllers;
