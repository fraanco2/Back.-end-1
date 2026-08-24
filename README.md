Proyecto Backend 1
Descripción

Proyecto Node.js desarrollado para gestionar servicios de un sistema de turnos y reservas.

La aplicación utiliza Node.js con módulos ESM, Express y dotenv. Los servicios se gestionan mediante la clase ServiceManager y se almacenan en el archivo src/data/services.json.

Instalación

Clonar el repositorio y ejecutar:

npm install
Variables de entorno

Crear un archivo .env en la raíz del proyecto con:

PORT=8080
NODE_ENV=development

El archivo .env no debe subirse al repositorio.

También se incluye .env.example como referencia de las variables necesarias.

Ejecución

Para iniciar la aplicación:

npm start

El servidor se ejecutará en:

http://localhost:8080
Recurso services

Cada servicio tiene la siguiente estructura:

{
  id,
  name,
  description,
  duration,
  price,
  category,
  available
}

Los servicios se almacenan en:

src/data/services.json
ServiceManager

La clase ServiceManager permite gestionar los servicios mediante los siguientes métodos.

getServices()

Devuelve todos los servicios registrados.

const services = await serviceManager.getServices();
getServiceById(id)

Busca un servicio por su ID.

const service = await serviceManager.getServiceById(1);

Devuelve el servicio encontrado o null si no existe.

addService(serviceData)

Agrega un nuevo servicio.

El id se genera automáticamente y no debe enviarse desde afuera.

const service = await serviceManager.addService({
  name: "Consulta general",
  description: "Consulta con profesional",
  duration: 30,
  price: 500,
  category: "General",
  available: true
});

Los campos name, description, duration, price, category y available son obligatorios.

updateService(id, updatedData)

Actualiza los datos de un servicio existente sin modificar su ID.

const service = await serviceManager.updateService(1, {
  price: 600,
  available: false
});
deleteService(id)

Elimina un servicio existente.

const deleted = await serviceManager.deleteService(1);
Estructura del proyecto
proyecto-backend-1/
├── src/
│   ├── app.js
│   ├── config/
│   │   └── env.config.js
│   ├── managers/
│   │   └── ServiceManager.js
│   └── data/
│       └── services.json
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md