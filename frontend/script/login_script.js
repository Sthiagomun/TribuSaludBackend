document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        console.log('Intentando login con:', { email, password });

        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                email: email.trim(), 
                password: password.trim() 
            }),
        });

        const result = await response.json();
        console.log('Respuesta raw del servidor:', response);
        console.log('Datos de la respuesta:', result);

        if (!response.ok) {
            throw new Error(result.message || `Error del servidor: ${response.status}`);
        }

        // Imprimir la estructura completa de la respuesta
        console.log('Estructura de result:', JSON.stringify(result, null, 2));

        // Verificar la estructura de la respuesta
        if (!result) {
            throw new Error('La respuesta del servidor está vacía');
        }

        // Intentar acceder a los datos de diferentes maneras posibles
        const userId = result._id || result.id || (result.user && (result.user._id || result.user.id));
        const userName = result.nombre || result.name || (result.user && (result.user.nombre || result.user.name));

        if (!userId) {
            console.error('Estructura de la respuesta:', result);
            throw new Error('ID de usuario no encontrado en la respuesta');
        }

        // Guardar los datos del usuario
        localStorage.setItem('usuarioId', userId);
        localStorage.setItem('nombreUsuario', userName || '');
        
        console.log('Datos guardados en localStorage:', {
            usuarioId: localStorage.getItem('usuarioId'),
            nombreUsuario: localStorage.getItem('nombreUsuario')
        });

        window.location.href = './dashboard_index.html';
    } catch (error) {
        console.error('Error completo:', error);
        console.error('Stack trace:', error.stack);
        alert(`Error de inicio de sesión: ${error.message}`);
    }
});

const usuarioId = localStorage.getItem('usuarioId'); // <-- minúscula

const error = new Error('Error de inicio de sesión: No se recibió un ID de usuario válido');
console.log(error);

