//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const estudianteModel = db.define(
  "estudiante",
  {
    rut_estudiante: { type: DataTypes.INTEGER, primaryKey: true },
    id_carrera: { type: DataTypes.INTEGER },
    id_rol: { type: DataTypes.INTEGER },
    id_periodo: { type: DataTypes.INTEGER },
    nombres_estudiante: { type: DataTypes.STRING },
    apellido1_estudiante: { type: DataTypes.STRING },
    apellido2_estudiante: { type: DataTypes.STRING },
    correo_institucional_estudiante: { type: DataTypes.STRING },
    contraseña_estudiante: { type: DataTypes.STRING },
    ppa_estudiante: { type: DataTypes.INTEGER },
    año_ingreso_estudiante: { type: DataTypes.INTEGER },
    horas_ayudantia_estudiante: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default estudianteModel;
