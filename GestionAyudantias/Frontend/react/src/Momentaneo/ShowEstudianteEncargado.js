import React, { useState, useEffect } from 'react';
import axios from '././Axios.js'; 
import { useParams } from 'react-router-dom';


const buttonStyle = {
    marginRight: '10px',
};

const CompShowEstudianteEncargado = () => {
    const { id_encargado } = useParams();
    const [estudiantes, setEstudiantes] = useState([]); // Inicializa estudiantes como un arreglo vacío

    useEffect(() => {
        getEstudiantes();
    }, []);

    // PROCEDIMIENTO PARA MOSTRAR LOS ESTUDIANTES
    const getEstudiantes = async () => {
        try {
            const res = await axios.get(`/encargado/${id_encargado}`);
            if (Array.isArray(res.data)) {
                setEstudiantes(res.data);
            } else {
                console.error(res.data);
            }
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Rut</th>
                                <th>Nombres</th>
                                <th>Apellido Paterno</th>
                                <th>PPA</th>
                                <th>Gestionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((estudiante) => (
                                <tr key={estudiante.rut_estudiante}>
                                    <td>{estudiante.rut_estudiante}</td>
                                    <td>{estudiante.nombres_estudiante}</td>
                                    <td>{estudiante.apellido1_estudiante}</td>
                                    <td>{estudiante.PPA_estudiante}</td>
                                    <td>
                                        <button style={buttonStyle}>Aceptar</button>
                                        <button>Rechazar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompShowEstudianteEncargado;
