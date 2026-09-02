# Proyecto Backend 1

API REST desarrollada con Node.js y Express para gestionar servicios y reservas de un sistema de turnos.

## Tecnologías

- Node.js
- Express
- JavaScript ESM
- dotenv
- JSON
- FileSystem

## Instalación

Para instalar las dependencias:

npm install

## Variables de entorno

Crear un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=8080
NODE_ENV=development

El archivo .env no se sube al repositorio.

El archivo .env.example sirve como referencia para configurar estas variables.

## Ejecución

Iniciar el servidor con:

npm start

El servidor estará disponible en:

http://localhost:8080

## Arquitectura

La API está organizada en tres capas principales:

- Routes: define los endpoints y los conecta con los controllers.
- Controllers: reciben las solicitudes HTTP, utilizan los parámetros, query y body, llaman a los managers y generan las respuestas.
- Managers: contienen la lógica de negocio y gestionan la persistencia de los datos en archivos JSON.

Flujo de la aplicación:

Cliente → Router → Controller → Manager → JSON

## Estructura

src/

- app.js
- server.js
- config/env.config.js
- controllers/services.controller.js
- controllers/bookings.controller.js
- managers/ServiceManager.js
- managers/BookingManager.js
- routes/services.router.js
- routes/bookings.router.js
- data/services.json
- data/bookings.json

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

## Endpoints de servicios

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

## Recurso bookings

Las reservas tienen los siguientes datos:

- id
- clientName
- clientEmail
- date
- time
- status
- services

## Endpoints de reservas

POST /api/bookings

Crea una nueva reserva.

GET /api/bookings/:bid

Obtiene una reserva por su id.

POST /api/bookings/:bid/services/:sid

Agrega un servicio a una reserva.

Si el servicio ya existe en la reserva, se incrementa su quantity.

Ejemplo:

{
"service": 1,
"quantity": 1
}

## ServiceManager

La clase ServiceManager contiene la lógica para gestionar los servicios.

Métodos principales:

- getServices()
- getServiceById(id)
- addService(serviceData)
- updateService(id, updatedData)
- deleteService(id)

## BookingManager

La clase BookingManager contiene la lógica para gestionar las reservas.

Métodos principales:

- createBooking(bookingData)
- getBookingById(id)
- addServiceToBooking(bookingId, serviceId)

## Códigos de respuesta

200 - Operación realizada correctamente.

201 - Recurso creado correctamente.

400 - Datos incompletos o incorrectos.

404 - Recurso no encontrado.

500 - Error interno del servidor.

## Pruebas

Los endpoints fueron probados utilizando Postman.

Se probaron:

- Crear un servicio.
- Obtener un servicio.
- Actualizar un servicio.
- Eliminar un servicio.
- Crear una reserva.
- Obtener una reserva.
- Agregar un servicio a una reserva.
- Incrementar quantity al agregar nuevamente el mismo servicio.
- Buscar un servicio inexistente.
- Buscar una reserva inexistente.

## Nota

El archivo .env se utiliza únicamente de forma local y está incluido en .gitignore.

El archivo .env.example se incluye como referencia para configurar las variables de entorno.