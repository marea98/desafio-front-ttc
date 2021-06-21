import { makeStyles, Theme } from '@material-ui/core';

const useProfileInfoStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginRight: theme.spacing(1),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  menuItem: {
    width: theme.spacing(17),
  },
  menuList: {
    opacity: '1',
  },
}));

export { useProfileInfoStyles };
