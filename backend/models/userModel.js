const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

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
