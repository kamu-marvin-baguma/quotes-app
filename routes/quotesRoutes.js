const express = require("express");

const router = express.Router();
const {getAllQuotes, getQuote, CreateQuote, updateQuote, deleteQuote} = require("../controllers/quotesController");



router.route("/")
  .get(getAllQuotes)
  .post(CreateQuote);

router.route("/:id")
  .get(getQuote)
  .patch(updateQuote)
  .delete(deleteQuote);

module.exports = router;
