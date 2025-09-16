// 5) Rental lifecycle (separate doc to avoid inflating transactions)
const RentalSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
    index: true,
  },
  startDate: Date,
  dueDate: Date,
  returnedDate: Date,
  depositAmount: Number,
  damageReport: String,
  status: {
    type: String,
    enum: ["ongoing", "overdue", "returned", "disputed", "closed"],
    default: "ongoing",
  },
  createdAt: { type: Date, default: Date.now },
});
RentalSchema.index({ status: 1, dueDate: 1 });
