document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    // Captura los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const tipo_de_documento = document.getElementById('tipo_de_documento').value;
    const documento = document.getElementById('documento').value;
    const eps = document.getElementById('eps').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const telefono = document.getElementById('telefono').value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        // Envía los datos al servidor
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre, // Agregar el campo nombre
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
            alert('Usuario registrado exitosamente');
            window.location.href = './login_index.html'; // Redirige al login
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Ocurrió un error al intentar registrar el usuario.');
    }
});