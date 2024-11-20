import jwt from 'jsonwebtoken';

const JWT_SECRET = 'supersecretkey';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Agrega el usuario decodificado a la solicitud
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: No eres administrador' });
    }
    next();
};
