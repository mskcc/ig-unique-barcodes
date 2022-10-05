import React, { useState, useEffect } from 'react';
import { getBarcode } from './services/barcode';
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

  return (
    <Paper className={classes.container}>
      <div class="dropdown">
      <button onclick="myFunction()" class="dropbtn">Choose Plate Type</button>
        <div id="myDropdown" class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
    </div>
    </Paper>
  );
}

export default HomePage;
