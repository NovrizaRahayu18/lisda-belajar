import Barang from "../model/barang.js";
import { z } from "zod";

const BarangSchema = z.object({
    nama_barang: z.string().min(1, "Nama wajib diisi"),
    stok: z.number().min(0, "Stok tidak boleh negatif").max(100, "Stok tidak boleh lebih dari 100"),
    harga: z.number().min(1000, "Harga harus lebih besar dari 500"),
});

class BarangController {

    async getAll(req, res) {
        try {
            const barang = await Barang.findAll();
            res.status(200).json({
                message: "Get all barang successfully",
                data: barang
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching barang", error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const barang = await Barang.findByPk(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: "Barang not found" });
            }
            res.status(200).json({
                message: "Get barang successfully",
                data: barang
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching barang", error: error.message });
        }
    }

    async create(req, res) {
        try {
            const result = BarangSchema.safeParse(req.body);

            if (!result.success) {
                const fieldErrors = z.flattenError(result.error).fieldErrors;

                return res.status(422).json({
                    message: "Validation error",
                    errors: fieldErrors
                });
            }

            const barang = await Barang.create(result.data);

            res.status(201).json({
                message: "Barang created successfully",
                data: barang
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating barang",
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const barang = await Barang.findByPk(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: "Barang not found" });
            }

            const result = BarangSchema.safeParse(req.body);
            if (!result.success) {
                const fieldErrors = z.flattenError(result.error).fieldErrors;
                return res.status(422).json({
                    message: "Validation error",
                    errors: fieldErrors
                });
            }

            await Barang.update(result.data);

            res.status(200).json({
                message: "Barang updated successfully",
                data: barang
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating barang",
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const barang = await Barang.findByPk(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: "barang not found" });
            }
            await barang.destroy();
            res.status(200).json({ message: "Barang deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting Barang", error: error.message });
        }
    }
}

export default new BarangController();