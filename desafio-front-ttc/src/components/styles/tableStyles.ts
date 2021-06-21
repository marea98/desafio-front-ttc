import { makeStyles, Theme } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const useTableStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const useTooltipTheme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1em',
      },
    },
  },
});

const usePaginationStyles = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export { useTableStyles, useTooltipTheme, usePaginationStyles };
