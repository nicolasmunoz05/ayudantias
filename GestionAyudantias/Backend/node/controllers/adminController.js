import estudianteModel from "../models/estudianteModel.js";
import ramoModel from "../models/ramoModel.js";
import carreraModel from "../models/carreraModel.js";
import facultadModel from "../models/facultadModel.js";
import encargadoModel from "../models/encargadoModel.js";
import adminModel from "../models/adminModel.js";
import periodoModel from "../models/periodoModel.js";
import rolModel from "../models/rolModel.js";
import postulacionModel from "../models/postulacionModel.js";
import resultadoModel from "../models/resultadoModel.js";
import detalle_estudiante_ramoModel from "../models/detalle_estudiante_ramoModel.js";

// CRUD
//Estudiantes
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
    // Verificar que req.body.nombre existe y es una cadena de texto
    if (req.body.nombres_estudiante && typeof req.body.nombres_estudiante === 'string') {
      // Capitalizar la primera letra de cada palabra en el nombres_estudiante
      const nombres_estudianteCapitalizado = req.body.nombres_estudiante
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const apellido1_capitalizado= req.body.apellido1_estudiante
        .toLowerCase()
        .split(' ')
        .map((word2) => word2.charAt(0).toUpperCase() + word2.slice(1))
        .join(' ');

      const apellido2_capitalizado= req.body.apellido2_estudiante
        .toLowerCase()
        .split(' ')
        .map((word2) => word2.charAt(0).toUpperCase() + word2.slice(1))
        .join(' ');

      const estudiante = {...req.body,
        nombres_estudiante: nombres_estudianteCapitalizado,
        apellido1_estudiante: apellido1_capitalizado,
        apellido2_estudiante: apellido2_capitalizado,
       };
    

      // Agregar el estudiante a la base de datos
      await estudianteModel.create(estudiante);

      res.json({
        message: "¡Registro creado con éxito!",
        mostrar: estudiante
      });

    } 
    
    else {
      throw new Error("El formato del nombre es incorrecto");
    }
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

// Ramo
//VER RAMOS
export const obtenerRamos = async (req, res) => {
  try {
    const ramos = await ramoModel.findAll();
    res.json(ramos);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN RAMO
export const obtener1Ramo = async (req, res) => {
  try {
    const ramo = await ramoModel.findAll({
      where: { id_ramo: req.params.id_ramo },
    });
    res.json(ramo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//CREAR RAMO
export const crearRamo = async (req, res) => {
  try {
    await ramoModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR RAMO
export const updateRamo = async (req, res) => {
  try {
    await ramoModel.update(req.body, {
      where: { id_ramo: req.params.id_ramo },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR RAMO
export const deleteRamo = async (req, res) => {
  try {
    await ramoModel.destroy({
      where: { id_ramo: req.params.id_ramo },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// CARRERA
//VER CARRERA
export const obtenerCarreras = async (req, res) => {
  try {
    const carreras = await carreraModel.findAll();
    res.json(carreras);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UNA CARRERA
export const obtener1Carrera = async (req, res) => {
  try {
    const carrera = await carreraModel.findAll({
      where: { id_carrera: req.params.id_carrera },
    });
    res.json(carrera[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//CREAR CARRERA
export const crearCarrera = async (req, res) => {
  try {
    await carreraModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR CARRERA
export const updateCarrera = async (req, res) => {
  try {
    await carreraModel.update(req.body, {
      where: { id_carrera: req.params.id_carrera },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR CARRERA
export const deleteCarrera = async (req, res) => {
  try {
    await carreraModel.destroy({
      where: { id_carrera: req.params.id_carrera },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// FACULTADES
//VER FACULTAD
export const obtenerFacultades = async (req, res) => {
  try {
    const facultades = await facultadModel.findAll();
    res.json(facultades);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UNA FACULTAD
export const obtener1Facultad = async (req, res) => {
  try {
    const facultad = await facultadModel.findAll({
      where: { id_facultad: req.params.id_facultad },
    });
    res.json(facultad[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//CREAR FACULTAD
export const crearFacultad = async (req, res) => {
  try {
    await facultadModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR FACULTAD
export const updateFacultad = async (req, res) => {
  try {
    await facultadModel.update(req.body, {
      where: { id_facultad: req.params.id_facultad },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR FACULTAD
export const deleteFacultad = async (req, res) => {
  try {
    await facultadModel.destroy({
      where: { id_facultad: req.params.id_facultad },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ENCARGADO
// MOSTRAR LOS REGISTROS

export const obtenerEncargados = async (req, res) => {
  try {
    const encargados = await encargadoModel.findAll();
    res.json(encargados);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Encargado = async (req, res) => {
  try {
    const encargado = await encargadoModel.findAll({
      where: { rut_evaluador: req.params.rut_evaluador },
    });
    res.json(encargado[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR ENCARGADO
export const crearEncargado = async (req, res) => {
  try {
    // Verificar que req.body.nombre existe y es una cadena de texto
    const test=1
    if (test==1) {
      // Capitalizar la primera letra de cada palabra en el nombre_evaluador
      const nombre_evaluadorCapitalizado = req.body.nombre_evaluador
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const apellido1_capitalizado= req.body.apellido1_evaluador
        .toLowerCase()
        .split(' ')
        .map((word2) => word2.charAt(0).toUpperCase() + word2.slice(1))
        .join(' ');

      const apellido2_capitalizado= req.body.apellido2_evaluador
        .toLowerCase()
        .split(' ')
        .map((word3) => word3.charAt(0).toUpperCase() + word3.slice(1))
        .join(' ');

      const evaluador = {...req.body,
        nombre_evaluador: nombre_evaluadorCapitalizado,
        apellido1_evaluador: apellido1_capitalizado,
        apellido2_evaluador: apellido2_capitalizado
       };
    

      // Agregar el estudiante a la base de datos
      await encargadoModel.create(evaluador);

      res.json({
        message: "¡Registro creado con éxito!",
        mostrar: evaluador
      });

    } 
    
    else {
      throw new Error("El formato del nombre es incorrecto");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR ENCARGADO
export const updateEncargado = async (req, res) => {
  try {
    await encargadoModel.update(req.body, {
      where: { rut_evaluador: req.params.rut_evaluador },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR ENCARGADO
export const deleteEncargado = async (req, res) => {
  try {
    await encargadoModel.destroy({
      where: { rut_evaluador: req.params.rut_evaluador },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ADMIN
// MOSTRAR LOS REGISTROS

export const obtenerAdmins = async (req, res) => {
  try {
    const admins = await adminModel.findAll();
    res.json(admins);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Admin = async (req, res) => {
  try {
    const admin = await adminModel.findAll({
      where: { rut_administrador: req.params.rut_administrador },
    });
    res.json(admin[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR ADMIN
export const crearAdmin = async (req, res) => {
  try {
    await adminModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR ADMIN
export const updateAdmin = async (req, res) => {
  try {
    await adminModel.update(req.body, {
      where: { rut_administrador: req.params.rut_administrador },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR ADMIN
export const deleteAdmin = async (req, res) => {
  try {
    await adminModel.destroy({
      where: { rut_administrador: req.params.rut_administrador },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//PERIODO
// MOSTRAR LOS REGISTROS

export const obtenerPeriodos = async (req, res) => {
  try {
    const periodos = await periodoModel.findAll();
    res.json(periodos);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Periodo = async (req, res) => {
  try {
    const periodo = await periodoModel.findAll({
      where: { id_periodo: req.params.id_periodo },
    });
    res.json(periodo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR PERIODO
export const crearPeriodo = async (req, res) => {
  try {
    await periodoModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR PERIODO
export const updatePeriodo = async (req, res) => {
  try {
    await periodoModel.update(req.body, {
      where: { id_periodo: req.params.id_periodo },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR PERIODO
export const deletePeriodo = async (req, res) => {
  try {
    await periodoModel.destroy({
      where: { id_periodo: req.params.id_periodo },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ROL
// MOSTRAR LOS REGISTROS

export const obtenerRoles = async (req, res) => {
  try {
    const roles = await rolModel.findAll();
    res.json(roles);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Rol = async (req, res) => {
  try {
    const rol = await rolModel.findAll({
      where: { id_rol: req.params.id_rol },
    });
    res.json(rol[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR ROL
export const crearRol = async (req, res) => {
  try {
    await rolModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR ROL
export const updateRol = async (req, res) => {
  try {
    await rolModel.update(req.body, {
      where: { id_rol: req.params.id_rol },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR ROL
export const deleteRol = async (req, res) => {
  try {
    await rolModel.destroy({
      where: { id_rol: req.params.id_rol },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//POSTULACION
// MOSTRAR LOS REGISTROS

export const obtenerPostulaciones = async (req, res) => {
  try {
    const postulaciones = await postulacionModel.findAll();
    res.json(postulaciones);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Postulacion = async (req, res) => {
  try {
    const postulacion = await postulacionModel.findAll({
      where: { id_postulacion: req.params.id_postulacion },
    });
    res.json(postulacion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR POSTULACION
export const crearPostulacion = async (req, res) => {
  try {
    await postulacionModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR POSTULACION
export const updatePostulacion = async (req, res) => {
  try {
    await postulacionModel.update(req.body, {
      where: { id_postulacion: req.params.id_postulacion },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR POSTULACION
export const deletePostulacion = async (req, res) => {
  try {
    await postulacionModel.destroy({
      where: { id_postulacion: req.params.id_postulacion },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//RESULTADOS
// MOSTRAR LOS REGISTROS

export const obtenerResultados = async (req, res) => {
  try {
    const resultados = await resultadoModel.findAll();
    res.json(resultados);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Resultado = async (req, res) => {
  try {
    const resultado = await resultadoModel.findAll({
      where: { id_resultados: req.params.id_resultados },
    });
    res.json(resultado[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR RESULTADOS
export const crearResultado = async (req, res) => {
  try {
    await resultadoModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR RESULTADOS
export const updateResultado = async (req, res) => {
  try {
    await resultadoModel.update(req.body, {
      where: { id_resultados: req.params.id_resultados },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR RESULTADOS
export const deleteResultado = async (req, res) => {
  try {
    await resultadoModel.destroy({
      where: { id_resultados: req.params.id_resultados },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//DETALLE ESTUDIANTE_RAMO
// MOSTRAR LOS REGISTROS

export const obtenerDetalle_estudiante_ramo = async (req, res) => {
  try {
    const detalle_estudiante_ramo =
      await detalle_estudiante_ramoModel.findAll();
    res.json(detalle_estudiante_ramo);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//MOSTRAR UN REGISTRO
export const obtener1Detalle_estudiante_ramo = async (req, res) => {
  try {
    const detalle_estudiante_ramo = await detalle_estudiante_ramoModel.findAll({
      where: {
        id_detalle_estudiante_ramo: req.params.id_detalle_estudiante_ramo,
      },
    });
    res.json(detalle_estudiante_ramo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//CREAR DETALLE ESTUDIANTE_RAMO
export const crearDetalle_estudiante_ramo = async (req, res) => {
  try {
    await detalle_estudiante_ramoModel.create(req.body);
    res.json({
      message: "¡Registro creado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ACTUALIZAR DETALLE ESTUDIANTE_RAMO
export const updateDetalle_estudiante_ramo = async (req, res) => {
  try {
    await detalle_estudiante_ramoModel.update(req.body, {
      where: {
        id_detalle_estudiante_ramo: req.params.id_detalle_estudiante_ramo,
      },
    });
    res.json({
      message: "¡Registro actualizado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//ELIMINAR DETALLE ESTUDIANTE_RAMO
export const deleteDetalle_estudiante_ramo = async (req, res) => {
  try {
    await detalle_estudiante_ramoModel.destroy({
      where: {
        id_detalle_estudiante_ramo: req.params.id_detalle_estudiante_ramo,
      },
    });
    res.json({
      message: "¡Registro borrado con exito!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
