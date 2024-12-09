import express from "express";
import { crearEstudiante, deleteEstudiante, obtener1Estudiante, obtenerEstudiantes, updateEstudiante, obtener1Ramo, obtenerRamos, updateRamo, crearRamo, deleteRamo, obtenerCarreras, obtener1Carrera, crearCarrera, updateCarrera, deleteCarrera, obtenerFacultades, obtener1Facultad, crearFacultad, updateFacultad, deleteFacultad, obtenerEncargados, obtener1Encargado, crearEncargado, updateEncargado, deleteEncargado, obtenerAdmins, obtener1Admin, crearAdmin, updateAdmin, deleteAdmin, obtenerPeriodos, obtener1Periodo, crearPeriodo, updatePeriodo, deletePeriodo, obtenerRoles, obtener1Rol, crearRol, updateRol, deleteRol, obtenerPostulaciones, obtener1Postulacion, crearPostulacion, updatePostulacion, deletePostulacion, obtenerResultados, obtener1Resultado, crearResultado, updateResultado, deleteResultado, obtenerDetalle_estudiante_ramo, obtener1Detalle_estudiante_ramo, crearDetalle_estudiante_ramo, updateDetalle_estudiante_ramo, deleteDetalle_estudiante_ramo } from "../controllers/adminController.js";
import validateToken from "./validate-token.js";
const router = express.Router() 

//estudiante
router.get('/estudiante' ,validateToken, obtenerEstudiantes)
router.get('/estudiante/:rut_estudiante',validateToken, obtener1Estudiante)
router.post('/estudiante',validateToken, crearEstudiante)
router.put('/estudiante/:rut_estudiante',validateToken, updateEstudiante)
router.delete('/estudiante/:rut_estudiante', validateToken, deleteEstudiante)

//ramo
router.get('/ramo',validateToken, obtenerRamos)
router.get('/ramo/:id_ramo',validateToken, obtener1Ramo)
router.post('/ramo',validateToken, crearRamo)
router.put('/ramo/:id_ramo',validateToken, updateRamo)
router.delete('/ramo/:id_ramo',validateToken, deleteRamo)

//carrera
router.get('/carrera',validateToken, obtenerCarreras)
router.get('/carrera/:id_carrera',validateToken, obtener1Carrera)
router.post('/carrera',validateToken, crearCarrera)
router.put('/carrera/:id_carrera',validateToken, updateCarrera)
router.delete('/carrera/:id_carrera',validateToken, deleteCarrera)

// facultad
router.get('/facultad',validateToken, obtenerFacultades)
router.get('/facultad/:id_facultad',validateToken, obtener1Facultad)
router.post('/facultad',validateToken, crearFacultad)
router.put('/facultad/:id_facultad', validateToken,updateFacultad)
router.delete('/facultad/:id_facultad',validateToken, deleteFacultad)

// encargado
router.get('/encargado',validateToken, obtenerEncargados)
router.get('/encargado/:rut_evaluador', validateToken,obtener1Encargado)
router.post('/encargado', validateToken,crearEncargado)
router.put('/encargado/:rut_evaluador', validateToken,updateEncargado)
router.delete('/encargado/:rut_evaluador',validateToken, deleteEncargado)

// admin
router.get('/admin',validateToken, obtenerAdmins)
router.get('/admin/:rut_administrador', validateToken,obtener1Admin)
router.post('/admin',validateToken, crearAdmin)
router.put('/admin/:rut_administrador', validateToken,updateAdmin)
router.delete('/admin/:rut_administrador',validateToken, deleteAdmin)

// periodo
router.get('/periodo',validateToken, obtenerPeriodos)
router.get('/periodo/:id_periodo',validateToken, obtener1Periodo)
router.post('/periodo',validateToken, crearPeriodo)
router.put('/periodo/:id_periodo',validateToken, updatePeriodo)
router.delete('/periodo/:id_periodo',validateToken, deletePeriodo)

// rol
router.get('/rol',validateToken, obtenerRoles)
router.get('/rol/:id_rol',validateToken, obtener1Rol)
router.post('/rol',validateToken, crearRol)
router.put('/rol/:id_rol',validateToken, updateRol)
router.delete('/rol/:id_rol',validateToken, deleteRol)

// postulacion
router.get('/postulacion',validateToken, obtenerPostulaciones)
router.get('/postulacion/:id_postulacion',validateToken, obtener1Postulacion)
router.post('/postulacion',validateToken, crearPostulacion)
router.put('/postulacion/:id_postulacion',validateToken, updatePostulacion)
router.delete('/postulacion/:id_postulacion',validateToken, deletePostulacion)

// resultados
router.get('/resultado',validateToken, obtenerResultados)
router.get('/resultado/:id_resultados',validateToken, obtener1Resultado)
router.post('/resultado',validateToken, crearResultado)
router.put('/resultado/:id_resultados',validateToken, updateResultado)
router.delete('/resultado/:id_resultados',validateToken, deleteResultado)

// detalle_estudiantes_ramo
router.get('/de_esra',validateToken, obtenerDetalle_estudiante_ramo)
router.get('/de_esra/:id_detalle_estudiante_ramo',validateToken, obtener1Detalle_estudiante_ramo)
router.post('/de_esra',validateToken, crearDetalle_estudiante_ramo)
router.put('/de_esra/:id_detalle_estudiante_ramo',validateToken, updateDetalle_estudiante_ramo)
router.delete('/de_esra/:id_detalle_estudiante_ramo',validateToken, deleteDetalle_estudiante_ramo)
export default router