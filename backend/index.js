require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
  rating: Number,
});

const reviewSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  user: String,
  comment: String,
  rating: Number,
});

const Book = mongoose.model("Book", bookSchema);
const Review = mongoose.model("Review", reviewSchema);

module.exports = { Book, Review };

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app
  .route("/book")
  .get(async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        rating: req.body.rating,
      });
      await newBook.save();
      res.status(201).json({ message: "Book created", book: newBook });
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.route("/book/:bookId").get(async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app
  .route("/review")
  .get(async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const newReview = new Review({
        bookId: req.body.bookId,
        user: req.body.user,
        comment: req.body.comment,
        rating: req.body.rating,
      });
      await newReview.save();
      res.status(201).json({ message: "Review created", review: newReview });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get("/", (req, res) => res.send("API Running"));

app.listen(5000, () => console.log("Server running on port 5000"));
