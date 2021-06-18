import React, { useState } from 'react';
import { SuccessToast } from '../toasts/messageToast';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
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

const ProdutoModal = ({ data, isOpen, close }) => {
  const classes = useStyles();

  const [product, setProduct] = useState({
    codigo: data?.codigo || '',
    codigo_aderido: data?.codigo_aderido || '',
    nome: data?.nome || '',
    prefixo: data?.prefixo || '',
  });

  return (
    <div>
      <Dialog open={isOpen} onClose={close} aria-labelledby='form-dialog-title'>
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
              value={product?.codigo}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              disabled
              label='Código aderido'
              value={product?.codigo_aderido}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Nome '
              value={product.nome}
              onChange={(e, _) => {
                setProduct({ ...product, nome: e.target.value });
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
                onClick={close}
                className={classes.ButtonsAction}
              >
                Voltar
              </Button>
              <Button
                variant='contained'
                style={{ backgroundColor: '#ffc629' }}
                onClick={() => {
                  SuccessToast('Atualizado com sucesso!');
                  close();
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

export default ProdutoModal;
