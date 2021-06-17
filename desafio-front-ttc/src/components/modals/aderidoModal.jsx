import React, { useState } from 'react';
import ClassificacaoSelect from '../selects/classificacaoSelect';
import { Edit } from '@material-ui/icons';
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

const AderidoModal = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [adheredModel, setAdheredModel] = useState({
    descricao: data?.descricao || '',
    classificacao: data?.classificacao || '',
    liberado: data?.liberado || '',
    carencia_do_falso_foco: data?.carencia_do_falso_foco || '',
    frequencia_pesquisa: data?.frequencia_pesquisa || '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAdheredModel({
      descricao: data?.descricao || '',
      classificacao: data?.classificacao || '',
      liberado: data?.liberado || '',
      carencia_do_falso_foco: data?.carencia_do_falso_foco || '',
      frequencia_pesquisa: data?.frequencia_pesquisa || '',
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
            <ClassificacaoSelect
              classifications={data?.classificacao || []}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Descrição'
              value={adheredModel.descricao}
              onChange={(e, _) => {
                setAdheredModel({ ...adheredModel, descricao: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Liberado'
              value={adheredModel.liberado}
              onChange={(e, _) => {
                setAdheredModel({ ...adheredModel, liberado: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Carência falso foco'
              value={adheredModel.carencia_do_falso_foco || ''}
              onChange={(e, _) => {
                setAdheredModel({
                  ...adheredModel,
                  carencia_do_falso_foco: e.target.value,
                });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Frequência pesquisa'
              value={adheredModel.frequencia_pesquisa || ''}
              onChange={(e, _) => {
                setAdheredModel({
                  ...adheredModel,
                  frequencia_pesquisa: e.target.value,
                });
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
                onClick={() => {
                  alert('Informações atualizadas');
                  handleClose();
                }}
                style={{ backgroundColor: '#ffc629' }}
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

export default AderidoModal;
