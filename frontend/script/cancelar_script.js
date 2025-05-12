document.addEventListener('DOMContentLoaded', async () => {
    const citasContainer = document.getElementById('citas-container');
    const usuarioId = localStorage.getItem('usuarioId');
    
    if (!usuarioId) {
        citasContainer.innerHTML = '<p>No se encontró el usuario. Inicia sesión de nuevo.</p>';
        return;
    }

    try {
        // Obtener las citas del usuario
        const response = await fetch(`http://localhost:3000/api/citas?usuarioId=${usuarioId}`);
        const citas = await response.json();

        if (citas.length === 0) {
            citasContainer.innerHTML = '<p>No tienes citas pendientes.</p>';
            return;
        }

        // Mostrar cada cita con un botón de cancelar
        citas.forEach(cita => {
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita');
            
            citaElement.innerHTML = `
                <p><strong>Fecha:</strong> ${new Date(cita.fecha).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> ${cita.hora}</p>
                <p><strong>Doctor:</strong> ${cita.doctor}</p>
                <p><strong>Especialidad:</strong> ${cita.especialidad}</p>
                <button onclick="cancelarCita('${cita._id}')" class="btn-cancelar">Cancelar Cita</button>
                <hr>
            `;
            citasContainer.appendChild(citaElement);
        });
    } catch (error) {
        console.error('Error al obtener citas:', error);
        citasContainer.innerHTML = '<p>Error al cargar las citas. Inténtalo más tarde.</p>';
    }
});

async function cancelarCita(citaId) {
    if (!confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/citas/${citaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Cita cancelada exitosamente');
            location.reload(); // Recargar la página para actualizar la lista
        } else {
            const data = await response.json();
            alert(`Error al cancelar la cita: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al cancelar la cita:', error);
        alert('Error al cancelar la cita. Por favor, inténtalo más tarde.');
    }
}

document.getElementById('return').addEventListener('click', () => {
    window.location.href = './dashboard_index.html';
});