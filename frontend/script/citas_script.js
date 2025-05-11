document.addEventListener('DOMContentLoaded', async () => {
    const citasContainer = document.getElementById('citas-container');

    try {
        // Realiza una solicitud al backend para obtener las citas
        const response = await fetch('http://localhost:3000/api/citas');
        const citas = await response.json();

        // Verifica si hay citas
        if (citas.length === 0) {
            citasContainer.innerHTML = '<p>No tienes citas registradas.</p>';
            return;
        }

        // Genera el HTML para mostrar las citas
        citas.forEach(cita => {
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita');
            citaElement.innerHTML = `
                <p><strong>Paciente:</strong> ${cita.paciente}</p>
                <p><strong>Fecha:</strong> ${new Date(cita.fecha).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> ${cita.hora}</p>
                <p><strong>Doctor:</strong> ${cita.doctor}</p>
                <p><strong>Especialidad:</strong> ${cita.especialidad}</p>
                <hr>
            `;
            citasContainer.appendChild(citaElement);
        });
    } catch (error) {
        console.error('Error al obtener citas:', error);
        citasContainer.innerHTML = '<p>Error al cargar las citas. Inténtalo más tarde.</p>';
    }
});