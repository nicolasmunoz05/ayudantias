import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Momentaneo/Axios';
import ReactPaginate from 'react-paginate';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'; // Agregado para importar los estilos del admin
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/encargado/';

const Estd = () => {
  const { showNotification } = useNotification();
  const [evaluadores, setEvaluadores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const evaluadoresPerPage = 10; // Cantidad de evaluadores por página
  const [facultadesInfo, setFacultadesInfo] = useState({});

  useEffect(() => {
    getEvaluadores();
  }, []);

  const getEvaluadores = async () => {
    const res = await axios.get(URI);
    setEvaluadores(res.data);
  };

  const deleteEvaluador = async (rut_evaluador) => {
    const encargadoToDelete = evaluadores.find(encargado => encargado.rut_evaluador === rut_evaluador);
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar a ${encargadoToDelete.nombre_evaluador} ${encargadoToDelete.apellido1_evaluador} ${encargadoToDelete.apellido2_evaluador}?`);
    if (confirmDelete) {
    await axios.delete(`${URI}${rut_evaluador}`);
    getEvaluadores();
    showNotification(`Encargado "${encargadoToDelete.nombre_evaluador} ${encargadoToDelete.apellido1_evaluador}" eliminado exitosamente`, 'error',{
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
    const fetchFacultadesInfo = async () => {
        try {
            const res = await axios.get('http://localhost:8000/admin/facultad/');
            const facultadesInfo = res.data.reduce((map, facultad) => {
                map[facultad.id_facultad] = {
                    nombreF: facultad.nombre_facultad,
                };
                return map;
            }, {});
            setFacultadesInfo(facultadesInfo);
        } catch (error) {
            console.error('Error al cargar información de facultades:', error);
        }
    };
    // Llamar a la función al montar el componente
    fetchFacultadesInfo();
  }, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez
  
  // Calcular el índice de inicio y fin de la página actual
  const indexOfLastEvaluador = (currentPage + 1) * evaluadoresPerPage;
  const indexOfFirstEvaluador = indexOfLastEvaluador - evaluadoresPerPage;
  const currentEvaluadores = evaluadores.slice(indexOfFirstEvaluador, indexOfLastEvaluador);

  return (
    <div className="admin-container">
      <Navbar />
      <p className="text-center" style={{ fontSize: '25px', padding: '10px' }}>
        Bienvenido, Admin. Administre los datos.
      </p>

      <div className="container" style={{ marginBottom: '80px' }}>
        <h1>Encargados</h1>
        <Link to="/admin/crear_encargado" className="btn btn-success">
          Crear
        </Link>
        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th>Rut</th>
              <th>ID Facultad</th>
              <th>ID Rol</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentEvaluadores.map((evaluador) => (
              <tr key={evaluador.rut_evaluador}>
                <td>{evaluador.rut_evaluador}</td>
                <td>[{evaluador.id_facultad}] {facultadesInfo[evaluador.id_facultad]?.nombreF}</td>
                <td>{evaluador.id_rol}</td>
                <td>{evaluador.nombre_evaluador}</td>
                <td>{evaluador.apellido1_evaluador}</td>
                <td>{evaluador.apellido2_evaluador}</td>
                <td>{evaluador.contraseña_evaluador}</td>
                <td>
                  <Link to={`/admin/editar_encargado/${evaluador.rut_evaluador}`} className="btn btn-primary btn-sm me-2">
                    Editar
                  </Link>
                  <button onClick={() => deleteEvaluador(evaluador.rut_evaluador)} className="btn btn-danger btn-sm">
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
          pageCount={Math.ceil(evaluadores.length / evaluadoresPerPage)}
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
  );
};

export default Estd;
