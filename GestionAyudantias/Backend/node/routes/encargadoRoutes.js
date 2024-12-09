import express from "express";
import { obtenerEncargados, obtenerEstudiantesPorFacultad } from "../controllers/encargadoController.js";
import validateToken from "./validate-token.js";
const router = express.Router() 

//router.get('/', obtenerEncargados)


router.get('/:rut_evaluador', validateToken, obtenerEstudiantesPorFacultad)
/*
router.post('/', crearEstudiante)

router.put('/:rut_estudiante', updateEstudiante)

router.delete('/:rut_estudiante', deleteEstudiante)
*/
export default router