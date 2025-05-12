document.addEventListener('DOMContentLoaded', async () => {
    const perfilContainer = document.getElementById('perfil-container');
    const usuarioId = localStorage.getItem('usuarioId');
    
    console.log('ID de usuario recuperado:', usuarioId);
    
    if (!usuarioId) {
        perfilContainer.innerHTML = '<p>No se encontró el usuario. Inicia sesión de nuevo.</p>';
        return;
    }

    try {
        // Obtener la información del usuario
        const response = await fetch(`http://localhost:3000/api/users/${usuarioId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const usuario = await response.json();

        // Función para obtener el texto completo del tipo de documento
        const getTipoDocumento = (tipo) => {
            const tipos = {
                'ti': 'Tarjeta de Identidad',
                'cc': 'Cédula de Ciudadanía',
                'ce': 'Cédula de Extranjería',
                'pa': 'Pasaporte'
            };
            return tipos[tipo] || tipo;
        };

        // Función para obtener el nombre completo de la EPS
        const getNombreEPS = (eps) => {
            const epsNombres = {
                'cafesalud': 'Coosalud EPS',
                'compensar': 'Compensar EPS',
                'coomeva': 'Coomeva EPS',
                'famisanar': 'Famisanar EPS',
                'nuevaeps': 'Nueva EPS',
                'saludtotal': 'Salud Total EPS',
                'sanitas': 'EPS Sanitas',
                'sura': 'EPS SURA'
            };
            return epsNombres[eps.toLowerCase()] || eps;
        };

        // Mostrar la información del usuario con los valores reales
        perfilContainer.innerHTML = `
            <div class="perfil-info">
                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p><strong>Correo electrónico:</strong> ${usuario.email}</p>
                <p><strong>Tipo de documento:</strong> ${getTipoDocumento(usuario.tipo_de_documento)}</p>
                <p><strong>Número de documento:</strong> ${usuario.documento}</p>
                <p><strong>EPS:</strong> ${getNombreEPS(usuario.eps)}</p>
                <p><strong>Teléfono:</strong> ${usuario.telefono}</p>
                <p><strong>Fecha de registro:</strong> ${new Date(usuario.createdAt).toLocaleDateString()}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error completo:', error);
        perfilContainer.innerHTML = `<p>Error al cargar la información del usuario: ${error.message}</p>`;
    }
});

document.getElementById('return').addEventListener('click', () => {
    window.location.href = '../html/dashboard_index.html';
});