import { Order, OrderItem, Book } from '../DB/models/index.js';

export const createOrder = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain at least one item' });
        }

        const newOrder = await Order.create({
            userId: req.user.id
        });

        const orderItemsData = items.map(item => ({
            orderId: newOrder.id,
            bookId: item.bookId,
            quantity: item.quantity
        }));

        await OrderItem.bulkCreate(orderItemsData);

        const completeOrder = await Order.findByPk(newOrder.id, {
            include: [{ model: Book, through: { attributes: ['quantity'] } }]
        });

        res.status(201).json(completeOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while creating order' });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId, {
            include: [{ model: Book, through: { attributes: ['quantity'] } }]
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching order' });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ error: 'Server error while updating order status' });
    }
};