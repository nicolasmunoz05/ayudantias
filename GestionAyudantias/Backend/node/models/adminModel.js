//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const adminModel = db.define(
  "administrador",
  {
    rut_administrador: { type: DataTypes.INTEGER, primaryKey: true },
    id_rol: { type: DataTypes.INTEGER },
    correo_administrador: { type: DataTypes.STRING },
    contraseña_administrador: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default adminModel;
