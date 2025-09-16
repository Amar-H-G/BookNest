const express = require("express");
const router = express.Router();
const Book = require("../models/books");
const User = require("../models/user");
const upload = require("../middlewares/upload");
const cloudinary = require("../utils/cloudinary");

// GET all books (with optional owner info)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().lean();

    const booksWithOwners = await Promise.all(
      books.map(async (book) => {
        let owner = {};
        try {
          owner = await User.findById(book.ownerId).lean();
        } catch (err) {
          // owner remains empty
        }

        return {
          ...book,
          ownerName: owner?.name,
          ownerEmail: owner?.email,
          ownerMobile: owner?.mobile,
        };
      })
    );

    res.json(booksWithOwners);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// POST add new book
router.post("/", upload.array("images", 3), async (req, res) => {
  try {
    console.log("FILES: ", req.files);

    // যদি file না থাকে, তাহলে empty array রাখো
    const imageUploads =
      req.files && req.files.length > 0
        ? req.files.map((file) => ({
            url: file.path, // Cloudinary / Multer path
            public_id: file.filename, // Cloudinary public_id
          }))
        : [];

    const { title, author, genre, location, ownerId } = req.body;

    if (!title || !author || !location || !ownerId) {
      return res.status(400).json({
        success: false,
        error: "title, author, location, ownerId are required",
      });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      location,
      ownerId,
      images: imageUploads, // optional (empty হলে [] save হবে)
    });

    const savedBook = await newBook.save();
    res.status(201).json({ success: true, book: savedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT: Update book details
router.put("/:id", upload.array("images", 3), async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, location } = req.body;

  let image = req.body.image; // If no new image uploaded, keep old one
  if (req.file) {
    image = req.file.path; // Cloudinary URL
  }

  if (!title || !author || !location) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, location, image },
      { new: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, book: updatedBook });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {}; // safe destructure

  if (!status || !["available", "unavailable"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, book: updatedBook });
  } catch (err) {
    console.error("PATCH ERROR:", err); // Debug
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // Delete each image from Cloudinary
    for (const img of book.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // Delete from MongoDB
    await book.deleteOne();

    res.json({
      success: true,
      message: "Book and images deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
