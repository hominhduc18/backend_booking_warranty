const Employee = require("../models/employee");
const bcrypt = require("bcrypt");

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
                sex: req.body.sex,
            });
            const user = await newEmployee.save();
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
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
            const employee = await Employee.findById(req.params.id).populate(
                "employee"
            );
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

   

    
};

module.exports = employeeControllers;
