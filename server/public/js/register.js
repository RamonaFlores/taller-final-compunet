document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
            window.location.href = 'login.html'; // Redirige al login
        } else {
            alert(data.error || 'Error al registrarse');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error al conectar con el servidor');
    }
});
