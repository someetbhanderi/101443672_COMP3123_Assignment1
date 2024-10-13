const Employee = require('../models/employeeModel');

// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create New Employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee_id: newEmployee._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Employee By ID
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;

    try {
        const employee = await Employee.findById(eid);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;
    const { position, salary } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { position, salary }, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.query;

    try {
        await Employee.findByIdAndDelete(eid);
        res.status(204).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
