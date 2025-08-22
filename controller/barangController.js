import Barang from "../model/barang.js";

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
            const barang = await Barang.create(req.body);
            res.status(201).json({
                message: "Barang created successfully",
                data: barang
            });
        } catch (error) {
            res.status(500).json({ message: "Error creating barang", error: error.message });
        }
    }

    async update(req, res) {
        try {
            const barang = await Barang.findByPk(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: "Barang not found" });
            }
            await barang.update(req.body);
            res.status(200).json({
                message: "Barang updated successfully",
                data: barang
            });
        } catch (error) {
            res.status(500).json({ message: "Error updating barang", error: error.message });
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