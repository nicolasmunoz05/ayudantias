import axios from '../../Momentaneo/Axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/postulacion/';

const CompEditPostulacion = () => {
    const { showNotification } = useNotification();
    const [id_postulacion, setId_postulacion] = useState('');
    const [rut_estudiante, setRut_estudiante] = useState('');
    const [id_ramo, setId_ramo] = useState('');
    const [id_periodo, setId_periodo] = useState('');
    const [estado_postulacion, setEstado_postulacion] = useState('');
    const [horas_solicitud_ayudantia, setHoras_solicitud] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [ramos, setRamos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [fecha_postulacion, setFechaPostulacion] = useState(new Date());


    useEffect(() => {
        getPostulacionById();
    }, []);

    const getPostulacionById = async () => {
        try {
            const res = await axios.get(URI + id);
            setId_postulacion(res.data.id_postulacion);
            setRut_estudiante(res.data.rut_estudiante);
            setId_ramo(res.data.id_ramo);
            setId_periodo(res.data.id_periodo);
            setEstado_postulacion(res.data.estado_postulacion);
            setHoras_solicitud(res.data.horas_solicitud_ayudantia);
            setFechaPostulacion(new Date(res.data.fecha_postulacion).setDate(new Date(res.data.fecha_postulacion).getDate() + 1));
        } catch (error) {
            console.error('Error al obtener datos de la postulación:', error);
        }
    };

    useEffect(() => {
        getRamos();
    }, []);

    const getRamos = async () => {
        const res = await axios.get('http://localhost:8000/admin/ramo/');
        setRamos(res.data);
    };

    useEffect(() => {
        getPeriodos();
    }, []);

    const getPeriodos = async () => {
        const res = await axios.get('http://localhost:8000/admin/periodo/');
        setPeriodos(res.data);
    };

    const handleIdPostulacionChange = (e) => {
        setId_postulacion(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_postulacion: '' }));
    };

    const handleRutEstudianteChange = (e) => {
        setRut_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, rut_estudiante: '' }));
    };

    const handleIdRamoChange = (e) => {
        setId_ramo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_ramo: '' }));
    };

    const handleIdPeriodoChange = (e) => {
        setId_periodo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_periodo: '' }));
    };

    const handleEstadoPostulacionChange = (e) => {
        setEstado_postulacion(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, estado_postulacion: '' }));
    };

    const handleHorasSolicitudChange = (e) => {
        setHoras_solicitud(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, horas_solicitud_ayudantia: '' }));
    };
    const handleFechaPostulacionChange = (date) => {
        setFechaPostulacion(date);
        // Puedes realizar validaciones adicionales si es necesario
    };


    const update = async (e) => {
        e.preventDefault();

        // Validar campos
        const newErrors = {};
        if (!id_postulacion) {
            newErrors.id_postulacion = 'El campo ID Postulación es obligatorio';
        }
        if (!rut_estudiante) {
            newErrors.rut_estudiante = 'El campo Rut Estudiante es obligatorio';
        }  else if (rut_estudiante.length < 7 || rut_estudiante.length > 10) {
            newErrors.rut_estudiante = 'El campo Rut debe tener entre 7 y 10 dígitos';
        }
        if (!id_ramo) {
            newErrors.id_ramo = 'El campo ID Ramo es obligatorio';
        }
        if (!id_periodo) {
            newErrors.id_periodo = 'El campo ID Periodo es obligatorio';
        }
        if (!estado_postulacion) {
            newErrors.estado_postulacion = 'El campo Estado de Postulación es obligatorio';
        }
        if (!horas_solicitud_ayudantia) {
            newErrors.horas_solicitud_ayudantia = 'El campo Horas Solicitadas es obligatorio';
        }
        setErrors(newErrors);

        // Si no hay errores, realizar la actualización
        if (Object.keys(newErrors).length === 0) {
            try {
                await axios.put(URI + id, {
                    id_postulacion,
                    rut_estudiante,
                    id_ramo,
                    id_periodo,
                    estado_postulacion,
                    horas_solicitud_ayudantia,
                    fecha_postulacion: fecha_postulacion-1,
                });
                showNotification(`Postulación ID "${id_postulacion}" editada exitosamente`, 'info', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                });


                navigate('/admin/postulacion');
            } catch (error) {
                console.error('Error al actualizar postulación:', error);
            }
        }
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>Editar Postulación</h2>
                <form onSubmit={update}>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>ID Postulación</label>
                            <input
                                value={id_postulacion}
                                onChange={handleIdPostulacionChange}
                                type='text'
                                className={`form-control ${errors.id_postulacion ? 'is-invalid' : ''}`}
                            />
                            {errors.id_postulacion && (
                                <div className='invalid-feedback'>{errors.id_postulacion}</div>
                            )}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>Rut Estudiante</label>
                            <input
                                value={rut_estudiante}
                                onChange={handleRutEstudianteChange}
                                type='text'
                                className={`form-control ${errors.rut_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.rut_estudiante && (
                                <div className='invalid-feedback'>{errors.rut_estudiante}</div>
                            )}
                        </div>
                    </div>
                    <div className='row'>

                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>ID Ramo</label>
                            <select
                                value={id_ramo}
                                onChange={handleIdRamoChange}
                                className={`form-control ${errors.id_ramo ? 'is-invalid' : ''}`}
                            >
                                <option value=''>Seleccione un Ramo</option>
                                {ramos.map((ramo) => (
                                    <option key={ramo.id_ramo} value={ramo.id_ramo}>
                                        {ramo.id_ramo} - {ramo.nombre_ramo}
                                    </option>
                                ))}
                            </select>
                            {errors.id_ramo && <div className='invalid-feedback'>{errors.id_ramo}</div>}
                        </div>
                        <div className='col-md-6 mb-3'>
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
                    </div>

                    <div className='row'>

                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Estado Postulación</label>
                            <select
                                value={estado_postulacion}
                                onChange={handleEstadoPostulacionChange}
                                className={`form-control ${errors.estado_postulacion ? 'is-invalid' : ''}`}
                            >
                                <option value=''>Seleccione el Estado</option>
                                <option value='pendiente'>Pendiente</option>
                                <option value='revisado'>Revisado</option>
                            </select>
                            {errors.estado_postulacion && (
                                <div className='invalid-feedback'>{errors.estado_postulacion}</div>
                            )}
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Horas Solicitadas</label>
                            <select
                                value={horas_solicitud_ayudantia}
                                onChange={handleHorasSolicitudChange}
                                className={`form-control ${errors.horas_solicitud_ayudantia ? 'is-invalid' : ''}`}
                            >
                                <option value=''>Seleccione horas de ayudantía</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>

                            </select>
                            {errors.horas_solicitud_ayudantia && (
                                <div className='invalid-feedback'>{errors.horas_solicitud_ayudantia}</div>
                            )}
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Fecha de Postulacion</label>
                            <div className='mb-0'></div>
                            <DatePicker
                                selected={fecha_postulacion}
                                onChange={handleFechaPostulacionChange}
                                dateFormat="yyyy/MM/dd" // Puedes personalizar el formato de la fecha
                                className={`form-control`}
                            />
                        </div>



                    </div>
                    <button type='submit' className='btn btn-primary mb-1 mr-1'>
                        Guardar Cambios
                    </button>
                    <Link to='/admin/postulacion' className='btn btn-secondary mb-1 mr-1'>
                        Volver atrás
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CompEditPostulacion;
