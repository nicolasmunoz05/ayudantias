import estudianteModel from "../models/estudianteModel.js";
import ramoModel from "../models/ramoModel.js";
import postulacionModel from "../models/postulacionModel.js";
import detalle_estudiante_ramoModel from "../models/detalle_estudiante_ramoModel.js";
import { Sequelize } from "sequelize";
import carreraModel from "../models/carreraModel.js";
import resultadoModel from "../models/resultadoModel.js";

//MOSTRAR DATOS ESTUDIANTE
ramoModel.hasMany(detalle_estudiante_ramoModel, { foreignKey: "id_ramo" });
resultadoModel.belongsTo(postulacionModel, { foreignKey: 'id_postulacion' });
postulacionModel.hasOne(resultadoModel, { foreignKey: 'id_postulacion' });
estudianteModel.hasMany(postulacionModel, {foreignKey: 'rut_estudiante'});


export const obtenerEstudiantePorReq = async (req, res) => {
  try {
    const rutEstudiante = req.params.rut_estudiante; 
    const infoEstudiante = await estudianteModel.findOne({
      where: { rut_estudiante: rutEstudiante },
      attributes: [
        "rut_estudiante",
        "id_carrera",
        "nombres_estudiante",
        "apellido1_estudiante",
        "apellido2_estudiante",
        "correo_institucional_estudiante",
        "ppa_estudiante",
        "horas_ayudantia_estudiante",
      ],
    });

    if (!infoEstudiante) {
      return res.status(404).json({ message: infoEstudiante });
    }
    if (
      infoEstudiante.ppa_estudiante < 46 ||
      infoEstudiante.horas_ayudantia_estudiante > 7
    ) {
      return res.json({ message: "No puede postular a nada" });
    }

    const ramos = await ramoModel.findAll({
      include: [
        {
          model: detalle_estudiante_ramoModel,
          where: {
            rut_estudiante: rutEstudiante,
            nota_ramo: {
              [Sequelize.Op.gte]: 45,
            },
          },
        },
      ],
      where: {
        ayudantia_ramo: "si", // Los ramos que tienen ayudantía
      },
    });
    // Obtiene la carrera
    const carrera = await carreraModel.findOne({
      where: { id_carrera: infoEstudiante.id_carrera },
    });
    
    const resultados = await estudianteModel.findAll({
      include: [{
        model: postulacionModel,
        where: { rut_estudiante: rutEstudiante }, 
        include: [{
          model: resultadoModel,
        }],
      }],
    });
    // Apila los datos en un archivo
    const resultado = {
      estudiante: infoEstudiante,
      carrera: carrera,
      ramos: ramos,
      postulaciones: resultados
    };
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearPostulacionEstudiante = async (req, res) => {
  try {
    req.body.rut_estudiante = req.params.rut_estudiante;
    req.body.estado_postulacion = "pendiente";
    req.body.fecha_postulacion = new Date();

    await postulacionModel.create(req.body);
    res.json({ message: "¡Registro creado con éxito!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};


// estudiante => ppa: > 4.5
// detalle_estudiante_ramo => nota_ramo >4.5
// ramo => horas_ayudantia_ramo

