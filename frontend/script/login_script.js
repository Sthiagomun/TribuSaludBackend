document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // Captura los valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Realiza la solicitud al backend para iniciar sesión
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda el usuarioId en localStorage
            localStorage.setItem('usuarioId', data.usuarioId);
            alert('Inicio de sesión exitoso');
            window.location.href = './dashboard_index.html'; // Redirige al formulario de solicitud de citas
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
});

const usuarioId = localStorage.getItem('usuarioId'); // <-- minúscula
