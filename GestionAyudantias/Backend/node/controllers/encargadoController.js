import encargadoModel from "../models/encargadoModel.js";
import carreraModel from "../models/carreraModel.js";
import estudianteModel from "../models/estudianteModel.js";
import facultadModel from "../models/facultadModel.js";
// CRUD
// MOSTRAR LOS REGISTROS

export const obtenerEncargados = async (req, res) => {
  try {
    const encargados = await encargadoModel.findAll();
    res.json(encargados);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR SUS ESTUDIANTES AL ENCARGADO

encargadoModel.belongsTo(facultadModel, { foreignKey: "id_facultad" });
estudianteModel.belongsTo(carreraModel, { foreignKey: "id_carrera" });
export const obtenerEstudiantesPorFacultad = async (req, res) => {
  try {
    // Supongamos que tienes el rut del evaluador en req.params.rutEvaluador
    const rutEvaluador = req.params.rut_evaluador; // Ajusta esto según tu enfoque de obtener el rut

    const evaluador = await encargadoModel.findByPk(rutEvaluador);

    if (!evaluador) {
      return res.status(404).json({ message: "Evaluador no encontrado" });
    }

    const idFacultad = evaluador.id_facultad;

    const estudiantes = await estudianteModel.findAll({
      where: { id_carrera: idFacultad },
      attributes: [
        "rut_estudiante",
        "nombres_estudiante",
        "apellido1_estudiante",
        "PPA_estudiante",
      ],
    });

    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
