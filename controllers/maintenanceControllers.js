const Maintenance = require("../Models/maintenance");
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

    // createMaintenance: async(req, res) => {
    //     try{
    //         const Create_maintenance = await new Maintenance({
    //             date: req.body.date,
    //             employee: req.body.employee,
    //             description: req.body.description,
    //         })
    //         const maintenance = await Create_maintenance.save();
    //         res.status(200).json(maintenance);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // }, 
};

module.exports = maintenanceControllers;
