document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
        alert('No se encontró el usuarioId. Por favor, inicia sesión nuevamente.');
        return;
    }

    // Obtener el texto de la opción seleccionada para cada select
    const appointmentTypeSelect = document.getElementById('appointment-type');
    const especialidad = appointmentTypeSelect.options[appointmentTypeSelect.selectedIndex].text;

    const appointmentTimeSelect = document.getElementById('appointment-time');
    const hora = appointmentTimeSelect.options[appointmentTimeSelect.selectedIndex].text;

    const doctorSelect = document.getElementById('doctor');
    const doctor = doctorSelect.options[doctorSelect.selectedIndex].text;

    const fecha = document.getElementById('appointment-date').value;

    if (!hora || hora === "Selecciona una hora") {
        alert('Por favor, selecciona una hora.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/citas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuarioId,
                fecha,
                hora,
                doctor,
                especialidad,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Cita creada exitosamente');
            window.location.href = './citas_index.html';
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al crear cita:', error);
        alert('Ocurrió un error al intentar crear la cita.');
    }
});