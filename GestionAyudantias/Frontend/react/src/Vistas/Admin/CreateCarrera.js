import axios from '../../Momentaneo/Axios';
import {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/carrera/';

const CompCreateCarrera = () => {
    const { showNotification } = useNotification();
    const [id_carrera, setId_carrera] = useState('');
    const [id_facultad, setId_facultad] = useState('');
    const [nombre_carrera, setNombre_carrera] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [facultades, setFacultades] = useState([]);

    const handleIdCarreraChange = (e) => {
        setId_carrera(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_carrera: '' }));
    };

    const handleIdFacultadChange = (e) => {
        setId_facultad(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_facultad: '' }));
    };

    const handleNombreCarreraChange = (e) => {
        setNombre_carrera(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, nombre_carrera: '' }));
    };

    useEffect(() => {
        getFacultades();
      }, []);
    
      const getFacultades = async () => {
        const res = await axios.get('http://localhost:8000/admin/facultad/');
        setFacultades(res.data);
      };


    const store = async (e) => {
        e.preventDefault();

        // Validar campos
        const newErrors = {};
        if (!id_carrera) {
            newErrors.id_carrera = 'El campo Id es obligatorio';
        }
        if (!id_facultad) {
            newErrors.id_facultad = 'El campo ID Facultad es obligatorio';
        }
        if (!nombre_carrera) {
            newErrors.nombre_carrera = 'El campo Nombre es obligatorio';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Detener el envío del formulario si hay errores
        }

        // Enviar el formulario si no hay errores
        await axios.post(URI, {
            id_carrera,
            id_facultad,
            nombre_carrera,
        });

        showNotification(`Carrera "${nombre_carrera}" creada exitosamente`, 'success', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });
      

        navigate('/admin/carrera');
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>Crear una nueva carrera</h2>
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Id</label>
                        <input
                            value={id_carrera}
                            onChange={handleIdCarreraChange}
                            type='text'
                            className={`form-control ${errors.id_carrera ? 'is-invalid' : ''}`}
                        />
                        {errors.id_carrera && <div className='invalid-feedback'>{errors.id_carrera}</div>}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>ID Facultad</label>
                        <select
                            value={id_facultad}
                            onChange={handleIdFacultadChange}
                            className={`form-control ${errors.id_facultad ? 'is-invalid' : ''}`}
                        >
                            <option value=''>Seleccione una facultad</option>
                            {facultades.map((facultad) => (
                                <option key={facultad.id_facultad} value={facultad.id_facultad}>
                                    {facultad.id_facultad} - {facultad.nombre_facultad}
                                </option>
                            ))}
                        </select>
                        {errors.id_facultad && <div className='invalid-feedback'>{errors.id_facultad}</div>}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre_carrera}
                            onChange={handleNombreCarreraChange}
                            type='text'
                            className={`form-control ${errors.nombre_carrera ? 'is-invalid' : ''}`}
                        />
                        {errors.nombre_carrera && <div className='invalid-feedback'>{errors.nombre_carrera}</div>}
                    </div>
                    <button type='submit' className='btn btn-primary btn-lg mb-2 mr-3'>
                        Guardar Cambios
                    </button>
                    <Link to="/admin/carrera" className='btn btn-secondary btn-lg mb-2 mr-3'>
                        Volver atrás
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CompCreateCarrera;
