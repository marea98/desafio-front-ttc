import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GenericTable from '../components/tableComponent';
import ClassificationComponent from '../components/classificationComponent';
import SearchIcon from '@material-ui/icons/Search';
import classificacoesData from '../data/classificacoes';
import aderidosData from '../data/aderidos';
import produtosData from '../data/produtos';
import excecoesData from '../data/excecoes';
import AderidoModal from '../components/modals/aderidoModal';
import ProfileInfo from '../components/profileInfo';
import { styled } from '@material-ui/core/styles';
import ProdutoModal from '../components/modals/produtoModal';
import alphabet from '../utils/alphabet';
import ExcecoesModal from '../components/modals/excecoesModal';
import { FailToast, SuccessToast } from '../components/toasts/successfullToast';
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
  InputAdornment,
} from '@material-ui/core';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component='span'>{children}</Typography>
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
    backgroundColor: '#ffc629',
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

const Home = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = useState(false);
  const [classifications, setclassifications] = useState(classificacoesData);

  const removeClassification = (index) => {
    let removedClassifications = classifications.filter((x, i) => i !== index);
    setclassifications(removedClassifications);
  };

  const addClassificacao = () => {
    let classificacoesAdd = [...classifications];
    classificacoesAdd.push({
      sigla: alphabet[classifications.length],
      nome: '',
    });
    setclassifications(classificacoesAdd);
  };

  const [filteredSearch, setFilteredSearch] = useState('');

  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCreateButton = () => {
    if (currentTab === 0) {
      return setOpen(true);
    }

    return addClassificacao();
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (selectedFile) {
      const fileType = selectedFile['type'];
      const acceptFiles = ['image/jpg', 'image/jpeg', 'image/png'];
      const maxFileSize = 512000;

      if (selectedFile.size > maxFileSize) {
        FailToast('O arquivo não deve ultrapassar 500kb');
      } else if (!acceptFiles.includes(fileType)) {
        FailToast('O arquivo deve ser .png, .jpeg, ou .jpg');
      } else {
        SuccessToast('Importado com sucesso!');
      }
    }
  }, [selectedFile]);

  return (
    <>
      <Grid item xs={12} className={classes.header}>
        <Typography component='span' variant='h4'>
          Configuração TTC aderidos
        </Typography>
        <Grid
          container
          justify='flex-end'
          direction='row'
          alignItems='center'
          style={{ maxWidth: '300px' }}
        >
          <ProfileInfo />
        </Grid>
      </Grid>
      <Grid container justify='center' style={{ marginTop: '2rem' }}>
        <Grid item container xs={10} direction='column'>
          <Grid
            item
            justify='flex-end'
            container
            style={{ marginBottom: '.5rem' }}
          >
            <TextField
              value={filteredSearch}
              onChange={(e) => setFilteredSearch(e.target.value)}
              variant='outlined'
              size='small'
              placeholder='Buscar aderido'
              style={{ backgroundColor: '#ffff' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item container justify='center'>
            <div className={classes.root}>
              <AppBar position='static'>
                <Tabs
                  value={currentTab}
                  onChange={handleChange}
                  aria-label='simple tabs example'
                  style={{ backgroundColor: '#ffc629', color: '#000' }}
                  indicatorColor='secondary'
                >
                  <Tab label='Aderidos' {...a11yProps(0)} />
                  <Tab label='Produtos' {...a11yProps(1)} />
                  <Tab label='Exceções' {...a11yProps(2)} />
                  <Tab label='Classificações' {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <TabPanel value={currentTab} index={0}>
                <GenericTable
                  data={aderidosData}
                  Modal={AderidoModal}
                  filteredSearch={filteredSearch}
                  isAderido
                />
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <GenericTable
                  data={produtosData}
                  Modal={ProdutoModal}
                  filteredSearch={filteredSearch}
                />
              </TabPanel>
              <TabPanel value={currentTab} index={2}>
                <GenericTable
                  data={excecoesData}
                  Modal={ExcecoesModal}
                  filteredSearch={filteredSearch}
                />
              </TabPanel>
              <TabPanel value={currentTab} index={3}>
                <ClassificationComponent
                  classifications={classifications}
                  removeClassification={removeClassification}
                />
              </TabPanel>
            </div>
          </Grid>
          <Grid
            container
            item
            justify='flex-end'
            style={{ marginTop: '.5rem' }}
          >
            {(currentTab === 0) | (currentTab === 3) ? (
              <Button
                variant='contained'
                disabled={currentTab === 3 && classifications.length >= 26}
                onClick={() => handleCreateButton()}
                className={classes.buttonsDown}
              >
                {currentTab === 0
                  ? 'Adicionar Aderido'
                  : 'Adicionar Classificação'}
              </Button>
            ) : null}
            <Button
              variant='contained'
              onClick={() => alert('Exportar')}
              className={classes.buttonsDown}
            >
              Exportar
            </Button>
            <label htmlFor='contained-button-file'>
              <Input
                accept='.jpg,.png,.jpeg'
                id='contained-button-file'
                multiple
                type='file'
                onChange={onSelectFile}
              />
              <Button
                variant='contained'
                className={classes.buttonsDown}
                component='span'
              >
                Importar
              </Button>
            </label>
            <Button
              variant='contained'
              onClick={() => FailToast('Falha ao enviar, sem conexão :c')}
              className={classes.buttonsDown}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <AderidoModal isCreate isOpen={open} close={() => setOpen(false)} />
    </>
  );
};

export default Home;
