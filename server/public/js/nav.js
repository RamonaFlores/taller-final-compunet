document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // Nombre del usuario almacenado
    const userRole = localStorage.getItem('role'); // Rol del usuario almacenado

    // Enlaces siempre visibles
    menu.innerHTML = `
        <a href="./index.html" class="hover:underline block py-2 text-white">Inicio</a>
        <a href="./about.html" class="hover:underline block py-2 text-white">Acerca de</a>
        <a href="./cart.html" class="hover:underline block py-2 text-yellow-500">Carrito</a>
    `;

    if (token) {
        // Usuario autenticado: Añadir saludo y logout
        menu.innerHTML += `
            <span class="text-gray-400 block py-2">Hola, ${username}</span>
        `;

        // Verificar si el usuario es administrador
        if (userRole === 'admin') {
            menu.innerHTML += `
                <a href="./admin.html" class="hover:underline block py-2 text-green-500">Admin Panel</a>
            `;
        }

        menu.innerHTML += `
            <a href="#" id="logout" class="hover:underline block py-2 text-red-500">Cerrar sesión</a>
            <a href="./history.html" class="hover:underline block py-2 text-yellow-500">Tu historial</a>
        `;

        // Evento para el botón "Cerrar sesión"
        const logoutBtn = document.getElementById('logout');
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            alert('Sesión cerrada correctamente');
            window.location.href = './login.html';
        });
    } else {
        // Usuario no autenticado: Añadir Login y Registrarse
        menu.innerHTML += `
            <a href="./login.html" class="hover:underline block py-2 text-white">Iniciar Sesión</a>
            <a href="./register.html" class="hover:underline block py-2 text-white">Registrarse</a>
        `;
    }
});
