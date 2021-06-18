import React, { useState } from 'react';
import { SuccessToast } from '../toasts/messageToast';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { useModalStyles } from './styles/modalStyles';

const ProdutoModal = ({ data, isOpen, close }) => {
  const classes = useModalStyles();

  const [product, setProduct] = useState({
    code: data?.codigo || '',
    adhered_code: data?.codigo_aderido || '',
    name: data?.nome || '',
    prefix: data?.prefixo || '',
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
              value={product?.code}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              disabled
              label='Código aderido'
              value={product?.adhered_code}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Nome '
              value={product.name}
              onChange={(e, _) => {
                setProduct({ ...product, name: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Prefixo'
              value={product.prefix}
              onChange={(e, _) => {
                setProduct({ ...product, prefix: e.target.value });
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
