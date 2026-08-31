# Proyecto Backend 1

API REST desarrollada con Node.js y Express para gestionar servicios de un sistema de turnos y reservas.

## Tecnologías
- Node.js
- Express
- JavaScript ESM
- dotenv
- JSON
- Instalación

Para instalar las dependencias:

npm install

## Variables de entorno

Crear un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=8080
NODE_ENV=development

El archivo .env no se sube al repositorio.

El archivo .env.example sirve como referencia para configurar estas variables.

Ejecución

Iniciar el servidor con:

npm start

El servidor estará disponible en:

http://localhost:8080

Estructura

src/

- app.js
- config/env.config.js
- managers/ServiceManager.js
- routes/services.router.js
- data/services.json

Otros archivos:

- .env.example
- .gitignore
- package.json
- package-lock.json
- README.md

## Recurso services

Los servicios tienen los siguientes datos:

- id
- name
- description
- duration
- price
- category
- available

El id se genera automáticamente al crear un servicio.

## Endpoints

GET /api/services

Obtiene todos los servicios.

GET /api/services?category=salud

Filtra los servicios por categoría.

GET /api/services?available=true

Filtra los servicios por disponibilidad.

GET /api/services/:sid

Obtiene un servicio por su id.

POST /api/services

Crea un nuevo servicio.

Ejemplo:

{
"name": "Consulta general",
"description": "Consulta con profesional",
"duration": 30,
"price": 500,
"category": "salud",
"available": true
}

El id no se envía en el body porque se genera automáticamente.

PUT /api/services/:sid

Actualiza un servicio existente.

Ejemplo:

{
"price": 600,
"available": false
}

El id no puede modificarse.

DELETE /api/services/:sid

Elimina un servicio existente.

## ServiceManager

La clase ServiceManager contiene la lógica para gestionar los servicios.

Métodos principales:

- getServices()
- getServiceById(id)
- addService(serviceData)
- updateService(id, updatedData)
- deleteService(id)

Las rutas de Express utilizan ServiceManager para realizar las operaciones.

## Códigos de respuesta

200 - Operación realizada correctamente.
201 - Servicio creado correctamente.
400 - Datos incompletos.
404 - Servicio no encontrado.
Pruebas

Los endpoints fueron probados utilizando Postman.

Se probaron:

- Crear un servicio.
- Obtener todos los servicios.
- Buscar un servicio por id.
- Filtrar por categoría.
- Filtrar por disponibilidad.
- Actualizar un servicio.
- Eliminar un servicio.
- Buscar un servicio inexistente.
- Crear un servicio con datos incompletos.

## Nota

El archivo .env se utiliza únicamente de forma local y está incluido en .gitignore.

El archivo .env.example se incluye como referencia para configurar las variables de entorno.