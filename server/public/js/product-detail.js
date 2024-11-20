document.addEventListener('DOMContentLoaded', async () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    const productDetail = document.getElementById('product-detail');

    if (!productId) {
        productDetail.innerHTML = `<p class="text-red-500">Producto no encontrado</p>`;
        return;
    }

    try {
        // Fetch detalles del producto
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();

        if (!response.ok) {
            throw new Error(product.error || 'Error al obtener el producto');
        }

        productDetail.innerHTML = `
            <h1 class="text-4xl font-bold mb-4">${product.name}</h1>
            <p class="text-gray-400 mb-4">${product.description}</p>
            <p class="text-2xl font-bold mb-4 text-green-500">$${product.price.toFixed(2)}</p>
            <div class="flex items-center mb-6">
                <label for="quantity" class="text-sm font-medium mr-2">Cantidad:</label>
                <input type="number" id="quantity" name="quantity" min="1" max="${product.stock}" value="1"
                    class="w-16 p-2 bg-gray-700 text-white rounded-md">
                <span class="ml-4 text-gray-400">Stock disponible: ${product.stock}</span>
            </div>
            <button id="add-to-cart" class="px-6 py-3 bg-green-500 text-white font-bold uppercase tracking-wide hover:bg-green-600">
                Agregar al Carrito
            </button>
        `;

        // Agregar producto al carrito
        const addToCartButton = document.getElementById('add-to-cart');
        const quantityInput = document.getElementById('quantity');

        addToCartButton.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);

            if (quantity < 1 || quantity > product.stock) {
                alert('Cantidad inválida');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find((item) => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
                existingProduct.total = existingProduct.quantity * existingProduct.price;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    total: product.price * quantity
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} se agregó al carrito`);
        });
    } catch (err) {
        console.error(err);
        productDetail.innerHTML = `<p class="text-red-500">Error al cargar los detalles del producto</p>`;
    }
});
