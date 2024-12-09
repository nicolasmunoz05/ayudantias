import axios from '../../Momentaneo/Axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/ramo/';

const CompCreateRamo = () => {
    const { showNotification } = useNotification();
    const [id_ramo, setId_ramo] = useState('');
    const [id_carrera, setId_carrera] = useState('');
    const [id_periodo, setId_periodo] = useState('');
    const [nombre_ramo, setNombre_ramo] = useState('');
    const [horas_ayudantia_ramo, setHoras_ayudantia_ramo] = useState('');
    const [ayudantia_ramo, setAyudantia_ramo] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [carreras, setCarreras] = useState([]);
    const [periodos, setPeriodos] = useState([]);

    const handleIdRamoChange = (e) => {
        setId_ramo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_ramo: '' }));
    };

    const handleIdCarreraChange = (e) => {
        setId_carrera(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_carrera: '' }));
    };

    const handleIdPeriodoChange = (e) => {
        setId_periodo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_periodo: '' }));
    };

    const handleNombreRamoChange = (e) => {
        setNombre_ramo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, nombre_ramo: '' }));
    };

    const handleHorasAyudantiaRamoChange = (e) => {
        setHoras_ayudantia_ramo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, horas_ayudantia_ramo: '' }));
    };

    const handleAyudantiaRamoChange = (e) => {
        setAyudantia_ramo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, ayudantia_ramo: '' }));
    };

    useEffect(() => {
        getCarreras();
    }, []);

    const getCarreras = async () => {
        const res = await axios.get('http://localhost:8000/admin/carrera/');
        setCarreras(res.data);
    };
    useEffect(() => {
        getPeriodos();
    }, []);

    const getPeriodos = async () => {
        const res = await axios.get('http://localhost:8000/admin/periodo/');
        setPeriodos(res.data);
    };

    const store = async (e) => {
        e.preventDefault();

        // Validar campos
        const newErrors = {};
        if (!id_ramo) {
            newErrors.id_ramo = 'El campo Id es obligatorio';
        }
        if (!id_carrera) {
            newErrors.id_carrera = 'El campo ID Carrera es obligatorio';
        }
        if (!id_periodo) {
            newErrors.id_periodo = 'El campo ID Periodo es obligatorio';
        }
        if (!nombre_ramo) {
            newErrors.nombre_ramo = 'El campo Nombre es obligatorio';
        }
        if (!horas_ayudantia_ramo) {
            newErrors.horas_ayudantia_ramo = 'El campo Horas Ayudantia es obligatorio';
        }
        if (!ayudantia_ramo) {
            newErrors.ayudantia_ramo = 'El campo Imparte Ayudantia es obligatorio';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Detener el envío del formulario si hay errores
        }

        // Enviar el formulario si no hay errores
        await axios.post(URI, {
            id_ramo,
            id_carrera,
            id_periodo,
            nombre_ramo,
            horas_ayudantia_ramo,
            ayudantia_ramo,
        });

        showNotification(`Ramo "${nombre_ramo}" creado exitosamente`, 'success',{
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });


        navigate('/admin/ramo');
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>Crear un nuevo ramo</h2>
                <form onSubmit={store}>

                <div className='row'>


                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>ID Ramo</label>
                        <input
                            value={id_ramo}
                            onChange={handleIdRamoChange}
                            type='text'
                            className={`form-control ${errors.id_ramo ? 'is-invalid' : ''}`}
                        />
                        {errors.id_ramo && <div className='invalid-feedback'>{errors.id_ramo}</div>}
                    </div>

                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre_ramo}
                            onChange={handleNombreRamoChange}
                            type='text'
                            className={`form-control ${errors.nombre_ramo ? 'is-invalid' : ''}`}
                        />
                        {errors.nombre_ramo && <div className='invalid-feedback'>{errors.nombre_ramo}</div>}
                    </div>



                </div>
                    <div className='row'>

                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>ID Carrera</label>
                        <select
                            value={id_carrera}
                            onChange={handleIdCarreraChange}
                            className={`form-control ${errors.id_carrera ? 'is-invalid' : ''}`}
                        >
                            <option value=''>Seleccione una Carrera</option>
                            {carreras.map((carrera) => (
                                <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                    {carrera.id_carrera} - {carrera.nombre_carrera}
                                </option>
                            ))}
                        </select>
                        {errors.id_facultad && <div className='invalid-feedback'>{errors.id_facultad}</div>}
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

                    <div className='mb-3'>
                    <label className='form-label'>Horas Ayudantia</label>
                        <select
                            value={horas_ayudantia_ramo}
                            onChange={handleHorasAyudantiaRamoChange}
                            className={`form-control ${errors.horas_ayudantia_ramo ? 'is-invalid' : ''}`}
                        >
                            <option value=''>Seleccione las horas de ayudantia</option>
                            <option value='0'>0</option>
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
                        {errors.horas_ayudantia_ramo && (
                            <div className='invalid-feedback'>{errors.horas_ayudantia_ramo}</div>
                        )}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Imparte Ayudantia?</label>
                        <select
                            value={ayudantia_ramo}
                            onChange={handleAyudantiaRamoChange}
                            type='text'
                            className={`form-control ${errors.ayudantia_ramo ? 'is-invalid' : ''}`}
                        >
                            <option value=''>Seleccione una opción</option>
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>

                        </select>
                        {errors.ayudantia_ramo && (
                            <div className='invalid-feedback'>{errors.ayudantia_ramo}</div>
                        )}
                    </div>

                    <button type='submit' className='btn btn-primary btn-lg mb-1 mr-1'>
                        Guardar Cambios
                    </button>
                    <Link to="/admin/ramo" className='btn btn-secondary btn-lg mb-1 mr-1'>
                        Volver atrás
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CompCreateRamo;
