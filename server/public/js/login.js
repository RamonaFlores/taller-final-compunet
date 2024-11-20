document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('token', data.token); // Almacena el token
            localStorage.setItem('username', username); // Almacena el nombre del usuario
            localStorage.setItem('role', data.role);
            window.location.href = './index.html'; // Redirige a la página principal
        } else {
            alert(data.error || 'Error al iniciar sesión');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error al conectar con el servidor');
    }
});
