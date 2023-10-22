const express = require("express");
const app = express();

const {getAllQuotes, getQuote, CreateQuote, updateQuote, deleteQuote} = require("./controllers/quotesController");
const quotesRouter = require('./routes/quotesRoutes');

const port = 5050;


app.use(express.json( ));

//ROUTE HANDLER FUNCTIONS

// app.get("/api/v1/quotes", getAllQuotes);
// app.get("/api/v1/quotes/:id", getQuote);
// app.port("/api/v1/quotes", CreateQuote);
// app.patch('/api/v1/quotes/:id', updateQuote);
// app.delete('/api/v1/quotes/:id', deleteQuote);
// app.use("/api/v1/quotes")
//   .get(getAllQuotes)
//   .post(CreateQuote);

// app.use("api/v1/quotes/:id")
//   .get(getQuote)
//   .patch(updateQuote)
//   .delete(deleteQuote);

app.use("/api/v1/quotes", quotesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
