import express from 'express';
import { getBooks, createBook } from '../controllers/bookController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';
import { validateBook } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', getBooks);

router.post('/', authenticateToken, isAdmin, validateBook, createBook);

export default router;