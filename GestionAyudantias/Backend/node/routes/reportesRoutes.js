import express from 'express';
import { exec } from 'child_process';

const router = express.Router();
const pythonScriptPath = 'reportes/reportes.py';

router.get('/admin', (req, res) => {
    console.log('Solicitud para generar reporte recibida'); 
    exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el script: ${error}`);
            return res.status(500).send('Error al generar el reporte');
        }
        console.log(`Script Python ejecutado correctamente: ${stdout}`);
        return res.send('Reporte generado correctamente');
    });
});


export default router;
