const createProductForm = document.getElementById('createProductForm');

createProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    try {
        const token = localStorage.getItem('token'); // Token del administrador

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price, stock })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Producto creado exitosamente');
            createProductForm.reset();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (err) {
        console.error('Error al crear el producto:', err);
        alert('Error al crear el producto');
    }
});
