import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#292626',
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
String.prototype.Capitalize = function () {
  const replaceUnderlineToSpace = this.replaceAll('_', ' ');
  return (
    replaceUnderlineToSpace.charAt(0).toUpperCase() +
    replaceUnderlineToSpace.slice(1)
  );
};

const GenericTable = ({ data, Modal, filteredSearch, isAderido }) => {
  const classes = useStyles();

  const filteredData = () =>
    filteredSearch === ''
      ? data
      : data.filter((x) => {
          if (!isAderido) return x.codigo_aderido === filteredSearch;

          return x.codigo === filteredSearch;
        });

  return (
    <TableContainer component={Paper} style={{ borderRadius: '0 0 8px 8px' }}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((column, i) => (
              <StyledTableCell key={i} align={i === 0 ? 'left' : 'center'}>
                {column.Capitalize()}
              </StyledTableCell>
            ))}
            <StyledTableCell align='right'>Editar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData().map((row, i) => {
            const propNames = Object.keys(row);
            return (
              <TableRow key={i}>
                {propNames.map((prop, i) => {
                  return (
                    <StyledTableCell
                      key={prop}
                      align={i === 0 ? 'left' : 'center'}
                    >
                      {row[prop]}
                    </StyledTableCell>
                  );
                })}

                <StyledTableCell align='right' style={{ padding: '0px' }}>
                  <Modal data={row} />
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
