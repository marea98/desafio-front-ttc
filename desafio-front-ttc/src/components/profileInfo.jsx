import React from 'react';
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  Grid,
  Avatar,
  Typography,
  makeStyles,
  MenuList,
} from '@material-ui/core';
import imageProfile from '../assets/images/ednaldo.jpg';

const useStyles = makeStyles((theme) => ({
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

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <Grid
        container
        ref={anchorRef}
        onClick={handleToggle}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        direction='row'
        justify='flex-end'
        alignItems='center'
        style={{ cursor: 'pointer' }}
      >
        <Typography
          component='span'
          variant='overline'
          style={{ marginRight: '10px' }}
        >
          Ednaldo Pereira
        </Typography>
        <Avatar className={classes.large} src={imageProfile} />
      </Grid>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement='bottom-end'
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.menuList}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={handleClose}
                    onMouseEnter={(e) =>
                      (e.target.style.background = '#D3D3D3')
                    }
                    onMouseLeave={(e) => (e.target.style.background = '#fff')}
                    className={classes.menuItem}
                  >
                    Ver Perfil
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    onMouseEnter={(e) =>
                      (e.target.style.background = '#D3D3D3')
                    }
                    onMouseLeave={(e) => (e.target.style.background = '#fff')}
                    className={classes.menuItem}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
