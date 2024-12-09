import axios from '../../Momentaneo/Axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/facultad/';

const CompEditFacultad = () => {
    const { showNotification } = useNotification();
    const [id_facultad, setId_facultad] = useState('');
    const [nombre_facultad, setNombre_facultad] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getFacultadById();
    }, []);

    const getFacultadById = async () => {
        try {
            const res = await axios.get(URI + id);
            setId_facultad(res.data.id_facultad);
            setNombre_facultad(res.data.nombre_facultad);
        } catch (error) {
            console.error('Error al obtener datos de la facultad:', error);
        }
    };

    const handleIdFacultadChange = (e) => {
        setId_facultad(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_facultad: '' }));
    };

    const handleNombreFacultadChange = (e) => {
        setNombre_facultad(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, nombre_facultad: '' }));
    };

    const update = async (e) => {
        e.preventDefault();

        // Validar campos
        const newErrors = {};
        if (!id_facultad) {
            newErrors.id_facultad = 'El campo Id es obligatorio';
        }
        if (!nombre_facultad) {
            newErrors.nombre_facultad = 'El campo Nombre es obligatorio';
        }
        setErrors(newErrors);

        // Si no hay errores, realizar la actualización
        if (Object.keys(newErrors).length === 0) {
            try {
                await axios.put(URI + id, {
                    id_facultad,
                    nombre_facultad,
                });

                showNotification(`"${nombre_facultad}" editada exitosamente`, 'info', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                });
        

                navigate('/admin/facultad');
            } catch (error) {
                console.error('Error al actualizar facultad:', error);
            }
        }
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>Edita la facultad</h2>
                <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Id</label>
                        <input
                            value={id_facultad}
                            onChange={handleIdFacultadChange}
                            type='text'
                            className={`form-control ${errors.id_facultad ? 'is-invalid' : ''}`}
                        />
                        {errors.id_facultad && <div className='invalid-feedback'>{errors.id_facultad}</div>}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre_facultad}
                            onChange={handleNombreFacultadChange}
                            type='text'
                            className={`form-control ${errors.nombre_facultad ? 'is-invalid' : ''}`}
                        />
                        {errors.nombre_facultad && (
                            <div className='invalid-feedback'>{errors.nombre_facultad}</div>
                        )}
                    </div>

                    <button type='submit' className='btn btn-primary mb-1 mr-1'>
                        Guardar Cambios
                    </button>
                    <Link to='/admin/facultad' className='btn btn-secondary mb-1 mr-1'>
                        Volver atrás
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CompEditFacultad;
