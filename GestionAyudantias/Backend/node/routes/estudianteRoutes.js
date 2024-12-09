import express from "express";
import { crearEstudiante, deleteEstudiante, obtener1Estudiante, obtenerEstudiantes, updateEstudiante } from "../controllers/estudianteController.js";
import validateToken from "./validate-token.js";
const router = express.Router() 
router.get('/',validateToken, obtenerEstudiantes)

//router.get('/', obtenerEstudiantes)

router.get('/:rut_estudiante', obtener1Estudiante)

router.post('/', crearEstudiante)

router.put('/:rut_estudiante', updateEstudiante)

router.delete('/:rut_estudiante', deleteEstudiante)

export default router