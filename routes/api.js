import express from "express";
import pegawaiController from "../controller/pegawaiController.js";
import barangController from "../controller/barangController.js";

const router = express.Router();

router.get("/data-pegawai", pegawaiController.getAll);
router.get("/pegawai/:id", pegawaiController.getOne);
router.post("/pegawai-create", pegawaiController.create);
router.put("/pegawai-update/:id", pegawaiController.update);
router.delete("/pegawai-delete/:id", pegawaiController.delete);

router.get("/data-barang", barangController.getAll);
router.get("/barang/:id", barangController.getOne);
router.post("/create-barang", barangController.create);
router.put("/update-barang/:id", barangController.update);
router.delete("/delete-barang/:id", barangController.delete);

export default router;