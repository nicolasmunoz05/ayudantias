//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const resultadoModel = db.define(
  "resultados",
  {
    id_resultados: { type: DataTypes.BIGINT, primaryKey: true },
    id_periodo: { type: DataTypes.INTEGER },
    id_postulacion: { type: DataTypes.BIGINT },
    respuesta: { type: DataTypes.STRING },
    fecha_resultados: { type: DataTypes.DATE},

  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);

export default resultadoModel;
