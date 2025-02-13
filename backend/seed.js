require("dotenv").config();
const mongoose = require("mongoose");
const { Book, Review } = require("./index");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

(async () => {
  try {
    await Book.deleteMany();
    await Review.deleteMany();

    const books = await Book.insertMany([
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary:
          "A novel set in the Jazz Age, exploring themes of wealth and love.",
        rating: 4.5,
      },
      {
        title: "1984",
        author: "George Orwell",
        summary: "A dystopian novel about totalitarianism and surveillance.",
        rating: 4.8,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        summary: "A novel addressing racial injustice in the American South.",
        rating: 4.7,
      },
    ]);

    await Review.insertMany([
      {
        bookId: books[0]._id,
        user: "JohnDoe",
        comment: "Loved this book!",
        rating: 5,
      },
      {
        bookId: books[1]._id,
        user: "JaneSmith",
        comment: "A thought-provoking read.",
        rating: 4,
      },
      {
        bookId: books[2]._id,
        user: "AliceBrown",
        comment: "An absolute classic.",
        rating: 5,
      },
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
})();
