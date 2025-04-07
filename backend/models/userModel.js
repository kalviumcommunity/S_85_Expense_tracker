const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
// Password Hashing Middleware
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, saltRound);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate JWT Token
UserSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email
      },
      process.env.JWT_SECRET_KEY, // Corrected typo
      {
        expiresIn: "30d"
      }
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Validate Password
UserSchema.methods.isPasswordValid = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Expense Schema
const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // User-specific categories
});

// Income Schema
const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// Budget Schema
const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  limit: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
}, { timestamps: true });

module.exports = {
  User: mongoose.model("User", UserSchema),
  Expense: mongoose.model("Expense", ExpenseSchema),
  Category: mongoose.model("Category", CategorySchema),
  Income: mongoose.model("Income", IncomeSchema),
  Budget: mongoose.model("Budget", BudgetSchema)
};
