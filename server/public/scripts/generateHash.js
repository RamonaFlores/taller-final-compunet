import bcrypt from 'bcrypt';

const password = 'admin123'; // Cambia esto por la contraseña que desees
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('Hash generado:', hashedPassword);