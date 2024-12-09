import axios from '../../Momentaneo/Axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/facultad/';

const CompCreateFacultad = () => {
    const { showNotification } = useNotification();
    const [id_facultad, setId_facultad] = useState('');
    const [nombre_facultad, setNombre_facultad] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleIdFacultadChange = (e) => {
        setId_facultad(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, id_facultad: '' }));
    };

    const handleNombreFacultadChange = (e) => {
        setNombre_facultad(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, nombre_facultad: '' }));
    };

    const store = async (e) => {
        e.preventDefault();

        // Validar campos
        const newErrors = {};
        if (!id_facultad) {
            newErrors.id_facultad = 'El campo ID es obligatorio';
        }
        if (!nombre_facultad) {
            newErrors.nombre_facultad = 'El campo Nombre es obligatorio';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Detener el envío del formulario si hay errores
        }

        // Enviar el formulario si no hay errores
        await axios.post(URI, {
            id_facultad,
            nombre_facultad,
        });

        showNotification(`Facultad "${nombre_facultad}" creada exitosamente`, 'success',{
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });
            navigate('/admin/facultad');
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>Crear una nueva facultad</h2>
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>ID</label>
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
                        {errors.nombre_facultad && <div className='invalid-feedback'>{errors.nombre_facultad}</div>}
                    </div>

                    <button type='submit' className='btn btn-primary btn-lg mb-1 mr-1'>
                        Guardar Cambios
                    </button>
                    <Link to="/admin/facultad" className='btn btn-secondary btn-lg mb-1 mr-1'>
                        Volver atrás
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CompCreateFacultad;
