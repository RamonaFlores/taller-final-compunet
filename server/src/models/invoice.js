import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Product from './product.js';

const Invoice = sequelize.define('Invoice', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const InvoiceItem = sequelize.define('InvoiceItem', {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    invoiceId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

// Relaciones
Invoice.hasMany(InvoiceItem, { foreignKey: 'invoiceId' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoiceId' });
InvoiceItem.belongsTo(Product, { foreignKey: 'productId' });

export { Invoice, InvoiceItem };