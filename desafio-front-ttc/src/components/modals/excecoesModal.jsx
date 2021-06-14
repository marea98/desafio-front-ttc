import React, { useState } from 'react';
import { Edit } from '@material-ui/icons';
import ClassificacaoSelect from '../classificacaoSelect';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '.5rem',
    width: '30rem',
  },
  ButtonsAction: {
    margin: '.5rem',
  },
}));

const ExcecoesModal = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [exception, setException] = useState({
    nomeUnidade: data.nome_unidade,
    prefixo: data.prefixo,
    classificacao: data.classificacao,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setException({
      nomeUnidade: data.nome_unidade,
      prefixo: data.prefixo,
      classificacao: data.classificacao,
    });
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Edit size='small' />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          <Typography component='span' variant='h5'>
            Aderidos
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems='flex-start'
            justify='flex-start'
            direction='column'
            style={{ padding: '0 .5rem .5rem .5rem' }}
          >
            <TextField
              variant='outlined'
              disabled
              label='Código'
              value={data?.codigo || ''}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              disabled
              label='Código aderido'
              value={data?.codigo_aderido || ''}
              className={classes.input}
            />
            <ClassificacaoSelect
              value={data?.classificacao || ''}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Nome unidade'
              value={exception.nomeUnidade}
              onChange={(e, _) => {
                setException({ ...exception, nomeUnidade: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Prefixo'
              value={exception.prefixo}
              onChange={(e, _) => {
                setException({ ...exception, prefixo: e.target.value });
              }}
              className={classes.input}
            />
            <Grid container item justify='flex-end'>
              <Button
                variant='contained'
                onClick={handleClose}
                className={classes.ButtonsAction}
              >
                Voltar
              </Button>
              <Button
                variant='contained'
                style={{ backgroundColor: '#ffc629' }}
                onClick={() => {
                  alert('Informações atualizadas');
                  handleClose();
                }}
                className={classes.ButtonsAction}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExcecoesModal;
