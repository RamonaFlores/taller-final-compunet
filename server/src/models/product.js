import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        get() {
            return parseFloat(this.getDataValue('price')); // Asegúrate de que se devuelva como número
        }
    },
    stock: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'products',
    timestamps: false
});

export default Product;