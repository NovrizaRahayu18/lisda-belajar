import Employee from "../model/pegawai.js";
import {z} from "zod";

const PegawaiSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    position: z.string().min(1, "Posisi wajib diisi").max(100, "Stok tidak boleh lebih dari 100"),
    salary: z.number().min(1000, "gaji harus lebih besar dari 500"),
    age:z.number().min(17, "Usia minimal 17 tahun"),
    gender: z.string().min(3, "gender wajib diisi").max(1000,"Maksimal 1000"),
    alamat:z.string().min(10, "alamat wajib diisi").max(100,"maksimal 100 karakter")

});

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
            const result=PegawaiSchema.safeParse(req.body);
            if(!result.success){
                const fieldErrors=z.flattenError(result.error).fieldErrors;
                return res.status(442).json({
                    message:"Validation error",
                    errors:fieldErrors
                });
            }
            const employee = await Employee.create(result.data);
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
            const result = PegawaiSchema.safeParse(req.body);
            if (!result.success){
                const fieldErrors=z.flattenError(result.error).fieldErrors;
                return res.status(442).json({
                    message:"Validation error",
                    errors:fieldErrors
                });
            }
            await employee.update(result.data);
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
            res.status(200).json({ message: `Employee deleted successfully` });
        } catch (error) {
            res.status(500).json({ message: "Error deleting employee", error: error.message });
        }
    }
}

export default new PegawaiController();