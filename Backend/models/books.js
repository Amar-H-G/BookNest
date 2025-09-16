// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, default: "" },
  location: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  images: [
    {
      url: { type: String, required: true }, // Cloudinary URL
      public_id: { type: String, required: true }, // Cloudinary public_id
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", bookSchema);

// 2) Book (canonical)
// const BookSchema = new mongoose.Schema({
//   isbn: { type: String, index: true, sparse: true }, // unify where possible
//   title: { type: String, required: true },
//   authors: [String],
//   publisher: String,
//   publishedDate: String,
//   language: String,
//   categories: [String],
//   coverUrl: String,
//   description: String,
// },{ timestamps: true });
// BookSchema.index({ title: "text", authors: "text", publisher: "text" });

// // 3) Listing
// const ListingSchema = new mongoose.Schema({
//   seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
//   book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true, index: true },

//   // Denormalized snapshot for fast read (search results)
//   bookSnapshot: {
//     title: String, authors: [String], coverUrl: String, isbn: String
//   },

//   condition: { type: String, enum: ['New','Like New','Good','Fair','Poor'], default: 'Good' },
//   type: { type: String, enum: ['sell','rent','new'], required: true }, // listing type
//   price: { type: Number },            // sell price
//   rentPerDay: { type: Number },       // rent price per day
//   securityDeposit: { type: Number },  // for rentals
//   photos: [String], // S3 keys or URLs
//   description: String,
//   location: {
//     type: { type: String, enum: ['Point'], default: 'Point' },
//     coordinates: { type: [Number], required: true } // [lng, lat]
//   },
//   addressText: String, // human readable
//   availableFrom: Date,
//   status: { type: String, enum: ['available','reserved','rented','sold','hidden'], default: 'available', index: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: Date,
//   views: { type: Number, default: 0 }
// });

// // Indexes:
// ListingSchema.index({ location: '2dsphere' }); // for geo queries
// ListingSchema.index({ status: 1, type: 1, 'bookSnapshot.title': 'text' }); // mix of filters
// ListingSchema.index({ seller: 1, status: 1 });
// ListingSchema.index({ price: 1 }); // price range queries
