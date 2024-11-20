document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');

    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        if (!response.ok) {
            throw new Error(products.error || 'Error al cargar los productos');
        }

        // Renderizar productos
        products.forEach((product) => {
            const productItem = document.createElement('li');
            productItem.className = 'relative group bg-gray-800 p-4 rounded-md shadow-lg';
            productItem.innerHTML = `
                <a href="./product-detail.html?id=${product.id}" class="block">
                    <div class="w-full h-60 bg-gray-700 flex items-center justify-center rounded-md">
                        <span class="text-gray-400 text-xl group-hover:text-white transition">
                            ${product.name}
                        </span>
                    </div>
                    <div class="mt-4 text-center">
                        <h3 class="text-lg font-semibold text-white">${product.name}</h3>
                        <p class="mt-2 text-gray-400">${product.description || 'Descripción no disponible'}</p>
                        <p class="mt-2 text-green-500 font-bold">$${product.price.toFixed(2)}</p>
                    </div>
                </a>
            `;
            productList.appendChild(productItem);
        });
    } catch (err) {
        console.error(err);
        productList.innerHTML = `<p class="text-red-500 text-center">Error al cargar los productos</p>`;
    }
});

