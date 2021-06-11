import React, {useState} from 'react';
import PropTypes from 'prop-types';
import GenericTable from '../components/tableComponent';
import ClassificationComponent from '../components/classificationComponent';
import SearchIcon from '@material-ui/icons/Search';
import classificacoesData from '../data/classificacoes';
import aderidosData from '../data/aderidos';
import produtosData from '../data/produtos';
import excecoesData from '../data/excecoes';
import AderidoModal from '../components/modals/aderidoModal';
import { styled } from '@material-ui/core/styles';
import ProdutoModal from '../components/modals/produtoModal';
import alphabet from '../utils/alphabet'
import ExcecoesModal from '../components/modals/excecoesModal';
import {
  Box,
  Grid,
  TextField,
  Tabs,
  Tab,
  Typography,
  AppBar,
  makeStyles,
  Button,
  Avatar,
  InputAdornment
} from '@material-ui/core';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  buttonsDown: {
    margin: '.5rem',
    backgroundColor: '#ffc629' 
  },
  header: {
    backgroundColor: '#ffc629',
    padding: '0.8rem',
    textAlign: 'start',
    justifyContent: 'space-between',
    display: 'flex',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SimpleTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [classificacoes, setClassificacoes] = useState(classificacoesData);

  const removeClassificacao = (index) => {
    let classificacoesRemoved = classificacoes.filter((x, i) => i !== index)
    setClassificacoes(classificacoesRemoved);
  }
    
   const addClassificacao = () => {
    let classificacoesAdd = [...classificacoes];
    classificacoesAdd.push({sigla: alphabet[classificacoes.length], nome: ''});
    setClassificacoes(classificacoesAdd);
  } 

  const [filteredSearch,setFilteredSearch] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid item xs={12} className={classes.header}>
        <Typography component="span" variant="h4">
          Configuração TTC aderidos
        </Typography>
        <Grid
          container
          justify="flex-end"
          direction="row"
          alignItems="center"
          style={{ maxWidth: '300px', marginRight: '5px' }}
        >
          <Typography
            component="span"
            variant="overline"
            style={{ marginRight: '10px', cursor: 'pointer' }}
          >
            Ednaldo Pereira
          </Typography>
          <Avatar style={{ cursor: 'pointer' }} className={classes.large} />
        </Grid>
      </Grid>
      <Grid container style={{ height: '2rem' }}>
        <Grid
          container
          direction="column"
          style={{ padding: '2rem 10rem 0 10rem' }}
        >
          <Grid
            item
            justify="flex-end"
            container
            style={{ marginBottom: '.5rem' }}
          >
            <TextField
              value={filteredSearch}
              onChange={(e) => setFilteredSearch(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Buscar aderido"
              style={{ backgroundColor: '#ffff' }}
              InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment> )}}
            />
          </Grid>
          <Grid item container justify="center">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  style={{ backgroundColor: '#ffc629', color: '#000' }}
                  indicatorColor="secondary"
                >
                  <Tab label="Aderidos" {...a11yProps(0)} />
                  <Tab label="Produtos" {...a11yProps(1)} />
                  <Tab label="Exceções" {...a11yProps(2)} />
                  <Tab label="Classificações" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <GenericTable data={aderidosData} Modal={AderidoModal} filteredSearch={filteredSearch} isAderido/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <GenericTable data={produtosData} Modal={ProdutoModal} filteredSearch={filteredSearch}/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <GenericTable data={excecoesData} Modal={ExcecoesModal} filteredSearch={filteredSearch}/>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ClassificationComponent classificacoes={classificacoes} removeClassificacao={removeClassificacao}/>
              </TabPanel>
            </div>
          </Grid>
          <Grid
            container
            item
            justify="flex-end"
            style={{ marginTop: '.5rem' }}
          >
            {
              value === 3 &&
            <Button
              variant="contained"
              disabled={classificacoes.length >= 26}
              onClick={() => addClassificacao('Adicionar')}
              className={classes.buttonsDown}
            >
              Adicionar
            </Button>
            }
            <Button
              variant="contained"
              onClick={() => alert('Exportar')}
              className={classes.buttonsDown}
            >
              Exportar
            </Button>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" className={classes.buttonsDown} component="span">
                Importar
              </Button>
            </label>
            <Button
              variant="contained"
              onClick={() => alert('Enviar')}
              className={classes.buttonsDown}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SimpleTabs;

