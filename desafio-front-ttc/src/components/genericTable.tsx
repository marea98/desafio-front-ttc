import React, { useState, useEffect } from 'react';
import {
  withStyles,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Tooltip,
  TablePagination,
  useTheme,
  IconButton,
} from '@material-ui/core';
import {
  FirstPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  LastPage,
  Edit,
} from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  useTooltipTheme,
  useTableStyles,
  usePaginationStyles,
} from './styles/tableStyles';
import {IClassification} from '../data/interfaces/IClassification';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#292626',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// eslint-disable-next-line no-extend-native
const Capitalize = (header: any) : string => {
  const replaceUnderlineToSpace = header.replaceAll('_', ' ');
  return (
    replaceUnderlineToSpace.charAt(0).toUpperCase() +
    replaceUnderlineToSpace.slice(1)
  );
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

interface IGenericTable {
  data: any[],
  Modal: React.ElementType,
  filteredSearch: string,
  isAdhered?: boolean
}

const GenericTable : React.FC<IGenericTable> = ({ data, Modal, filteredSearch, isAdhered }) => {
  const tableClasses = useTableStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<any>();

  const handleOpenModal = (data: any) => {
    setModel(data);
    setOpen(true);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const classesPagination = usePaginationStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classesPagination.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='first page'
        >
          {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label='previous page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='next page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='last page'
        >
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
        </IconButton>
      </div>
    );
  }

  useEffect(() => {
    setPage(0);
  }, [filteredSearch]);

  const filteredData = () =>
    filteredSearch === ''
      ? data
      : data.filter((x: any) => {
          if (!isAdhered) return x.codigo_aderido === filteredSearch;
          return x.codigo === filteredSearch;
        });
  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        style={{ borderRadius: '0', height: '35em' }}
      >
        <Table
          className={tableClasses.table}
          aria-label='customized table'
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((column, i) => (
                <StyledTableCell key={i} align={i === 0 ? 'left' : 'center'}>
                  {Capitalize(column)}
                </StyledTableCell>
              ))}
              <StyledTableCell align='right'>Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: 'auto' }}>
            {filteredData()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                const propNames = Object.keys(row);
                return (
                  <TableRow key={i}>
                    {propNames.map((prop, i) => {
                      return prop === 'classificacao' ? (
                        <MuiThemeProvider key={i} theme={useTooltipTheme}>
                          <Tooltip
                            key={i}
                            arrow
                            title={row[prop].map(
                              (classification: IClassification, index: number) =>
                                `${classification.nome}${
                                  index === row[prop].length - 1 ? '' : ','
                                } 
                          `
                            )}
                          >
                            <StyledTableCell
                              key={prop}
                              align={i === 0 ? 'left' : 'center'}
                            >
                              {row[prop].map(
                                (classification : IClassification, index: number) =>
                                  `${classification.sigla}${
                                    index === row[prop].length - 1 ? '' : ','
                                  }`
                              )}
                            </StyledTableCell>
                          </Tooltip>
                        </MuiThemeProvider>
                      ) : (
                        <StyledTableCell
                          key={prop}
                          align={i === 0 ? 'left' : 'center'}
                        >
                          {row[prop]}
                        </StyledTableCell>
                      );
                    })}

                    <StyledTableCell align='right' style={{ padding: '0px' }}>
                      <IconButton onClick={() => handleOpenModal(row)}>
                        <Edit fontSize='small'/>
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component='div'
        count={filteredData().length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage='Linhas por página'
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      {open && (
        <Modal data={model} isOpen={open} close={() => setOpen(false)} />
      )}
    </React.Fragment>
  );
};

export default GenericTable;
