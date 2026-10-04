import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'shipped', 'completed'),
        defaultValue: 'pending'
    }
});

export default Order;