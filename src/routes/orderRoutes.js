import express from 'express';
import { createOrder, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createOrder);

router.get('/:id', getOrderById);

router.put('/:id/status', isAdmin, updateOrderStatus);

export default router;