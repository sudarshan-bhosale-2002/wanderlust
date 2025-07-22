const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// 🔑 Add Passport-Local Mongoose plugin
userSchema.plugin(passportLocalMongoose);

// ✅ Check for overwrite error if using nodemon
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
