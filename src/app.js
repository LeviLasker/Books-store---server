import express from 'express';
import dotenv from 'dotenv';
import { sync } from './DB/config.js';
import { apiLimiter } from './middlewares/rateLimiter.js';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(apiLimiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sync(); 
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();