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

Cada capa tiene una responsabilidad específica y la lógica de negocio se encuentra en los Services.

## Estructura principal

```text
src/
├── config/
├── controllers/
├── services/
├── repositories/
├── dao/
│   └── models/
├── routes/
├── views/
└── public/

test/
```

## API REST

### Servicios

```text
GET    /api/services
GET    /api/services/:sid
POST   /api/services
PUT    /api/services/:sid
DELETE /api/services/:sid
```

También permite filtrar por:

```text
/api/services?category=salud
/api/services?available=true
```

### Reservas

```text
POST /api/bookings
GET  /api/bookings/:bid
POST /api/bookings/:bid/services/:sid
```

Las reservas utilizan referencias ObjectId hacia los servicios y `populate()` de Mongoose.

### Mensajes

```text
GET    /api/messages
GET    /api/messages/:mid
POST   /api/messages
DELETE /api/messages/:mid
```

## Vistas

Se incorporaron vistas server-side con Handlebars:

```text
GET /views/services
GET /views/availability
```

Las vistas obtienen los datos desde MongoDB mediante la arquitectura del proyecto.

## Socket.io

Se incorporó comunicación en tiempo real.

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
