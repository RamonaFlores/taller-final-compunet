import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import authRoutes from './routes/auth.js';
import checkoutRoutes from './routes/checkout.js';
import invoiceRoutes from './routes/invoices.js';
import { verifyToken, isAdmin } from './middleware/authMiddleware.js';
import sequelize from './config/sequelize.js';
import User from './models/user.js';
import Product from './models/product.js';

const app = express();
const PORT = 5000;

const __dirname = path.resolve();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa con PostgreSQL'))
    .catch(err => console.error('Error al conectar con PostgreSQL:', err));

sequelize.sync({ force: true }) // Esto recreará las tablas, asegúrate de respaldar datos importantes
    .then(() => console.log('Modelos sincronizados con la base de datos'))
    .catch(err => console.error('Error al sincronizar modelos:', err));

// Configuración de middlewares
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', invoiceRoutes);
// Ruta pública: Obtener productos
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        console.log('Productos obtenidos:', products); // Log para verificar los productos
        res.json(products);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (err) {
        console.error('Error al obtener el producto:', err);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Ruta protegida: Agregar productos
app.post('/api/products', verifyToken, isAdmin, async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const product = await Product.create({ name, description, price, stock });
        res.json({ message: 'Producto agregado exitosamente', product });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});


// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
console.log('Directorio raíz:', __dirname);
