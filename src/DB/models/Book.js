import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    format: {
        type: DataTypes.ENUM('physical', 'digital_pdf', 'epub'), 
        defaultValue: 'physical'
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

export default Book;