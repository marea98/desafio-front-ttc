import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ffc629",
    color: theme.palette.common.black,
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

            {Object.keys(data[0]).map((column, i) => <StyledTableCell key={i} align="left">{column.Capitalize()}</StyledTableCell>)}

          </TableRow>
        </TableHead>
        <TableBody>

          {data.map((row, i) => {
            const propNames = Object.keys(row);
            return (
            <TableRow key={i}>
            
            {propNames.map((prop, i) => {
              return(
              <StyledTableCell key={prop} align="left">{row[prop]}</StyledTableCell>
            )})}

            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GenericTable;