import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('db_pegawai', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Failed connect to database:", err.message);
    });

export { sequelize, DataTypes };
