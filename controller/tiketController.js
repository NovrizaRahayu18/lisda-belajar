import Tiket from "../model/Tiket.js";
import { z } from "zod";

const TiketSchema = z.object({
    nomor_tiket: z.number().min(1, "Nomor tiket wajib diisi").max(500, "kode tidak lebih dari 500"),
    harga_tiket:z.number().min(1000, "harga tiket harus lebih besar dari 1000"),
    deskripsi_tiket:z.string().min(10, "Deskripsi tiket harus lebih dari 10 karakter").max(100,"Deskripsi harus kurang dari 200")
});

class TiketController {

    async getAll(req, res) {
        try {
            const tiket = await Tiket.findAll();
            res.status(200).json({
                message: "Get all tiket successfully",
                data: tiket
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching tiket", error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const tiket = await Tiket.findByPk(req.params.id);
            if (!tiket) {
                return res.status(404).json({ message: "Tiket not found" });
            }
            res.status(200).json({
                message: "Get Tiket successfully",
                data: tiket
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching Tiket", error: error.message });
        }
    }

    async create(req, res) {
        try {
            const result = TiketSchema.safeParse(req.body);

            if (!result.success) {
                const fieldErrors = z.flattenError(result.error).fieldErrors;

                return res.status(422).json({
                    message: "Validation error",
                    errors: fieldErrors
                });
            }

            const tiket = await Tiket.create(result.data);

            res.status(201).json({
                message: "Tiket created successfully",
                data: tiket
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating Tiket",
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const tiket = await Tiket.findByPk(req.params.id);
            if (!tiket) {
                return res.status(404).json({ message: "Tiket not found" });
            }

            const result = TiketSchema.safeParse(req.body);
            if (!result.success) {
                const fieldErrors = z.flattenError(result.error).fieldErrors;
                return res.status(422).json({
                    message: "Validation error",
                    errors: fieldErrors
                });
            }

            await tiket.update(result.data);

            res.status(200).json({
                message: "Tiket updated successfully",
                data: tiket
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating Tiket",
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const tiket = await Tiket.findByPk(req.params.id);
            if (!tiket) {
                return res.status(404).json({ message: "Tiket not found" });
            }
            await tiket.destroy();
            res.status(200).json({ message: "Tiket deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting Tiket", error: error.message });
        }
    }
}

export default new TiketController();