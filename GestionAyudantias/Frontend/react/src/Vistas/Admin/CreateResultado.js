import axios from '../../Momentaneo/Axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos CSS de la biblioteca
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/resultado/';

const CompCreateResultado = () => {
    const { showNotification } = useNotification();
    const [id_resultados, setId_resultados] = useState('');
    const [id_periodo, setId_periodo] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [id_postulacion, setId_postulacion] = useState('');
    const [fecha_resultados, setFechaResultados] = useState(new Date());
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [postulaciones, setPostulaciones] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [estudiantesInfo, setEstudiantesInfo] = useState({});
    const [ramosInfo, setRamosInfo] = useState({});
    

    const handleIdResultadosChange = (e) => {
        setId_resultados(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_resultados: '' }));
    };

    const handleIdPeriodoChange = (e) => {
        setId_periodo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_periodo: '' }));
    };

    const handleRespuestaChange = (e) => {
        setRespuesta(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, respuesta: '' }));
    };
    const handleFechaResultadosChange = (date) => {
        setFechaResultados(date);
        // Puedes realizar validaciones adicionales si es necesario
    };

    useEffect(() => {
        // Realizar la solicitud para obtener la información de todos los estudiantes
        const fetchEstudiantesInfo = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/estudiante/');
                const estudiantesInfo = res.data.reduce((map, estudiante) => {
                    map[estudiante.rut_estudiante] = {
                        nombres: estudiante.nombres_estudiante,
                        apellidos: estudiante.apellido1_estudiante + " "+ estudiante.apellido2_estudiante,
                    };
                    return map;
                }, {});
                setEstudiantesInfo(estudiantesInfo);
            } catch (error) {
                console.error('Error al cargar información de estudiantes:', error);
            }
        };
        // Llamar a la función al montar el componente
        fetchEstudiantesInfo();
    }, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez

    useEffect(() => {
        // Realizar la solicitud para obtener la información de todos los estudiantes
        const fetchRamosInfo = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/ramo/');
                const ramosInfo = res.data.reduce((map, ramo) => {
                    map[ramo.id_ramo] = {
                        nombreR: ramo.nombre_ramo,
                    };
                    return map;
                }, {});
                setRamosInfo(ramosInfo);
            } catch (error) {
                console.error('Error al cargar información de ramos:', error);
            }
        };
        // Llamar a la función al montar el componente
        fetchRamosInfo();
    }, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez













    const handleIdPostulacionChange = (e) => {
        const selectedIdPostulacion = e.target.value;
        setId_postulacion(selectedIdPostulacion);
        setErrors((prevErrors) => ({ ...prevErrors, id_postulacion: '' }));
    };

    useEffect(() => {
        getPostulaciones();
    }, []);

    const getPostulaciones = async () => {
        try {
            const res = await axios.get('http://localhost:8000/admin/postulacion/');
            setPostulaciones(res.data);
        } catch (error) {
            console.error('Error al obtener postulaciones:', error);
        }
    };

    useEffect(() => {
        getPeriodos();
    }, []);

    const getPeriodos = async () => {
        try {
            const res = await axios.get('http://localhost:8000/admin/periodo/');
            setPeriodos(res.data);
        } catch (error) {
            console.error('Error al obtener periodos:', error);
        }
    };

    const store = async (e) => {
        e.preventDefault();

        // Validar campos
        const newErrors = {};
        if (!id_resultados) {
            newErrors.id_resultados = 'El campo ID Resultados es obligatorio';
        }
        if (!id_periodo) {
            newErrors.id_periodo = 'El campo ID Periodo es obligatorio';
        }
        if (!respuesta) {
            newErrors.respuesta = 'El campo Respuesta es obligatorio';
        }
        if (!id_postulacion) {
            newErrors.id_postulacion = 'El campo ID Postulación es obligatorio';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Detener el envío del formulario si hay errores
        }

        // Enviar el formulario si no hay errores
        await axios.post(URI, {
            id_resultados,
            id_periodo,
            respuesta,
            id_postulacion,
            fecha_resultados,
        });

        showNotification(`Resultado ID "${id_resultados}" creado exitosamente`, 'success',{
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });


        navigate('/admin/resultado');
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>Crear un nuevo resultado</h2>
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>ID Resultados</label>
                        <input
                            value={id_resultados}
                            onChange={handleIdResultadosChange}
                            type='text'
                            className={`form-control ${errors.id_resultados ? 'is-invalid' : ''}`}
                        />
                        {errors.id_resultados && (
                            <div className='invalid-feedback'>{errors.id_resultados}</div>
                        )}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>ID Periodo</label>
                        <select
                            value={id_periodo}
                            onChange={handleIdPeriodoChange}
                            className={`form-control ${errors.id_periodo ? 'is-invalid' : ''}`}
                        >
                            <option value=''>Seleccione un Periodo</option>
                            {periodos.map((periodo) => (
                                <option key={periodo.id_periodo} value={periodo.id_periodo}>
                                    {periodo.año_periodo} / {periodo.semestre_periodo}
                                </option>
                            ))}
                        </select>
                        {errors.id_periodo && <div className='invalid-feedback'>{errors.id_periodo}</div>}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Respuesta</label>
                        <select
                            value={respuesta}
                            onChange={handleRespuestaChange}
                            className={`form-control ${errors.respuesta ? 'is-invalid' : ''}`}
                        >
                            <option value=''>Seleccione la Respuesta</option>
                            <option value='pendiente'>Pendiente</option>
                            <option value='aprobado'>Aprobado</option>
                            <option value='rechazado'>Rechazado</option>
                        </select>
                        {errors.respuesta && (
                            <div className='invalid-feedback'>{errors.respuesta}</div>
                        )}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>ID Postulacion</label>
                        <select
                            value={id_postulacion}
                            onChange={handleIdPostulacionChange}
                            className={`form-control ${errors.id_postulacion ? 'is-invalid' : ''}`}
                        >
                            <option value=''>Seleccione un postulante</option>
                            {postulaciones.map((postulacion) => (
                                <option
                                    key={postulacion.id_postulacion}
                                    value={postulacion.id_postulacion}
                                >
                                    [{ramosInfo[postulacion.id_ramo]?.nombreR}] {estudiantesInfo[postulacion.rut_estudiante]?.nombres} {estudiantesInfo[postulacion.rut_estudiante]?.apellidos}
                                </option>
                            ))}
                        </select>
                        {errors.id_postulacion && <div className='invalid-feedback'>{errors.id_postulacion}</div>}
                    </div>
                    <div className='mb-3'>
                            <label className='form-label'>Fecha de Resultados</label>
                            <div className='mb-0'></div>
                            <DatePicker
                                selected={fecha_resultados}
                                onChange={handleFechaResultadosChange}
                                dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                                className={`form-control ${errors.fecha_resultados ? 'is-invalid' : ''}`}
                            />
                            {errors.fecha_resultados && <div className='invalid-feedback'>{errors.fecha_resultados}</div>}
                        </div>


                    <button type='submit' className='btn btn-primary btn-lg mb-1 mr-1'>
                        Guardar Cambios
                    </button>
                    <Link to='/admin/resultado' className='btn btn-secondary btn-lg mb-1 mr-1'>
                        Volver atrás
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CompCreateResultado;
