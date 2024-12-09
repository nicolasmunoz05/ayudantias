import axios from '../../Momentaneo/Axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/carrera/';

const CompEditCarrera = () => {
    const { showNotification } = useNotification();
    const [id_carrera, setId_carrera] = useState('');
    const [id_facultad, setId_facultad] = useState('');
    const [nombre_carrera, setNombre_carrera] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [facultades, setFacultades] = useState([]);

    useEffect(() => {
        getCarreraById();
    }, []);

    const getCarreraById = async () => {
        try {
            const res = await axios.get(URI + id);
            setId_carrera(res.data.id_carrera);
            setId_facultad(res.data.id_facultad);
            setNombre_carrera(res.data.nombre_carrera);
        } catch (error) {
            console.error('Error al obtener datos de la carrera:', error);
        }
    };

    useEffect(() => {
        getFacultades();
      }, []);
    
      const getFacultades = async () => {
        const res = await axios.get('http://localhost:8000/admin/facultad/');
        setFacultades(res.data);
      };
    
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

    const update = async (e) => {
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
        try {
            await axios.put(URI + id, {
                id_carrera,
                id_facultad,
                nombre_carrera,
            });
            showNotification(`Carrera  "${nombre_carrera}" editada exitosamente`, 'info',{
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
            });


            navigate('/admin/carrera');
        } catch (error) {
            console.error('Error al actualizar la carrera:', error);
        }
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>Edita la carrera</h2>
                <form onSubmit={update}>
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
                        {errors.nombre_carrera && (
                            <div className='invalid-feedback'>{errors.nombre_carrera}</div>
                        )}
                    </div>

                    <button type='submit' className='btn btn-primary mb-1 mr-1'>
                        Guardar Cambios
                    </button>
                    <Link to='/admin/carrera' className='btn btn-secondary mb-1 mr-1'>
                        Volver atrás
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CompEditCarrera;
