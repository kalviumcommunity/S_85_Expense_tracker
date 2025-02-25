const express = require("express");
const router = express.Router();
const { handleGetAllUser, handlePost, handlePut, handlePatch, handleDelete } = require("../controllers/user");

// Define CRUD routes
router.route("/user")
  .get(handleGetAllUser)  // GET all users
  .post(handlePost);  // Create new user

router.route("/user/:id")
  .put(handlePut)  // Update user (PUT - replaces entire document)
  .patch(handlePatch)  // Partial update (PATCH - modifies only given fields)
  .delete(handleDelete);  // Delete user

module.exports = router;
