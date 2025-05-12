document.getElementById('return').addEventListener('click', () => {
    window.location.href = './dashboard_index.html';
});

document.addEventListener('DOMContentLoaded', async () => {
    const citasContainer = document.getElementById('citas-container');
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
        citasContainer.innerHTML = '<p>No se encontró el usuario. Inicia sesión de nuevo.</p>';
        return;
    }

    try {
        // Solicita solo las citas del usuario actual
        const response = await fetch(`http://localhost:3000/api/citas?usuarioId=${usuarioId}`);
        const citas = await response.json();

        if (citas.length === 0) {
            citasContainer.innerHTML = '<p>No tienes citas registradas.</p>';
            return;
        }

        citas.forEach(cita => {
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita');
            citaElement.innerHTML = `
                <p><strong>Paciente:</strong> ${cita.usuarioId?.nombre || cita.usuarioId || 'Sin nombre'}</p>
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