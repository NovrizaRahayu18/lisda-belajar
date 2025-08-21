import Employee from "../model/pegawai.js";

class PegawaiController {

    async getAll(req, res) {
        try {
            const employees = await Employee.findAll();
            res.status(200).json({
                message: "Get all employees successfully",
                data: employees
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching employees", error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.status(200).json({
                message: "Get employee successfully",
                data: employee
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching employee", error: error.message });
        }
    }

    async create(req, res) {
        try {
            const employee = await Employee.create(req.body);
            res.status(201).json({
                message: "Employee created successfully",
                data: employee
            });
        } catch (error) {
            res.status(500).json({ message: "Error creating employee", error: error.message });
        }
    }

    async update(req, res) {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            await employee.update(req.body);
            res.status(200).json({
                message: "Employee updated successfully",
                data: employee
            });
        } catch (error) {
            res.status(500).json({ message: "Error updating employee", error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            await employee.destroy();
            res.status(200).json({ message: "Employee deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting employee", error: error.message });
        }
    }
}

export default new PegawaiController();