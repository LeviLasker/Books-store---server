import { Sequelize } from "sequelize";
import fs from "fs";

const dbPath = './src/DB/db.sqlite';

if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
});

export const sync = async () => {
    console.log(`connecting to DB ${new Date().toISOString()}`);

    await import('./models/User.js');
    await import('./models/Book.js');
    await import('./models/Order.js');
    await import('./models/OrderItem.js');
    await import('./models/Genre.js');

    await sequelize.sync();

    console.log(`connected to DB ${new Date().toISOString()}`);
}

export default sequelize;