import express from "express";
import { crearPostulacionEstudiante, obtenerEstudiantePorReq} from "../controllers/estudiante2Controller.js";
import validateToken from "./validate-token.js";
const router = express.Router() 

//router.get('/',validateToken, obtenerEstudiantes)
router.get('/:rut_estudiante', obtenerEstudiantePorReq)
router.post('/:rut_estudiante', crearPostulacionEstudiante)



export default router