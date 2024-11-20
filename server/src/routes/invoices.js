import express from 'express';
import { Invoice, InvoiceItem } from '../models/invoice.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import Product from "../models/product.js";

const router = express.Router();

// Obtener historial de compras del usuario autenticado
router.get('/invoices', verifyToken, async (req, res) => {
    try {
        console.log('Usuario autenticado:', req.user);
        const invoices = await Invoice.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: InvoiceItem,
                    include: [{ model: Product }],
                },
            ],
        });
        console.log('Facturas encontradas:', invoices);
        res.json(invoices);
    } catch (err) {
        console.error('Error al obtener facturas:', err);
        res.status(500).json({ error: 'Error al obtener el historial de compras' });
    }
});
export default router;
