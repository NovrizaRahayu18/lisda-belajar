import { sequelize, DataTypes } from "../config/connection.js";

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Employee;