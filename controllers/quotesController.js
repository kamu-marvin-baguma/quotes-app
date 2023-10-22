
const fs = require("fs");
// const quotesRouter = require("../routes/quotesRoutes");
const quotes = JSON.parse(fs.readFileSync('./data/quotes.json'));

const getAllQuotes = (req, res) => {
    res.status(200).json({
      status: "success",
      // count:quotes.length,
      data:{
        quotes: quotes
      }
    });
  };
  
  
  const getQuote = (req, res) => {
    //console.log(req.params);
    //CONVERT ID TO NUMBER TYPE
    const id = req.params.id * 1;
    
    //FIND QUOTES BASED ON ID PARAMETER
    const quote = quotes.find(el => el.id === id);
    
    if(!quote) {
      return res.status(404).json({
        status: 'failed',
        message: "Quote with ID " + id + " does not exist"
      })
    }
    
    //SEND QUOTE IN THE RESPONSE
    res.status(200).json({
      status: 'success',
      data:{
        quote: quote
      }
    })
  }
  
  //CREATING QUOTE 
  const CreateQuote = (req, res) => {
    const newId = quotes[quotes.length - 1].id + 1;
    const newQuotes = Object.assign({id: newId}, req.body)
    
    quotes.push(newQuotes);
    
    fs.writeFile('./data/quotes',JSON.stringify(quotes), (err) => {
      res.status(201).json({
        status: "success",
        data:{
          quotes: newQuotes
        }
      })
    })
    
  };
  
  //UPDATING QUOTE
  const updateQuote = (req, res) => {
    const id = req.params.id * 1;
    const quoteToUpdate = quotes.find(el => el.id === id);
  
    if(!quoteToUpdate){
      return res.status(404).json({
        status: 'fail',
        message: 'No quote object with id ' + id+ ' exists',
      })
    }
    const quoteIndex = quotes.indexOf(quoteToUpdate);// e.g - id = 4, index = 3
  
    Object.assign(quoteToUpdate, req.body);
  
    quotes[quoteIndex] = quoteToUpdate;
    fs.writeFile('./data/quotes.json', JSON.stringify(quotes), (err) => {
      res.status(200).json({
        status: "success",
        data:{
          quote: quoteToUpdate
        }
      })
    })
  };
  
  //DELETING QUOTE
  const deleteQuote = (req, res) => {
    const id = req.params.id * 1;
    const quoteToDelete = quotes.find(el => el.id === id);
  
    if(!quoteToDelete){
      return res.status(404).json({
        status: 'fail',
        message: 'No quote object with id ' + id+ ' exists',
      })
    }
  
    const index = quotes.indexOf(quoteToDelete);
  
    quotes.splice(index, 1);
  
    fs.writeFile('./data/quotes.json', JSON.stringify(quotes), (err) => {
      res.status(204).json({
        status: "success",
        data:{
          quote: null
        }
      })
    })
  };
module.exports = {getAllQuotes, getQuote, CreateQuote, updateQuote, deleteQuote}  