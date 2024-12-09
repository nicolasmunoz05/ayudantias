import estudianteModel from "../models/estudianteModel.js";

// CRUD
// MOSTRAR LOS REGISTROS

export const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await estudianteModel.findAll();
    res.json(estudiantes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Estudiante = async (req, res) => {
  try {
    const estudiante = await estudianteModel.findAll({
      where: { rut_estudiante: req.params.rut_estudiante },
    });
    res.json(estudiante[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR ESTUDIANTE
export const crearEstudiante = async (req, res) => {
  try {
    await estudianteModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR ESTUDIANTE
export const updateEstudiante = async (req, res) => {
  try {
    await estudianteModel.update(req.body, {
      where: { rut_estudiante: req.params.rut_estudiante },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR ESTUDIANTE
export const deleteEstudiante = async (req, res) => {
  try {
    await estudianteModel.destroy({
      where: { rut_estudiante: req.params.rut_estudiante },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
