import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('thrift_shop', 'postgres', 'amotro99', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Desactiva el log en la consola (opcional)
});

export default sequelize;