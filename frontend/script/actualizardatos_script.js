document.getElementById('submit-button').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Capturar los datos del formulario
    const documentType = document.getElementById('documentType').value;
    const documentNumber = document.getElementById('documentNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        document.getElementById('error-message').style.display = 'block';
        return;
    } else {
        document.getElementById('error-message').style.display = 'none';
    }

    // Recuperar el userId del localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('No se encontró el userId. Por favor, inicia sesión nuevamente.');
        return;
    }

    // Crear el objeto con los datos a enviar
    const userData = {
        userId,
        tipo_de_documento: documentType,
        documento: documentNumber,
        email: email,
        password: password,
    };

    try {
        // Enviar los datos al backend
        const response = await fetch('http://localhost:3000/api/users/update', {
            method: 'PUT', // Método HTTP para actualizar
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Datos actualizados correctamente.');
            // Redirige al login después de actualizar los datos
            localStorage.removeItem('userId'); // Limpia el userId del localStorage
            window.location.href = './login_index.html';
        } else {
            alert(`Error al actualizar los datos: ${result.message}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Ocurrió un error al actualizar los datos.');
    }
});