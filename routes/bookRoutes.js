import express from "express";
import Book from "../model/bookSchema.js";

const router = express.Router();

router.post("/addBook", async (req, res) => {
    try {
        const { bookId, title, author, category } = req.body;

        if (!bookId || !title || !author || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const book = await Book.create({
            bookId,
            title,
            author,
            category
        });

        if (!book) {
            return res.status(400).json({
                success: false,
                message: "Book not created"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (err) {
        console.log("Internal server error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.get("/getBooks", async (req, res) => {
    try {
        const limit = Number(req.query.limit, 10) || 2;
        const skip = Number(req.query.skip, 10) || 0;

        const books = await Book.find().limit(limit).skip(skip);

        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);


        const pageMetaData = {
            currentPage: skip / limit + 1,
            totalPages: totalPages,
            limit: limit,
            totalBooks: totalBooks
        }

        if (!books) {
            return res.status(404).json({
                success: false,
                message: "Books not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: books
        });
    } catch (err) {
        console.log("Internal server error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.patch("/updateBook/:bookId", async (req, res) => {
    try {
        const { bookAvailibility } = req.body;

        const book = await Book.findOneAndUpdate(
            { bookId: req.params.bookId },
            { bookAvailibility },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book availability updated successfully",
            data: book
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router;
