import User from './User.js';
import Book from './Book.js';
import Genre from './Genre.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

Genre.hasMany(Book, { foreignKey: 'genreId' });
Book.belongsTo(Genre, { foreignKey: 'genreId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Book, { through: OrderItem, foreignKey: 'orderId' });
Book.belongsToMany(Order, { through: OrderItem, foreignKey: 'bookId' });

export { User, Book, Genre, Order, OrderItem };