import express from "express";
import { crearResultadosEncargado, obtenerEstudiantesPostulaciones, updatePostulacion } from "../controllers/encargado2Controller.js";
const router = express.Router() 

router.get('/:rut_evaluador', obtenerEstudiantesPostulaciones)
router.post('/:rut_evaluador', crearResultadosEncargado)
router.put('/:rut_evaluador', updatePostulacion)

export default router