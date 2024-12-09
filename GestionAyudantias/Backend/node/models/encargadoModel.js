//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const encargadoModel = db.define(
  "evaluador",
  {
    rut_evaluador: { type: DataTypes.INTEGER, primaryKey: true },
    id_facultad: { type: DataTypes.INTEGER },
    id_rol: { type: DataTypes.INTEGER },
    nombre_evaluador: { type: DataTypes.STRING },
    apellido1_evaluador: { type: DataTypes.STRING },
    apellido2_evaluador: { type: DataTypes.STRING },
    contraseña_evaluador: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default encargadoModel;
