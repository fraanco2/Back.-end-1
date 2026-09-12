# Proyecto Backend 1

API REST desarrollada con Node.js y Express para gestionar servicios, reservas y mensajes de un sistema de turnos.

El proyecto utiliza MongoDB con Mongoose para la persistencia de datos y una arquitectura en capas.

## Tecnologías

* Node.js
* Express
* JavaScript ESM
* MongoDB
* Mongoose
* dotenv
* Zod
* Handlebars
* Socket.io
* Node.js Test Runner

## Instalación

```bash
npm install
```

Crear un archivo `.env` en la raíz:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/turnos
```

El archivo `.env` no se incluye en el repositorio.

## Ejecución

```bash
npm start
```

Servidor:

```text
http://localhost:8080
```

## Arquitectura

El proyecto utiliza una arquitectura en capas:

```text
Router → Controller → Service → Repository → DAO → Model → MongoDB
```

La validación de datos se realiza mediante middleware con Zod antes de acceder a MongoDB.

## API REST

### Servicios

```text
GET    /api/services
GET    /api/services/:sid
POST   /api/services
PUT    /api/services/:sid
DELETE /api/services/:sid
```

### Filtros

Filtrar por categoría:

```text
GET /api/services?category=General
```

Filtrar por disponibilidad:

```text
GET /api/services?available=true
```

### Paginación

```text
GET /api/services?page=1&limit=10
```

La respuesta incluye:

```text
totalResults
currentPage
limit
totalPages
hasPrevPage
hasNextPage
```

### Ordenamiento

Ordenar por precio ascendente:

```text
GET /api/services?sortBy=price&order=asc
```

Ordenar por precio descendente:

```text
GET /api/services?sortBy=price&order=desc
```

Los parámetros pueden combinarse:

```text
GET /api/services?category=General&available=true&page=1&limit=5&sortBy=price&order=desc
```

## Validación con Zod

Se validan los datos antes de llegar a MongoDB.

Se aplica validación a:

* creación de servicios;
* actualización de servicios;
* creación de reservas;
* agregado de servicios a reservas.

Los datos inválidos generan una respuesta `400 Bad Request` con un mensaje descriptivo.

## Reservas

```text
POST /api/bookings
GET  /api/bookings/:bid
POST /api/bookings/:bid/services/:sid
```

Las reservas almacenan los servicios mediante referencias `ObjectId`.

Al consultar una reserva:

```text
GET /api/bookings/:bid
```

se utiliza `populate()` para obtener los datos completos de los servicios relacionados.

## Mensajes

```text
GET    /api/messages
GET    /api/messages/:mid
POST   /api/messages
DELETE /api/messages/:mid
```

## Vistas

```text
GET /views/services
GET /views/availability
```

Las vistas utilizan Handlebars y obtienen los datos desde MongoDB.

## Socket.io

Al crear un servicio mediante la API REST se emite el evento `serviceCreated`, actualizando automáticamente la vista de servicios sin necesidad de recargar la página.

## Pruebas

Las pruebas de los endpoints fueron realizadas con Postman.

También se incorporaron pruebas automatizadas con Node.js Test Runner.

Ejecutar:

```bash
npm test
```

Resultado actual:

```text
2 tests
2 pass
0 fail
```

## Seguridad

`.env` y `node_modules` están incluidos en `.gitignore`.

Las credenciales reales de MongoDB no se incluyen en el repositorio.
