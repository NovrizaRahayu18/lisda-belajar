import express from "express";
import pegawaiController from "../controller/pegawaiController.js";

const router = express.Router();

router.get("/pegawai", pegawaiController.getAll);
router.get("/pegawai/:id", pegawaiController.getOne);
router.post("/pegawai", pegawaiController.create);
router.put("/pegawai/:id", pegawaiController.update);
router.delete("/pegawai/:id", pegawaiController.delete);

export default router;