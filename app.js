import express from "express";
import API from "./routes/api.js";
import { sequelize } from "./config/connection.js"

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());
app.use("/", API);

sequelize
    .sync({ alter: true }) // {force: true} = drop & create ulang, {alter: true} = update sesuai model
    .then(() => {
        console.log("Database & tables created!");
        app.listen(port, hostname, () => {
            console.log(`Server berjalan pada http://${hostname}:${port}`);
        });
    })
    .catch((err) => {
        console.error("Gagal sync database:", err);
    });