document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtén los valores de los campos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Envía los datos al servidor (ajusta la URL según tu backend)
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Maneja el éxito (por ejemplo, redirige al dashboard)
            alert('Login exitoso');
            window.location.href = './dashboard.html';
        } else {
            // Maneja errores (por ejemplo, credenciales incorrectas)
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
});
