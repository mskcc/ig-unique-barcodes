import React, { useState , useMemo} from 'react';
import { getBarcode } from './services/barcode';
import { makeStyles, Button, Paper } from '@material-ui/core';
import { useTable } from 'react-table';
import { COLUMNS } from '../components.columns'

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
  const [plateType, setPlateType] = useState('');
  const [numOfBarcodes, setNumOfBarcodes] = useState(0);
  const [errorState, setErrorState] = useState('');

  const validate = () => {
    if (!numOfBarcodes || isNaN(numOfBarcodes)) {
      setErrorState('Please enter a valid number');
    } else if (numOfBarcodes < 1) {
      setErrorState('Please enter a number greater than zero');
    } else {
      setErrorState('');
    }
  }

  const getPlateBarcode = () => {
    validate();
    if (errorState === '') {
      getBarcode(plateType, numOfBarcodes);
    }
  }
  const columns = useMemo(() => COLUMNS, [])
  //const data = useMemo(() => MOCK_DATA, [])
  const tableInstance = useTable({
    columns,
    //data
  })
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <Paper className={classes.container}>
      <div className="dropdown">
      <b>Choose Plate Type:</b>
        <select id="plateTypes" onChange={(event) => setPlateType(event.target.value)}>
        <option value=" "> ---Plate type--- </option>  
        <option value="MSK_DNA">MSK_DNA</option>
        <option value="MSK_RNA">MSK_RNA</option>
        <option value="MSK_cDNA">MSK_cDNA</option>
        <option value="MSK_LIB">MSK_LIB</option>
        <option value="MSK_uLIB">MSK_uLIB</option>
        <option value="CRISPR">CRISPR</option>
        <option value="AA">AA</option>
        <option value="MSK_CAP">MSK_CAP</option>
        </select>
        <p>Your selected plate type is: <b>{plateType}</b></p>
        <p>Enter the number of barcodes:</p>   
        <input type = "text" id = "count" size = "5" onChange={(event) => setNumOfBarcodes(event.target.value)}></input>
        <p className='error'>{errorState}</p>
    </div>
    <div className={classes.Button}>
      {/* <Button id='plateTypes' onClick={() => getPlateType()} color='primary' variant='contained' type='submit'>Submit Plate Type Selection</Button> */}
      {/* <Button id='numOfBarcodes' color='secondary' variant='contained' type='submit'>Submit Count of Barcodes </Button> */}
      <Button id='generate' onClick={() => getPlateBarcode()} color='primary' variant='contained'>Generate </Button>
    </div>
    <table {...getTableProps()}>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}> 
            {
            
            }
        <td></td>
      </tr>
      )
          })}
      </tbody>
      </table>
    </Paper>
  );
}

export default HomePage;
