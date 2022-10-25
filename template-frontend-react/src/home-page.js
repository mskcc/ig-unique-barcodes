import React, { useState, useEffect } from 'react';
import { getBarcode } from './services/barcode';
import { makeStyles, Button, Paper, Typography } from '@material-ui/core';

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

// export.getNumberOfRequestedBarcodes = function() {
//   var x = document.getElementById("count").value;
//   document.getElementById("count").innerHTML = x;
//   return x;
// };

async function getPlateType () {
  var myType = document.getElementById("plateTypes");
  document.getElementById("selection").value = myType.options[myType.selectedIndex].text;
}

async function getPlateBarcode () {
  getBarcode()
}
function HomePage() {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <div className="dropdown">
      <b>Choose Plate Type:</b>
        <select id="plateTypes" onChange={() => getPlateType()}>
        <option> ---Plate type--- </option>  
        <option value="MSK_DNA">MSK_DNA</option>
        <option value="MSK_RNA">MSK_RNA</option>
        <option value="MSK_cDNA">MSK_cDNA</option>
        <option value="MSK_LIB">MSK_LIB</option>
        <option value="MSK_uLIB">MSK_uLIB</option>
        <option value="CRISPR">CRISPR</option>
        <option value="AA">AA</option>
        <option value="MSK_CAP">MSK_CAP</option>
        </select>
        <p>Your selected plate type is:    
        <input type = "text" id = "selection" size = "15"></input>
        </p>
        <p>Enter the number of barcodes:</p>
        <form method="POST" action="/getNumOfBarcodes">    
        <input type = "text" id = "count" size = "5"></input>
        </form>
        
    </div>
    <div className={classes.Button}>
      {/* <Button id='plateTypes' onClick={() => getPlateType()} color='primary' variant='contained' type='submit'>Submit Plate Type Selection</Button> */}
      {/* <Button id='numOfBarcodes' color='secondary' variant='contained' type='submit'>Submit Count of Barcodes </Button> */}
      <Button id='generate' onClick={() => getPlateBarcode()} color='primary' variant='contained' type='submit'>Generate </Button>
    </div>
    </Paper>
  );
}

export default HomePage;
