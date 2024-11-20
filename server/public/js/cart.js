document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');

    // Obtener el carrito del localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCart = () => {
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <p class="text-center text-gray-400">El carrito está vacío.</p>
            `;
            totalPrice.textContent = '';
            checkoutButton.style.display = 'none';
            return;
        }

        checkoutButton.style.display = 'inline-block';

        cart.forEach((item, index) => {
            const itemElement = document.createElement('li');
            itemElement.className = 'flex justify-between items-center bg-gray-800 p-4 rounded-md';
            itemElement.innerHTML = `
                <div>
                    <p class="text-lg font-semibold">${item.name}</p>
                    <p class="text-sm text-gray-400">Cantidad: 
                        <input type="number" value="${item.quantity}" min="1" max="100" class="w-16 p-1 bg-gray-700 text-white rounded-md update-quantity" data-index="${index}">
                    </p>
                </div>
                <div>
                    <p class="text-lg font-bold text-green-500">$${item.total.toFixed(2)}</p>
                    <button class="text-red-500 hover:underline remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
            total += item.total;
        });

        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    };

    renderCart();

    // Actualizar cantidad de productos
    cartItems.addEventListener('input', (e) => {
        if (e.target.classList.contains('update-quantity')) {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);

            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                cart[index].total = cart[index].price * newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }
    });

    // Eliminar productos del carrito
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Realizar compra
    checkoutButton.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cart })
            });

            const data = await response.json()
            console.log('Respuesta del servidor:', response.status, data);

            if (!response.ok) {
                throw new Error(data.error || 'Error al realizar la compra');
            }

            alert('Compra realizada con éxito');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } catch (err) {
            console.error(err);
            alert('Error al realizar la compra');
        }
    });
});
