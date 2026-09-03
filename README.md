# Proyecto Backend 1

API REST desarrollada con Node.js y Express para gestionar servicios y reservas de un sistema de turnos.

## Tecnologías

* Node.js
* Express
* JavaScript ESM
* dotenv
* JSON
* FileSystem

## Instalación

Para instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env` no se sube al repositorio.

El archivo `.env.example` sirve como referencia para configurar estas variables.

## Ejecución

Iniciar el servidor con:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:8080
```

## Arquitectura

La API está organizada utilizando una arquitectura en capas con Routes, Controllers, Services, Repositories y DAO.

* Routes: define los endpoints y los conecta con los controllers.
* Controllers: reciben las solicitudes HTTP, leen parámetros, query y body, llaman a los services y generan las respuestas.
* Services: contienen la lógica de negocio y las validaciones.
* Repositories: actúan como intermediarios entre los services y los DAO.
* DAO: se encarga directamente de la lectura y escritura de los archivos JSON.

Flujo de la aplicación:

```text
Cliente → Router → Controller → Service → Repository → DAO → JSON
```

La lógica de negocio se mantiene en la capa de Services, mientras que el acceso directo a los archivos JSON se concentra en la capa DAO.

## Estructura

```text
src/

- app.js
- server.js
- config/env.config.js

- controllers/
  - services.controller.js
  - bookings.controller.js

- services/
  - services.service.js
  - bookings.service.js

- repositories/
  - services.repository.js
  - bookings.repository.js

- dao/
  - services.dao.js
  - bookings.dao.js

- routes/
  - services.router.js
  - bookings.router.js

- data/
  - services.json
  - bookings.json
```

Otros archivos:

* `.env.example`
* `.gitignore`
* `package.json`
* `package-lock.json`
* `README.md`

## Recurso services

Los servicios tienen los siguientes datos:

* id
* name
* description
* duration
* price
* category
* available

El id se genera automáticamente al crear un servicio.

La lógica de servicios se encuentra en `services.service.js`, mientras que el acceso a los datos se realiza mediante `services.repository.js` y `services.dao.js`.

## Endpoints de servicios

### GET /api/services

Obtiene todos los servicios.

### GET /api/services?category=salud

Filtra los servicios por categoría.

### GET /api/services?available=true

Filtra los servicios por disponibilidad.

### GET /api/services/:sid

Obtiene un servicio por su id.

### POST /api/services

Crea un nuevo servicio.

Ejemplo:

```json
{
  "name": "Consulta general",
  "description": "Consulta con profesional",
  "duration": 30,
  "price": 500,
  "category": "salud",
  "available": true
}
```

El id no se envía en el body porque se genera automáticamente.

### PUT /api/services/:sid

Actualiza un servicio existente.

Ejemplo:

```json
{
  "price": 600,
  "available": false
}
```

El id no puede modificarse.

### DELETE /api/services/:sid

Elimina un servicio existente.

## Recurso bookings

Las reservas tienen los siguientes datos:

* id
* clientName
* clientEmail
* date
* time
* status
* services

## Endpoints de reservas

### POST /api/bookings

Crea una nueva reserva.

### GET /api/bookings/:bid

Obtiene una reserva por su id.

### POST /api/bookings/:bid/services/:sid

Agrega un servicio a una reserva.

Si el servicio ya existe en la reserva, se incrementa su `quantity`.

Ejemplo:

```json
{
  "service": 1,
  "quantity": 1
}
```

La regla de incremento de `quantity` se encuentra en `bookings.service.js`.

## Capas de servicios

### ServicesService

Contiene la lógica de negocio relacionada con los servicios.

Métodos principales:

* `getServices()`
* `getServiceById(id)`
* `createService(serviceData)`
* `updateService(id, updatedData)`
* `deleteService(id)`

### BookingsService

Contiene la lógica de negocio relacionada con las reservas.

Métodos principales:

* `createBooking(bookingData)`
* `getBookingById(id)`
* `addServiceToBooking(bookingId, serviceId)`

La lógica de `addServiceToBooking()` verifica que exista la reserva, verifica que exista el servicio y aumenta `quantity` cuando el mismo servicio vuelve a agregarse.

## Repositories

Los repositories funcionan como intermediarios entre los services y los DAO.

### ServicesRepository

Métodos:

* `getAll()`
* `getById(id)`
* `create(service)`
* `update(id, service)`
* `delete(id)`

### BookingsRepository

Métodos:

* `create(booking)`
* `getById(id)`
* `update(id, booking)`

Los repositories no contienen reglas de negocio ni acceden directamente a `req` o `res`.

## DAO

Los DAO son responsables del acceso directo a los archivos JSON.

### ServicesDAO

Métodos:

* `getAll()`
* `getById(id)`
* `create(service)`
* `update(id, service)`
* `delete(id)`

### BookingsDAO

Métodos:

* `create(booking)`
* `getById(id)`
* `update(id, booking)`

El DAO de reservas genera el identificador al persistir una nueva reserva.

## Códigos de respuesta

* 200 - Operación realizada correctamente.
* 201 - Recurso creado correctamente.
* 400 - Datos incompletos o incorrectos.
* 404 - Recurso no encontrado.
* 500 - Error interno del servidor.

## Pruebas

Los endpoints fueron probados utilizando Postman.

Se probaron:

* Crear un servicio.
* Obtener todos los servicios.
* Obtener un servicio por id.
* Filtrar servicios por categoría.
* Filtrar servicios por disponibilidad.
* Crear una reserva.
* Obtener una reserva por id.
* Agregar un servicio a una reserva.
* Incrementar `quantity` al agregar nuevamente el mismo servicio.
* Intentar agregar un servicio inexistente.

Las pruebas confirmaron el funcionamiento de las capas Router, Controller, Service, Repository y DAO.

## Nota

Los archivos `services.json` y `bookings.json` se utilizan como almacenamiento durante esta etapa del proyecto.

El archivo `.env` se utiliza únicamente de forma local y está incluido en `.gitignore`.

El archivo `.env.example` se incluye como referencia para configurar las variables de entorno.
