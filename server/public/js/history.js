document.addEventListener('DOMContentLoaded', async () => {
    const historyContainer = document.getElementById('history-container');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/invoices', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener el historial de compras');
        }

        const invoices = await response.json();

        if (invoices.length === 0) {
            historyContainer.innerHTML = `<p class="text-center text-gray-400">No tienes compras realizadas.</p>`;
            return;
        }

        invoices.forEach((invoice) => {
            const invoiceElement = document.createElement('div');
            invoiceElement.className = 'bg-gray-800 p-6 rounded-md shadow-md';
            invoiceElement.innerHTML = `
        <h2 class="text-lg font-bold text-green-400">Factura #${invoice.id}</h2>
        <p class="text-gray-400">Fecha: ${new Date(invoice.createdAt).toLocaleDateString()}</p>
        <p class="text-gray-400">Total: $${parseFloat(invoice.totalAmount).toFixed(2)}</p>
        <ul class="mt-4 space-y-2">
            ${invoice.InvoiceItems.map(item => `
                <li>
                    ${item.Product.name} - ${item.quantity} x $${parseFloat(item.price).toFixed(2)}
                </li>
            `).join('')}
        </ul>
    `;
            historyContainer.appendChild(invoiceElement);
        });

    } catch (err) {
        console.error(err);
        historyContainer.innerHTML = `<p class="text-red-500 text-center">Error al cargar el historial de compras</p>`;
    }
});