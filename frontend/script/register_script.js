document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtén los valores de los campos del formulario
    const email = document.getElementById('email').value;
    const tipo_de_documento = document.getElementById('tipo_de_documento').value;
    const documento = document.getElementById('documento').value;
    const eps = document.getElementById('eps').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const telefono = document.getElementById('telefono').value;

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    console.log({
        email,
        tipo_de_documento,
        documento,
        eps,
        password,
        telefono,
    });

    try {
        // Envía los datos al servidor
        const response = await fetch('http://localhost:3000/api/users', { // Cambia la URL si es necesario
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                tipo_de_documento,
                documento,
                eps,
                password,
                telefono,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Maneja el éxito
            alert('Registro exitoso');
            window.location.href = '../html/login_index.html'; // Redirige al login
        } else {
            // Maneja errores del servidor
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        // Maneja errores de red u otros
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario. Inténtalo de nuevo más tarde.');
    }
});