import React, { useState } from 'react';
import ClassificacaoSelect from '../selects/classificacaoSelect';
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

const ExcecoesModal = ({ data, isOpen, close }) => {
  const classes = useStyles();

  const [exception, setException] = useState({
    codigo: data?.codigo || '',
    codigo_aderido: data?.codigo_aderido || '',
    nome_unidade: data?.nome_unidade || '',
    prefixo: data?.prefixo || '',
    classificacao: data?.classificacao || '',
  });

  return (
    <div>
      <Dialog open={isOpen} onClose={close} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          <Typography component='span' variant='h5'>
            Exceções
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
              value={exception?.codigo}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              disabled
              label='Código aderido'
              value={exception?.codigo_aderido}
              className={classes.input}
            />
            <ClassificacaoSelect
              classifications={exception?.classificacao}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Nome unidade'
              value={exception.nome_unidade}
              onChange={(e, _) => {
                setException({ ...exception, nome_unidade: e.target.value });
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

export default ExcecoesModal;
