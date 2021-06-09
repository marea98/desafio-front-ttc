import React from 'react';
import PropTypes from 'prop-types';
import GenericTable from '../components/tableComponent';
import ClassificationComponent from '../components/classificationComponent';
import SearchIcon from '@material-ui/icons/Search';
import aderidosData from "../data/aderidos";
import produtosData from "../data/produtos";
import excecoesData from "../data/excecoes";
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
  Avatar
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    height: "100%",
  },
  header: {
    backgroundColor: "#ffc629",
    padding: "0.8rem",
    textAlign: "start",
    justifyContent: "space-between",
    display: "flex"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SimpleTabs = ()  => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
        <Grid item xs={12} className={classes.header}>
            <Typography component="span" variant="h4" >Configuração TTC aderidos</Typography>
            <Grid container justify="flex-end" direction="row" alignItems="center" style={{maxWidth:"300px", marginRight: "5px"}}>
                <Typography component="span" variant="overline" style={{marginRight: "10px", cursor: "pointer"}}>Ednaldo Pereira</Typography>
                <Avatar style={{cursor: "pointer"}} className={classes.large} />
            </Grid>
        </Grid> 
        <Grid container style={{height: "2rem"}}>
            <Grid container direction='column' style={{padding: "5rem 10rem 0 10rem"}}>
                <Grid item justify='flex-start' container style={{marginBottom: "2rem"}} >
                    <TextField variant='outlined' style={{backgroundColor: "#ffff"}}/>
                    <Button
                        variant="contained"
                        className={classes.button}
                        endIcon={<SearchIcon />}
                        style={{marginLeft:"1rem", height: "100%", padding: "15px 15px 15px 15px" }}
                        >
                        Buscar
                    </Button>
                </Grid>
                <Grid item container justify='center' >
                    <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Aderidos" {...a11yProps(0)} />
                        <Tab label="Produtos" {...a11yProps(1)} />
                        <Tab label="Exceções" {...a11yProps(2)} />
                        <Tab label="Classificações" {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <GenericTable data={aderidosData}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <GenericTable data={produtosData}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <GenericTable data={excecoesData}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <ClassificationComponent />
                    </TabPanel>
                    </div>
                </Grid>
            </Grid>           
      </Grid>
    </>            
  );
}

export default SimpleTabs;