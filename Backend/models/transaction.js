// 4) Transaction
const TransactionSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
    index: true,
  },
  type: { type: String, enum: ["buy", "rent"], required: true },
  amount: { type: Number, required: true },
  commission: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["initiated", "paid", "completed", "cancelled", "refunded"],
    default: "initiated",
    index: true,
  },
  paymentProvider: String,
  paymentRef: String,
  createdAt: { type: Date, default: Date.now },
});
TransactionSchema.index({ buyer: 1, createdAt: -1 });
