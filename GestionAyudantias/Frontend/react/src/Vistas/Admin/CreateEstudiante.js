import axios from '../../Momentaneo/Axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/estudiante/';

const CompCreateEstudiante = () => {
    const { showNotification } = useNotification();
    const [rut_estudiante, setRut_estudiante] = useState('');
    const [id_carrera, setId_carrera] = useState('');
    const [id_periodo, setId_periodo] = useState('');
    const [nombres_estudiante, setNombres_estudiante] = useState('');
    const [apellido1_estudiante, setApellido1_estudiante] = useState('');
    const [apellido2_estudiante, setApellido2_estudiante] = useState('');
    const [correo_institucional_estudiante, setCorreo_institucional_estudiante] = useState('');
    const [contraseña_estudiante, setContraseña_estudiante] = useState('');
    const [ppa_estudiante, setPpa_estudiante] = useState('');
    const [año_ingreso_estudiante, setAño_ingreso_estudiante] = useState('');
    const [horas_ayudantia_estudiante, setHoras_ayudantia_estudiante] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [carreras, setCarreras] = useState([]);
    const [periodos, setPeriodos] = useState([]);



    const handleRutEstudianteChange = (e) => {
        setRut_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, rut_estudiante: '' }));
    };

    const handleIdCarreraChange = (e) => {
        setId_carrera(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_carrera: '' }));
    };

    const handleIdPeriodoChange = (e) => {
        setId_periodo(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_periodo: '' }));
    };

    const handleNombresEstudianteChange = (e) => {
        setNombres_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, nombres_estudiante: '' }));
    };

    const handleApellido1EstudianteChange = (e) => {
        setApellido1_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, apellido1_estudiante: '' }));
    };

    const handleApellido2EstudianteChange = (e) => {
        setApellido2_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, apellido2_estudiante: '' }));
    };

    const handleCorreoInstitucionalEstudianteChange = (e) => {
        setCorreo_institucional_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, correo_institucional_estudiante: '' }));
    };

    const handleContraseñaEstudianteChange = (e) => {
        setContraseña_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, contraseña_estudiante: '' }));
    };

    const handlePpaEstudianteChange = (e) => {
        setPpa_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, ppa_estudiante: '' }));
    };

    const handleAñoIngresoEstudianteChange = (e) => {
        setAño_ingreso_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, año_ingreso_estudiante: '' }));
    };

    const handleHorasAyudantiaEstudianteChange = (e) => {
        setHoras_ayudantia_estudiante(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, horas_ayudantia_estudiante: '' }));
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
        if (!rut_estudiante) {
            newErrors.rut_estudiante = 'El campo Rut es obligatorio';
        } else if (rut_estudiante.length < 7 || rut_estudiante.length > 10) {
            newErrors.rut_estudiante = 'El campo Rut debe tener entre 7 y 10 dígitos';
        }
        if (!nombres_estudiante) {
            newErrors.nombres_estudiante = 'El campo Nombres es obligatorio';
        }
        if (!apellido1_estudiante) {
            newErrors.apellido1_estudiante = 'El campo Apellido Paterno es obligatorio';
        }
        if (!apellido2_estudiante) {
            newErrors.apellido2_estudiante = 'El campo Apellido Materno es obligatorio';
        }
        if (!correo_institucional_estudiante) {
            newErrors.correo_institucional_estudiante = 'El campo Correo Institucional es obligatorio';
        } else if (!/@/.test(correo_institucional_estudiante)) {
            newErrors.correo_institucional_estudiante = 'El campo Correo debe contener el carácter "@"';
        }
        if (!contraseña_estudiante) {
            newErrors.contraseña_estudiante = 'El campo Contraseña es obligatorio';
        } else if (contraseña_estudiante.length < 5){
            newErrors.contraseña_estudiante = 'Elija una contraseña con al menos 5 caracteres';
        }
        if (!ppa_estudiante) {
            newErrors.ppa_estudiante = 'El campo PPA es obligatorio';
        } else {
            const enteredPPA = parseFloat(ppa_estudiante);
    
            if (isNaN(enteredPPA) || enteredPPA < 10 || enteredPPA > 70) {
                newErrors.ppa_estudiante = 'Ingrese un número válido entre 10 y 70 para el PPA';
            }
        }
            if (!año_ingreso_estudiante) {
            newErrors.año_ingreso_estudiante = 'El campo Año de Ingreso es obligatorio';
        } else {
            const currentYear = new Date().getFullYear();
            const enteredYear = parseInt(año_ingreso_estudiante, 10);
    
            if (isNaN(enteredYear) || enteredYear > currentYear) {
                newErrors.año_ingreso_estudiante = 'Ingrese un año válido que no sea superior al año actual';
            }
        }
            if (!id_periodo) {
            newErrors.id_periodo = 'El campo id periodo es obligatorio';
        }
        if (!id_carrera) {
            newErrors.id_carrera = 'El campo id carrera es obligatorio';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Detener el envío del formulario si hay errores
        }

        // Enviar el formulario si no hay errores
        await axios.post(URI, {
            rut_estudiante,
            id_carrera,
            id_rol: 1,
            id_periodo,
            nombres_estudiante,
            apellido1_estudiante,
            apellido2_estudiante,
            correo_institucional_estudiante,
            contraseña_estudiante,
            ppa_estudiante,
            año_ingreso_estudiante,
            horas_ayudantia_estudiante,
        });

        showNotification(`Estudiante "${nombres_estudiante} ${apellido1_estudiante}" creado exitosamente`, 'success', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });


        navigate('/admin/estudiante');
    };

    return (

        <div className='form-container'>
            <div className='form'>
                <h2>Crear un nuevo estudiante</h2>
                <form onSubmit={store}>

                    <div className='row'>

                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Rut</label>
                            <input
                                value={rut_estudiante}
                                onChange={handleRutEstudianteChange}
                                type='text'
                                className={`form-control ${errors.rut_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.rut_estudiante && <div className='invalid-feedback'>{errors.rut_estudiante}</div>}
                        </div>

                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Nombres</label>
                            <input
                                value={nombres_estudiante}
                                onChange={handleNombresEstudianteChange}
                                type='text'
                                className={`form-control ${errors.nombres_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.nombres_estudiante && <div className='invalid-feedback'>{errors.nombres_estudiante}</div>}
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Año Ingreso</label>
                            <input
                                value={año_ingreso_estudiante}
                                onChange={handleAñoIngresoEstudianteChange}
                                type='text'
                                className={`form-control ${errors.año_ingreso_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.año_ingreso_estudiante && <div className='invalid-feedback'>{errors.año_ingreso_estudiante}</div>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Apellido Paterno</label>
                            <input
                                value={apellido1_estudiante}
                                onChange={handleApellido1EstudianteChange}
                                type='text'
                                className={`form-control ${errors.apellido1_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.apellido1_estudiante && <div className='invalid-feedback'>{errors.apellido1_estudiante}</div>}
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Apellido Materno</label>
                            <input
                                value={apellido2_estudiante}
                                onChange={handleApellido2EstudianteChange}
                                type='text'
                                className={`form-control ${errors.apellido2_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.apellido2_estudiante && <div className='invalid-feedback'>{errors.apellido2_estudiante}</div>}
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>PPA</label>
                            <input
                                value={ppa_estudiante}
                                onChange={handlePpaEstudianteChange}
                                type='text'
                                className={`form-control ${errors.ppa_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.ppa_estudiante && <div className='invalid-feedback'>{errors.ppa_estudiante}</div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 mb-3'>
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

                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>ID Rol</label>
                            <input
                                value="1 - Estudiante" // Valor fijo con mensaje
                                readOnly // Hacer el campo de solo lectura
                                type='text'
                                className='form-control'
                            />
                        </div>


                        <div className='col-md-4 mb-3'>
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
                            <label className='form-label'>Correo Institucional</label>
                            <input
                                value={correo_institucional_estudiante}
                                onChange={handleCorreoInstitucionalEstudianteChange}
                                type='text'
                                className={`form-control ${errors.correo_institucional_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.correo_institucional_estudiante && <div className='invalid-feedback'>{errors.correo_institucional_estudiante}</div>}
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Contraseña</label>
                            <input
                                value={contraseña_estudiante}
                                onChange={handleContraseñaEstudianteChange}
                                type='text'
                                className={`form-control ${errors.contraseña_estudiante ? 'is-invalid' : ''}`}
                            />
                            {errors.contraseña_estudiante && <div className='invalid-feedback'>{errors.contraseña_estudiante}</div>}
                        </div>

                        <div className='col-md-4 mb-3'>
                            <label className='form-label'>Horas Ayudantia Totales</label>
                            <select
                                value={horas_ayudantia_estudiante}
                                onChange={handleHorasAyudantiaEstudianteChange}
                                type='text'
                                className={`form-control ${errors.horas_ayudantia_estudiante ? 'is-invalid' : ''}`}
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
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='16'>16</option>
                                <option value='17'>17</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
                                <option value='21'>21</option>
                                <option value='22'>22</option>
                                <option value='23'>23</option>
                                <option value='24'>24</option>
                                <option value='25'>25</option>
                                <option value='26'>26</option>
                                <option value='27'>27</option>
                                <option value='28'>28</option>
                                <option value='29'>29</option>
                                <option value='30'>30</option>


                            </select>
                            {errors.horas_ayudantia_estudiante && <div className='invalid-feedback'>{errors.horas_ayudantia_estudiante}</div>}
                        </div>

                    </div>

                    <button type='submit' className='btn btn-primary btn-lg mb-1 mr-1' >Guardar Cambios</button>
                    <Link to="/admin/estudiante" className='btn btn-secondary btn-lg mb-1 mr-1'>Volver atrás    </Link>
                </form>
            </div >
        </div >

    )
}

export default CompCreateEstudiante