import { ADMIN } from '../config/database.js';
import { guardarLocalStorage, consultarLocalStorage, limpiarLocalStorage } from '../config/local-storage.js';
import { generarToken } from './generadores-token.js';
import { alertaRedireccion, alertaGeneral } from './alerta.js';

const API_BASE_URL = 'http://localhost:8081/api';
const loginForm = document.getElementById('inicioSesionForm');
const contactForm = document.getElementById('contactForm');
const contactNombre = document.getElementById('nombre');
const contactEmail = document.getElementById('email');
const contactTelefono = document.getElementById('telefono');
const contactMensaje = document.getElementById('mensaje');


async function cargarMensajesDashboard() {
    const mensajesTbody = document.getElementById('mensajesTableBody');
    const cargarMensajes = document.getElementById('cargaMensajes');

    const token = consultarLocalStorage('token');
    if (!token && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
        return;
    }

    if (!mensajesTbody) return;
    const errorMensajes = document.getElementById('errorMensajes');
    const noHayMensajes = document.getElementById('noHayMensajes');
    if (!mensajesTbody) return;

    cargarMensajes.style.display = 'block';
    errorMensajes.style.display = 'none';
    noHayMensajes.style.display = 'none';
    mensajesTbody.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/portafolio/mensajes_contacto`);

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const mensajes = await response.json();
        cargarMensajes.style.display = 'none';

        if (mensajes.length === 0) {
            noHayMensajes.style.display = 'block';
        } else {
            mensajes.forEach(mensaje => {
    
                const row = document.createElement('tr');
            
                let fechaMostrable = 'N/A';
                if (mensaje.fechaEnvio) {
                    
                    fechaMostrable = new Date(mensaje.fechaEnvio).toLocaleDateString('es-ES');
                }
                
                row.innerHTML = `
                    <td>${mensaje.id}</td>
                    <td>${mensaje.nombre}</td>
                    <td>${mensaje.email}</td>
                    <td>${mensaje.telefono || 'N/A'}</td>
                    <td>${mensaje.mensaje}</td>
                    <td>${fechaMostrable}</td>
                    <td>
                        <button class="btn btn-sm btn-eliminar" data-id="${mensaje.id}" title="Eliminar mensaje">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </td>
                `;
                mensajesTbody.appendChild(row);
            });
        }

    } catch (error) {
        console.error('Error al cargar mensajes:', error);
        cargarMensajes.style.display = 'none';
        errorMensajes.style.display = 'block';
    }
}

/**
 * Elimina un mensaje de contacto por su ID.
 * @param {number} id 
 */
async function eliminarMensaje(id) {
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede revertir.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6e7881',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
        try {
            const response = await fetch(`${API_BASE_URL}/portafolio/mensajes_contacto/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar el mensaje.');

            alertaGeneral('Eliminado', 'El mensaje ha sido eliminado.', 'success');
            cargarMensajesDashboard();

        } catch (error) {
            console.error('Error:', error);
            alertaGeneral('Error', 'No se pudo eliminar el mensaje.', 'error');
        }
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const mensajeData = {
            nombre: contactNombre.value || '',
            email: contactEmail.value || '',
            telefono: contactTelefono.value || '',
            mensaje: contactMensaje.value || ''
        };

        if (!mensajeData.nombre || !mensajeData.email || !mensajeData.mensaje) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/portafolio/mensajes_contacto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mensajeData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ mensaje: response.statusText }));
                throw new Error(errorData.mensaje || `Error del servidor: ${response.status}`);
            }

            contactForm.reset();
            alertaGeneral('Mensaje enviado', '¡Gracias!', 'success');

        } catch (error) {
            console.error('Error de red al enviar el mensaje:', error);
            alert('No se pudo conectar con el servidor.');
        }
    });
}


if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('usuario').value;
        const passwordInput = document.getElementById('contrasema').value;
        const loginError = document.getElementById('loginError');

        const adminEncontrado = ADMIN.find(admin => admin.usuario === usernameInput && admin.contrasena === passwordInput);

        if (adminEncontrado) {
            const token = generarToken();
            guardarLocalStorage('token', token);
            alertaRedireccion("Inicio de sesión exitoso", "success", "dashboard.html");
    

        } else {
            loginError.style.display = 'block';
            alertaGeneral("Error de inicio de sesión", "Usuario o contraseña incorrectos", "error");
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMensajesDashboard();
    const mensajesTbody = document.getElementById('mensajesTableBody');
    if (mensajesTbody) {
        mensajesTbody.addEventListener('click', (e) => {
            const botonEliminar = e.target.closest('.btn-eliminar');
            if (botonEliminar) {
                const id = botonEliminar.dataset.id;
                eliminarMensaje(id);
            }
        });
    }
});