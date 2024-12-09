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

const URI = 'http://localhost:8000/admin/resultado/';

function Estd() {
    const {showNotification } = useNotification();
    const [resultados, setResultados] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const resultspPerPage = 10;
    const [filteredResultados, setFilteredResultados] = useState([]);
    const [postulacionesInfo, setPostulacionesInfo] = useState({});
    const [estudiantesInfo, setEstudiantesInfo] = useState({});
    const [ramosInfo, setRamosInfo] = useState({});
    const [periodosInfo, setPeriodosInfo] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        getResultados();
    }, []);

    const getResultados = async () => {
        const res = await axios.get(URI);
        setResultados(res.data);
    };

    const deleteResultados = async (id_resultados) => {
        const resultadoToDelete = resultados.find(resultado => resultado.id_resultados === id_resultados);
        const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar a ID Resultado ${resultadoToDelete.id_resultados}?`);
        if (confirmDelete) {
            await axios.delete(`/admin/resultado/${id_resultados}`);
            getResultados();

            showNotification(`Resultado ID "${resultadoToDelete.id_resultados}" eliminado exitosamente`, 'error', {
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
        // Realizar la solicitud para obtener la información de todos los postulaciones
        const fetchPostulacionesInfo = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/postulacion/');
                const postulacionesInfo = res.data.reduce((map, postulacion) => {
                    map[postulacion.id_postulacion] = {
                        IdR: postulacion.id_ramo,
                        RutE: postulacion.rut_estudiante,
                    };
                    return map;
                }, {});
                setPostulacionesInfo(postulacionesInfo);
            } catch (error) {
                console.error('Error al cargar información de postulaciones:', error);
            }
        };
        // Llamar a la función al montar el componente
        fetchPostulacionesInfo();
    }, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez


    useEffect(() => {
        // Realizar la solicitud para obtener la información de todos los estudiantes
        const fetchEstudiantesInfo = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/estudiante/');
                const estudiantesInfo = res.data.reduce((map, estudiante) => {
                    map[estudiante.rut_estudiante] = {
                        nombreE: estudiante.nombres_estudiante,
                        ApellidoE: estudiante.apellido1_estudiante,
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
        // Realizar la solicitud para obtener la información de todos los ramos
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
            const url = `http://localhost:5000/resultados_generar_csv?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
            });
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([blob]));
            link.download = 'reporte_resultados_admin.csv';
            link.click();

            window.URL.revokeObjectURL(link.href);


            // Resto del código para manejar la respuesta y la descarga...
        } catch (error) {
            console.error('Error al llamar a generar_csv:', error);
        }
    };

    useEffect(() => {
        const filtered = resultados.filter(resultados => {    
            return (
                ramosInfo[postulacionesInfo[resultados.id_postulacion]?.IdR]?.nombreR.toLowerCase().includes(searchTerm.toLowerCase()) ||
                estudiantesInfo[postulacionesInfo[resultados.id_postulacion]?.RutE]?.nombreE.toLowerCase().includes(searchTerm.toLowerCase()) ||
                estudiantesInfo[postulacionesInfo[resultados.id_postulacion]?.RutE]?.ApellidoE.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(resultados.id_resultados).toLowerCase().includes(searchTerm.toLowerCase()) ||
                ramosInfo[postulacionesInfo[resultados.id_postulacion]?.IdR]?.nombreR.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resultados.respuesta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(resultados.fecha_resultados).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });   
        setFilteredResultados(filtered);
        setCurrentPage(0);
    }, [searchTerm, resultados, ramosInfo, postulacionesInfo]);

      const indexOfLastResultp = (currentPage + 1) * resultspPerPage;
      const indexOfFirstResultp = indexOfLastResultp - resultspPerPage;
      const currentResultsp = filteredResultados.slice(indexOfFirstResultp, indexOfLastResultp);
    
    return (
        <div className='admin-container'>
            <div className="tabla-resultados">
                <Navbar />
                <p className="text-center" style={{ fontSize: '25px', padding: '10px' }}>
                    Bienvenido, Admin. Administre los datos.
                </p>

                <div className="container" style={{ marginBottom: '80px' }}>
                    <h1>Resultados</h1>
                    <input
                        type="text"
                        id="search"
                        className="form-control mb-1"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to={`/admin/crear_resultado`} className='btn btn-success mb-1 mr-1'>
                        Crear
                    </Link>

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
                                <th>ID Resultado</th>
                                <th>ID Periodo</th>
                                <th>Respuesta</th>
                                <th>ID Postulacion</th>
                                <th>Fecha Resultados</th>
                                <th>Gestionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResultados.map((resultado) => (
                                <tr key={resultado.id_resultados}>
                                    <td>{resultado.id_resultados}</td>
                                    <td>[{resultado.id_periodo}] {periodosInfo[resultado.id_periodo]?.añoP}/{periodosInfo[resultado.id_periodo]?.semP}</td>
                                    <td>{resultado.respuesta}</td>
                                    <td>[{resultado.id_postulacion}] {ramosInfo[postulacionesInfo[resultado.id_postulacion]?.IdR]?.nombreR} - {estudiantesInfo[postulacionesInfo[resultado.id_postulacion]?.RutE]?.nombreE} {estudiantesInfo[postulacionesInfo[resultado.id_postulacion]?.RutE]?.ApellidoE}</td>
                                    <td>{resultado.fecha_resultados}</td>
                                    <td>
                                        <Link
                                            to={`/admin/editar_resultado/${resultado.id_resultados}`}
                                            className="btn btn-primary"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => deleteResultados(resultado.id_resultados)}
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
                        pageCount={Math.ceil(resultados.length / resultspPerPage)}
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
