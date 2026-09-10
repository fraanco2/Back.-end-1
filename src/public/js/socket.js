const socket = io();

socket.on("serviceCreated", (service) => {
    const servicesContainer = document.getElementById("services-container");

    if (!servicesContainer) {
        return;
    }

    const serviceElement = document.createElement("article");

    serviceElement.classList.add("service");

    serviceElement.innerHTML = `
        <h3>${service.name}</h3>
        <p><strong>Descripción:</strong> ${service.description}</p>
        <p><strong>Duración:</strong> ${service.duration} minutos</p>
        <p><strong>Precio:</strong> $${service.price}</p>
        <p><strong>Categoría:</strong> ${service.category}</p>
        <p>
            <strong>Disponibilidad:</strong>
            ${service.available ? "Disponible" : "No disponible"}
        </p>
    `;

    servicesContainer.appendChild(serviceElement);
});