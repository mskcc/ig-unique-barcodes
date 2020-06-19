const QuoteModel = require('./QuoteModel');

const quotes = [
  {
    quote: 'Science and everyday life cannot and should not be separated.',
    author: 'Rosalind Franklin',
    id: 0
  },
  {
    quote: 'Only two things are infinite, the universe and human stupidity, and I\'m not sure about the former.',
    author: 'Albert Einstein',
    id: 1
  },
  {
    quote: 'Science is the process that takes us from confusion to understanding...',
    author: 'Brian Greene',
    id: 2
  },
  {
    quote: 'There\'s a fine line between genius and insanity. I have erased this line.',
    author: 'Dilbert',
    id: 3
  },
  {
    quote: 'The more you find out about the world, the more opportunities there are to laugh at it.',
    author: 'Bill Nye',
    id: 4
  },
  {
    quote: 'The good thing about science is that it\'s true whether or not you believe in it.',
    author: 'Neil Tyson',
    id: 5
  },
  {
    quote: 'You take criticism as an opportunity to grow',
    author: 'Panda express fortune cookie',
    id: 6
  },
];
exports.getNumQuotes = function() {
  return quotes.length;
};

exports.populateDB = function() {
  let quoteModel;
  for(let quote of quotes){
    quoteModel = new QuoteModel(quote);
    quoteModel.save(function (err) {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
};
