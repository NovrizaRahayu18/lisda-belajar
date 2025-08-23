import { sequelize, DataTypes } from "../config/connection.js";
const DataTiket=sequelize.define('data_tiket',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nomor_tiket:{
        type:DataTypes.INTEGER,
        allownull:false
    },
    harga_tiket:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    deskripsi_tiket:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default DataTiket;