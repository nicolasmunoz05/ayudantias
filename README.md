# Gestión de Ayudantías Universitarias

Aplicación CRUD, informativa y administrativa para la gestión y postulación para impartir ayudantías universitarias. Posee base de datos relacional que limita y posibilita interacciones segun roles, notas, carreras, semestres y facultades en base a las presentes en Universidad Católica del Maule.

## Descripción

Este proyecto permite administrar ayudantías universitarias, gestionar usuarios (administradores, encargados, estudiantes) y realizar postulaciones a ayudantías. Incluye un sistema de reportes exportables.

## Requisitos

- Node.js
- npm
- MySQL
- Python 3 (opcional, para reportes)
- Flask y dependencias (opcional, para reportes)

## Instalación y Puesta en Marcha

### 1. Iniciar el Frontend

```sh
cd Frontend/react
npm install
npm start
```

### 2. Cargar la Base de Datos

- Importa el archivo [`Backend/bdfinal.sql`](Backend/bdfinal.sql) en MySQL Workbench u otro gestor de bases de datos.
- Actualiza los datos de conexión (`nombre db`, `usuario`, `contraseña`) en [`Backend/node/database/db.js`](Backend/node/database/db.js) según tu configuración local.

### 3. Iniciar el Backend

```sh
cd Backend/node
npm install
nodemon app.js
```

### 4. (Opcional) Servidor de Reportes (Flask)

```sh
cd Backend/node/reportes
pip install -r requirements.txt
python reportes.py
```

## Estructura del Proyecto

```
Frontend/
  react/
    src/
    public/
Backend/
  node/
    app.js
    database/
      db.js
    controllers/
    models/
    routes/
  bdfinal.sql
```

## Notas

- El frontend corre por defecto en `http://localhost:3000/`.
- El backend corre por defecto en `http://localhost:8000/`.
- El servidor de reportes (opcional) corre en `http://localhost:5000/`.

## Licencia

Este proyecto es de uso académico.
