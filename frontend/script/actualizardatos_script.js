document.getElementById('submit-button').addEventListener('click', async (event) => {
    event.preventDefault();

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
    const userId = localStorage.getItem('usuarioId');

    if (!userId) {
        alert('No se encontró el ID de usuario. Por favor, inicia sesión nuevamente.');
        return;
    }

    // Crear el objeto con los datos a enviar
    const userData = {
        userId: userId, // Agregamos el userId al cuerpo de la petición
        tipo_de_documento: documentType,
        documento: documentNumber,
        email: email,
        password: password
    };

    try {
        // Enviar los datos al backend
        const response = await fetch(`http://localhost:3000/api/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Error al actualizar los datos');
        }

        const result = await response.json();
        alert('Datos actualizados correctamente.');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('nombreUsuario');
        window.location.href = './login_index.html';
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert(`Error al actualizar los datos: ${error.message}`);
    }
});