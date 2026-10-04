import { Book, Genre } from '../DB/models/index.js';
import { Op } from 'sequelize';

export const getBooks = async (req, res) => {
    try {
        const { genre, author, format, maxPrice } = req.query;
        let queryOptions = {
            where: {},
            include: [{ model: Genre, attributes: ['name'] }]
        };

        if (author) queryOptions.where.author = { [Op.like]: `%${author}%` };
        if (format) queryOptions.where.format = format;
        if (maxPrice) queryOptions.where.price = { [Op.lte]: maxPrice };

        if (genre) {
            const foundGenre = await Genre.findOne({ where: { name: genre } });
            if (foundGenre) {
                queryOptions.where.genreId = foundGenre.id;
            } else {
                return res.status(200).json([]);
            }
        }

        const books = await Book.findAll(queryOptions);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching books' });
    }
};

export const createBook = async (req, res) => {
    try {
        const { title, author, format, price, stock, genreId } = req.body;

        const newBook = await Book.create({
            title,
            author,
            format: format || 'physical',
            price,
            stock: stock || 0,
            genreId
        });

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Server error while creating book' });
    }
};