import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Visibility } from '@material-ui/icons';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table, 
  IconButton
} from '@material-ui/core'



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#292626",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

// eslint-disable-next-line no-extend-native
String.prototype.Capitalize = function() {
  const replaceUnderlineToSpace = this.replaceAll("_", " ")
  return replaceUnderlineToSpace.charAt(0).toUpperCase() + replaceUnderlineToSpace.slice(1);
}

const GenericTable = ({data}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((column, i) => <StyledTableCell key={i} align={i === 0 ? "left" : "center"}>{column.Capitalize()}</StyledTableCell>)}
            <StyledTableCell align="right">Visualizar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data.map((row, i) => {
            const propNames = Object.keys(row);
            return (
            <TableRow key={i}>
            
                {propNames.map((prop, i) => {
                  return(
                  <StyledTableCell key={prop} align={i === 0 ? "left" : "center"}>{row[prop]}</StyledTableCell>
                )})}
    
                <StyledTableCell align="right" style={{padding: "0px"}}>
                  <IconButton>
                    <Visibility size="small"/>
                  </IconButton>
                </StyledTableCell>

            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GenericTable;