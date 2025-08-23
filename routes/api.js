import express from "express";
import pegawaiController from "../controller/pegawaiController.js";
import barangController from "../controller/barangController.js";
import {getAll} from "../controller/pegawaiController.js";
const router = express.Router();

router.get("/pegawai", getAll);
router.get("/pegawai/:id", pegawaiController.getOne);
router.post("/pegawai-create", pegawaiController.create);
router.put("/pegawai/:id", pegawaiController.update);
router.delete("/pegawai/:id", pegawaiController.delete);

router.get("/data-barang", barangController.getAll);
router.get("/barang/:id", barangController.getOne);
router.post("/create-barang", barangController.create);
router.put("/update-barang/:id", barangController.update);
router.delete("/delete-barang/:id", barangController.delete);

export default router;