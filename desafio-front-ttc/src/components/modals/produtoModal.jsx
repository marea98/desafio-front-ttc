import React, { useState } from 'react';
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

const ProdutoModal = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    nomeProduto: data.nome_do_produto,
    markupMinimo: data.markup_minimo,
    markupMaximo: data.markup_maximo,
    prefixo: data.prefixo,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProduct({
      nomeProduto: data.nome_do_produto,
      markupMinimo: data.markup_minimo,
      markupMaximo: data.markup_maximo,
      prefixo: data.prefixo,
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
            Produto
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
            <TextField
              variant='outlined'
              label='Nome do produto'
              value={product.nomeProduto}
              onChange={(e, _) => {
                setProduct({ ...product, nomeProduto: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Markup minimo'
              value={product.markupMinimo}
              onChange={(e, _) => {
                setProduct({ ...product, markupMinimo: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Markup maximo'
              value={product.markupMaximo}
              onChange={(e, _) => {
                setProduct({ ...product, markupMaximo: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Prefixo'
              value={product.prefixo}
              onChange={(e, _) => {
                setProduct({ ...product, prefixo: e.target.value });
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
                className={classes.ButtonsAction}
                onClick={() => {
                  alert('Informações atualizadas');
                  handleClose();
                }}
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

export default ProdutoModal;
