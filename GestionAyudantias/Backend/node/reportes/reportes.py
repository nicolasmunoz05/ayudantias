from flask import Flask, send_file, request
from io import BytesIO
import mysql.connector
import pandas as pd
from flask_cors import CORS  # Importa la extensión CORS

app = Flask(__name__)
CORS(app)

# Conexión a la base de datos MySQL
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="mydb",
    auth_plugin='mysql_native_password'
)

def generar_csv(sql_query, download_name, columns, date_column, start_date=None, end_date=None):
    try:
        # Ejecutar una consulta SQL
        cursor = connection.cursor()
        # Modificar la consulta para incluir el filtro de fechas
        if start_date and end_date:
            sql_query += f" WHERE {date_column} BETWEEN '{start_date}' AND '{end_date}'"
        cursor.execute(sql_query)
        column_names = cursor.column_names
        resultados = cursor.fetchall()

        # Convertir los resultados de la consulta SQL a un DataFrame de Pandas
        df = pd.DataFrame(resultados, columns=column_names)
        datos_report = df[columns]

        # Crear un objeto BytesIO para almacenar el archivo CSV
        csv_buffer = BytesIO()
        # Escribir el DataFrame en el objeto BytesIO en formato CSV
        datos_report.to_csv(csv_buffer, index=False, encoding='latin-1')
        # Establecer el puntero del objeto BytesIO al principio del archivo
        csv_buffer.seek(0)

        # Enviar el archivo CSV como respuesta
        return send_file(
            csv_buffer,
            mimetype='text/csv',
            download_name=download_name,
            as_attachment=True
        )
    except Exception as e:
        # Manejar cualquier error que pueda ocurrir durante el proceso
        print(f"Error al generar el archivo CSV: {str(e)}")
        return "Error al generar el archivo CSV", 500

@app.route('/resultados_generar_csv')
def generar_csv_resultados():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    return generar_csv(
        "SELECT resultados.id_resultados, resultados.id_periodo, resultados.id_postulacion, resultados.respuesta, resultados.fecha_resultados, estudiante.rut_estudiante, estudiante.nombres_estudiante, estudiante.apellido1_estudiante FROM resultados LEFT JOIN postulacion ON resultados.id_postulacion = postulacion.id_postulacion LEFT JOIN estudiante ON postulacion.rut_estudiante = estudiante.rut_estudiante",
        "reporte_resultados_admin.csv",
        ["id_resultados", "id_periodo", "id_postulacion", "respuesta", "rut_estudiante", "nombres_estudiante", "apellido1_estudiante", "fecha_resultados"],
        "fecha_resultados",
        start_date,
        end_date
    )

@app.route('/postulaciones_generar_csv')
def generar_csv_postulaciones():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    return generar_csv(
        "SELECT * FROM postulacion LEFT JOIN ramo on postulacion.id_ramo = ramo.id_ramo LEFT JOIN periodo ON periodo.id_periodo = ramo.id_periodo",
        "reporte_postulaciones_admin.csv",
        ["id_postulacion", "rut_estudiante", "nombre_ramo", "semestre_periodo", "estado_postulacion", "horas_solicitud_ayudantia", "fecha_postulacion"],
        "fecha_postulacion",
        start_date,
        end_date
    )

@app.route('/estudiantes_generar_csv')
def generar_csv_estudiantes():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    return generar_csv(
        "SELECT * FROM estudiante LEFT JOIN carrera ON estudiante.id_carrera = carrera.id_carrera",
        "reporte_estudiantes_admin.csv",
        ["rut_estudiante", "nombres_estudiante", "apellido1_estudiante", "apellido2_estudiante", "nombre_carrera", "ppa_estudiante", "horas_ayudantia_estudiante"],
        "fecha_resultados",  # Puedes cambiar esto al nombre correcto de la columna de fecha de estudiantes si es diferente
        start_date,
        end_date
    )

if __name__ == '__main__':
    app.run(debug=True)
