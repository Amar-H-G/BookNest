// 8) Subscription
const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  planId: String,
  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
  startedAt: Date,
  expiresAt: Date,
  providerRef: String,
});
SubscriptionSchema.index({ user: 1, status: 1 });

// 9) Payment (store minimal gateway info)
const PaymentSchema = new mongoose.Schema({
  txnRef: String,
  provider: String,
  providerPayload: mongoose.Schema.Types.Mixed,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});
