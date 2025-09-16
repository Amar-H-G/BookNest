// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role: { type: String, enum: ["seeker", "owner"], default: "seeker" },
  },
  { timestamps: true }
);

// Automatically hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);

// // models/User.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import NodeGeocoder from "node-geocoder";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true, index: true },
//   email: { type: String, index: true, sparse: true },
//   phone: { type: String, index: true, sparse: true },
//   passwordHash: { type: String }, // will store hashed password
//   role: { type: String, enum: ["seeker", "owner", "admin"], default: "user" },
//   verified: { type: Boolean, default: false },

//   address: {
//     line1: String,
//     line2: String,
//     city: String,
//     state: String,
//     pincode: String,
//   },

//   // GeoJSON location
//   location: {
//     type: { type: String, enum: ["Point"], default: "Point" },
//     coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
//   },

//   rating: { type: Number, default: 0 },

//   // Books owned/registered by this user
//   books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],

// },{ timestamps: true } );

// // Geo index for nearby search
// userSchema.index({ location: "2dsphere" });

// /* 🔑 Password Hash Middleware */
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("passwordHash")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// /* 🌍 Auto-geocode address -> location (lat/lng) */
// const geocoder = NodeGeocoder({
//   provider: "openstreetmap", // can use Google, Mapbox etc.
// });

// userSchema.pre("save", async function (next) {
//   if (
//     this.isModified("address") &&
//     this.address &&
//     (this.address.city || this.address.pincode)
//   ) {
//     try {
//       const addrString = `${this.address.line1 || ""} ${this.address.line2 || ""} ${this.address.city || ""} ${this.address.state || ""} ${this.address.pincode || ""}`;
//       const res = await geocoder.geocode(addrString);

//       if (res.length > 0) {
//         this.location = {
//           type: "Point",
//           coordinates: [res[0].longitude, res[0].latitude],
//         };
//       }
//     } catch (err) {
//       console.error("Geocoding error:", err);
//     }
//   }
//   next();
// });

// export default mongoose.model("User", userSchema);
