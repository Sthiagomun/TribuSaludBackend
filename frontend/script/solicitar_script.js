document.getElementById('continue-button').addEventListener('click', async () => {
    // Captura los valores seleccionados por el usuario
    const tipoCita = document.getElementById('appointment-type').value;
    const fecha = document.getElementById('appointment-date').value;
    const hora = document.getElementById('appointment-time').value;
    const sede = document.getElementById('appointment-location').innerText;

    // Verifica que todos los campos estén llenos
    if (!tipoCita || !fecha || !hora || !sede) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }

    try {
        // Envía los datos al backend
        const response = await fetch('http://localhost:3000/api/citas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paciente: 'Nombre del paciente', // Cambia esto por el nombre del paciente autenticado
                fecha,
                hora,
                doctor: 'Doctor asignado', // Cambia esto si tienes un sistema para asignar doctores
                especialidad: tipoCita,
                sede,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cita creada exitosamente');
            window.location.href = './citas_index.html'; // Redirige al panel de citas
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al crear cita:', error);
        alert('Ocurrió un error al intentar crear la cita. Inténtalo más tarde.');
    }
});