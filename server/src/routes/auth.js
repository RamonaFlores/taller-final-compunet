import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();
const JWT_SECRET = 'supersecretkey';

// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token, username: user.username, role: user.role });
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Endpoint para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Cifrar la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({ username, password: hashedPassword, role: role || 'client' });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: newUser.id, username: newUser.username, role: newUser.role } });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

export default router;
