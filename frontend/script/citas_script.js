document.getElementById('return').addEventListener('click', () => {
    window.location.href = './dashboard_index.html';
});

document.addEventListener('DOMContentLoaded', async () => {
    const citasContainer = document.getElementById('citas-container');
    const usuarioId = localStorage.getItem('usuarioId');
    
    console.log('ID de usuario recuperado:', usuarioId);
    
    if (!usuarioId) {
        citasContainer.innerHTML = '<p>No se encontró el usuario. Inicia sesión de nuevo.</p>';
        return;
    }

    try {
        // Primero, obtener la información del usuario
        const userResponse = await fetch(`http://localhost:3000/api/users/${usuarioId}`);
        const userData = await userResponse.json();
        console.log('Datos del usuario:', userData);

        // Luego, obtener las citas
        const response = await fetch(`http://localhost:3000/api/citas?usuarioId=${usuarioId}`);
        const citas = await response.json();
        console.log('Datos de citas recibidos:', citas);

        if (citas.length === 0) {
            citasContainer.innerHTML = '<p>No tienes citas registradas.</p>';
            return;
        }

        citas.forEach(cita => {
            console.log('Procesando cita:', cita);
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita');
            
            // Usar el nombre del usuario obtenido directamente de la API
            const nombrePaciente = userData?.nombre || 'Sin nombre';
            
            citaElement.innerHTML = `
                <p><strong>Paciente:</strong> ${nombrePaciente}</p>
                <p><strong>Fecha:</strong> ${new Date(cita.fecha).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> ${cita.hora}</p>
                <p><strong>Doctor:</strong> ${cita.doctor}</p>
                <p><strong>Especialidad:</strong> ${cita.especialidad}</p>
                <hr>
            `;
            citasContainer.appendChild(citaElement);
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        citasContainer.innerHTML = '<p>Error al cargar la información. Inténtalo más tarde.</p>';
    }
});

document.getElementById('return').addEventListener('click', () => {
    window.location.href = './dashboard_index.html';
});