import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from '../../Momentaneo/Axios';
import { Link } from 'react-router-dom';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNotification } from './NotificationContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const URI = 'http://localhost:8000/admin/postulacion/';

function Estd() {
    const { showNotification } = useNotification();
    const [postulaciones, setPostulaciones] = useState([]);
    const [filteredPostulaciones, setFilteredPostulaciones] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postulacionesPerPage = 10;
    const [ramosInfo, setRamosInfo] = useState({});
    const [periodosInfo, setPeriodosInfo] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getPostulaciones();
    }, []);

    const getPostulaciones = async () => {
        const res = await axios.get(URI);
        setPostulaciones(res.data);
    };

    const deletepostulacion = async (id_postulacion) => {
        const postulacionToDelete = postulaciones.find(postulacion => postulacion.id_postulacion === id_postulacion);
        const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar ID Postulación ${postulacionToDelete.id_postulacion}?`);

        if (confirmDelete) {
            await axios.delete(`/admin/postulacion/${id_postulacion}`);
            getPostulaciones();

            showNotification(`Postulacion ID "${postulacionToDelete.id_postulacion}" eliminada exitosamente`, 'error', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

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

    useEffect(() => {
        // Realizar la solicitud para obtener la información de todos los periodos
        const fetchPeriodosInfo = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/periodo/');
                const periodosInfo = res.data.reduce((map, periodo) => {
                    map[periodo.id_periodo] = {
                        añoP: periodo.año_periodo,
                        semP: periodo.semestre_periodo,
                    };
                    return map;
                }, {});
                setPeriodosInfo(periodosInfo);
            } catch (error) {
                console.error('Error al cargar información de periodos:', error);
            }
        };
        // Llamar a la función al montar el componente
        fetchPeriodosInfo();
    }, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez

    /////////////////REPORTE//////////////////////////////////////////////////////////////////////////////////////
    const handleClick = async () => {
        try {
            // Validación: asegúrate de que ambas fechas estén seleccionadas
            if (!startDate || !endDate) {
                console.error('Por favor, selecciona un intervalo de fechas.');
                return;
            }

            // Formatea las fechas en el formato deseado (puedes ajustar el formato según sea necesario)
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];

            // Construye la URL con el intervalo de fechas
            const url = `http://localhost:5000/postulaciones_generar_csv?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
            });
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([blob]));
            link.download = 'reporte_postulaciones_admin.csv';
            link.click();

            window.URL.revokeObjectURL(link.href);


            // Resto del código para manejar la respuesta y la descarga...
        } catch (error) {
            console.error('Error al llamar a generar_csv:', error);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        //console.log("Search Term:", searchTerm);
        const filtered = postulaciones.filter(postulacion => {
                const year = periodosInfo[postulacion.id_periodo]?.añoP || '';
            const semester = periodosInfo[postulacion.id_periodo]?.semP || '';
    
            return (
                String(postulacion.id_postulacion).toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(postulacion.rut_estudiante).toLowerCase().includes(searchTerm.toLowerCase()) ||
                ramosInfo[postulacion.id_ramo]?.nombreR.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(year).toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(semester).toLowerCase().includes(searchTerm.toLowerCase()) ||
                postulacion.estado_postulacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                postulacion.horas_solicitud_ayudantia.toString().includes(searchTerm.toLowerCase()) ||
                String(postulacion.fecha_postulacion).toLowerCase().includes(searchTerm.toLowerCase())
                // Agrega más condiciones de filtrado según las columnas que desees
            );
        });
    
        //console.log("Filtered Data:", filtered);
        setFilteredPostulaciones(filtered);
        setCurrentPage(0);
    }, [searchTerm, postulaciones, ramosInfo, periodosInfo]);
            
    const indexOfLastPostulaciones = (currentPage + 1) * postulacionesPerPage;
    const indexOfFirstPostulaciones = indexOfLastPostulaciones - postulacionesPerPage;
    const currentPostulaciones = postulaciones.slice(indexOfFirstPostulaciones, indexOfLastPostulaciones);

    return (
        <div className='admin-container'>
            <div className="tabla-postulaciones">
                <Navbar />
                <p className="text-center" style={{ fontSize: '25px', padding: '10px' }}>
                    Bienvenido, Admin. Administre los datos.
                </p>

                <div className="container" style={{ marginBottom: '80px' }}>
                    <h1>Postulaciones</h1>
                    <Link to={`/admin/crear_postulacion`} className='btn btn-success mb-1 mr-1'>
                        Crear
                    </Link>
                    <input
                        type="text"
                        id="search"
                        className="form-control mb-1"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Fecha de inicio"
                        className="form-control"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Fecha de fin"
                        className="form-control ml-1"
                        style={{ position: 'absolute', left: '0', top: '100%' }}
                    />
                    <button className='btn btn-secondary mb-1 mr-1 ml-3' onClick={handleClick}>
                        Generar Reporte
                    </button>
                    <table className='table table-striped'>
                        <thead className='table-primary'>
                            <tr>
                                <th>ID Postulacion</th>
                                <th>Rut Estudiante</th>
                                <th>ID Ramo</th>
                                <th>ID Periodo</th>
                                <th>Estado</th>
                                <th>Horas</th>
                                <th>Fecha</th>
                                <th>Gestionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPostulaciones.map((postulacion) => (
                                <tr key={postulacion.id_postulacion}>
                                    <td>{postulacion.id_postulacion}</td>
                                    <td>{postulacion.rut_estudiante}</td>
                                    <td>[{postulacion.id_ramo}] {ramosInfo[postulacion.id_ramo]?.nombreR}</td>
                                    <td>[{postulacion.id_periodo}] {periodosInfo[postulacion.id_periodo]?.añoP}/{periodosInfo[postulacion.id_periodo]?.semP}</td>
                                    <td>{postulacion.estado_postulacion}</td>
                                    <td>{postulacion.horas_solicitud_ayudantia}</td>
                                    <td>{postulacion.fecha_postulacion}</td>
                                    <td>
                                        <Link
                                            to={`/admin/editar_postulacion/${postulacion.id_postulacion}`}
                                            className="btn btn-primary"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => deletepostulacion(postulacion.id_postulacion)}
                                            className="btn btn-danger"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <ReactPaginate
                        previousLabel={'Anterior'}
                        nextLabel={'Siguiente'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(filteredPostulaciones.length / postulacionesPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
                <div style={{ marginBottom: '80px' }}></div>

                <Foooter />
            </div>
        </div>
    );
}

export default Estd;
