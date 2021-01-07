import React, { useState, useEffect } from 'react';
import { getQOD, getQuote } from './services/quote';
import { makeStyles, Button, Paper, Typography } from '@material-ui/core';

import dna from './assets/dna.png';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'min-content',
    padding: theme.spacing(4),
    width: '70vw',
    margin: '10em auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '3em',
  },

  quote: { marginBottom: theme.spacing(3) },

  loadingIcon: {
    height: '25px',
    width: '25px',
    animation: '$rotate 2s linear infinite',
    transformOrigin: 'center center',
    marginLeft: '20px',
  },
  
  '@keyframes rotate': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

function HomePage() {
  const classes = useStyles();

  const [quoteData, setQuoteData] = useState({
    quote: 'Science and everyday life cannot and should not be separated.',
    author: 'Rosalind Franklin',
  });
  const [nextQuote, setNextQuote] = useState({});

  const getNewQuote = (isRandom) => {
    if (isRandom) {
      // Update w/ next quote, if data wasn't returned
      setQuoteData(nextQuote || quoteData);
      getNextQuote();
    } else {
      getQOD().then((newQuoteData) => {
        // Add new quote, or use old quote, if data wasn't returned
        setQuoteData(newQuoteData || quoteData);
      });
    }
  };

  async function getNextQuote() {
    getQuote().then(setNextQuote);
  }

  useEffect(() => {
    // Get Quote of Day first
    getNextQuote(false);
  }, []);

  return (
    <Paper className={classes.container}>
      <div className={classes.quote}>
        <Typography variant='h2'>"{quoteData.quote || ''}"</Typography>
        <Typography variant='h5' align='right'>
          – {quoteData['author'] || ''}
          <img alt='dna' className={classes.loadingIcon} src={dna} />
        </Typography>
      </div>
      <div className={classes.buttons}>
        <Button id='newQuote' onClick={() => getNewQuote(false)} color='primary' variant='contained' type='submit'>
          Quote of Day
        </Button>
        <Button id='randomQuote' onClick={() => getNewQuote(true)} color='secondary' variant='contained' type='submit'>
          Random Quote
        </Button>
      </div>
    </Paper>
  );
}

export default HomePage;
