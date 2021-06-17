import React, { useState } from 'react';
import ClassificacaoSelect from '../selects/classificacaoSelect';
import { SuccessToast } from '../toasts/successfullToast';
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

const AderidoModal = ({ data, isCreate, isOpen, close }) => {
  const classes = useStyles();

  const [adhered, setAdhered] = useState({
    codigo: data?.codigo || '',
    nome: data?.nome || '',
    descricao: data?.descricao || '',
    classificacao: data?.classificacao || [],
    liberado: data?.liberado || '',
    carencia_do_falso_foco: data?.carencia_do_falso_foco || '',
    frequencia_pesquisa: data?.frequencia_pesquisa || '',
  });

  return (
    <div>
      <Dialog open={isOpen} onClose={close} aria-labelledby='form-dialog-title'>
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
            {!isCreate && (
              <TextField
                variant='outlined'
                disabled
                label='Código'
                value={adhered.codigo}
                className={classes.input}
              />
            )}

            <ClassificacaoSelect
              classifications={adhered.classificacao}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Nome'
              value={adhered.nome}
              onChange={(e, _) => {
                setAdhered({ ...adhered, nome: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Descrição'
              value={adhered.descricao}
              onChange={(e, _) => {
                setAdhered({ ...adhered, descricao: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Liberado'
              value={adhered.liberado}
              onChange={(e, _) => {
                setAdhered({ ...adhered, liberado: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Carência falso foco'
              value={adhered.carencia_do_falso_foco}
              onChange={(e, _) => {
                setAdhered({
                  ...adhered,
                  carencia_do_falso_foco: e.target.value,
                });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Frequência pesquisa'
              value={adhered.frequencia_pesquisa}
              onChange={(e, _) => {
                setAdhered({
                  ...adhered,
                  frequencia_pesquisa: e.target.value,
                });
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
                onClick={() => {
                  SuccessToast(
                    isCreate ? 'Criado com sucesso!' : 'Atualizado com sucesso!'
                  );
                  close();
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
