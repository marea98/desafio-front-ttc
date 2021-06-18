import { makeStyles } from '@material-ui/core';

const useHomeStyles = makeStyles((theme) => ({
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

export { useHomeStyles };
