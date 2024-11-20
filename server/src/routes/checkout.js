import express from 'express';
import { Invoice, InvoiceItem } from '../models/invoice.js';
import Product from '../models/product.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout', verifyToken, async (req, res) => {
    const { cart } = req.body; // El carrito viene desde el frontend
    const userId = req.user.id;

    console.log('Carrito recibido:', cart); // Log para verificar los datos del carrito
    console.log('Usuario:', userId); // Log para verificar el usuario autenticado

    try {
        let totalAmount = 0;

        // Validar stock y calcular total
        for (const item of cart) {
            const product = await Product.findByPk(item.id);
            if (!product || product.stock < item.quantity) {
                console.error(`Stock insuficiente para ${product?.name || 'producto'}`);
                return res.status(400).json({ error: `Stock insuficiente para ${product?.name || 'producto'}` });
            }
            totalAmount += item.quantity * product.price;
        }

        // Crear la factura
        const invoice = await Invoice.create({ userId, totalAmount });
        console.log('Factura creada:', invoice); // Log para confirmar la creación de la factura

        // Insertar productos en InvoiceItem y actualizar stock
        for (const item of cart) {
            await InvoiceItem.create({
                productId: item.id,
                invoiceId: invoice.id,
                quantity: item.quantity,
                price: item.price,
            });

            // Reducir el stock
            const product = await Product.findByPk(item.id);
            product.stock -= item.quantity;
            await product.save();
        }

        res.status(201).json({ message: 'Compra realizada con éxito', invoiceId: invoice.id });
    } catch (err) {
        console.error('Error en el proceso de compra:', err);
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
});


export default router;
