const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// ✅ Check if model already compiled (avoids OverwriteModelError)
module.exports =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
