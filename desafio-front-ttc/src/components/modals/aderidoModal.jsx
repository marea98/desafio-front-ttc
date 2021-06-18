import React, { useState } from 'react';
import ClassificacaoSelect from '../selects/classificacaoSelect';
import { SuccessToast } from '../toasts/messageToast';
import moment from 'moment';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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

  console.log();

  const [adhered, setAdhered] = useState({
    codigo: data?.codigo || '',
    prefixo: data?.prefixo || '',
    descricao: data?.descricao || '',
    classificacao: data?.classificacao || [],
    ativo: data?.ativo || '',
    carencia_do_falso_foco: data?.carencia_do_falso_foco || '',
    frequencia_pesquisa: data?.frequencia_pesquisa || '',
    vigencia_inicial: moment(data?.vigencia_inicial, 'DD/MM/YYYY').format(
      'yyyy-MM-DD'
    ),
  });

  const handleClose = () => {
    setAdhered({
      codigo: '',
      prefixo: '',
      descricao: '',
      classificacao: [],
      ativo: '',
      carencia_do_falso_foco: '',
      frequencia_pesquisa: '',
    });

    close();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
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
              label='Prefixo'
              value={adhered.prefixo}
              onChange={(e, _) => {
                setAdhered({ ...adhered, prefixo: e.target.value });
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
              label='Vingência inicial'
              type='date'
              disabled
              defaultValue={
                isCreate
                  ? moment().format('YYYY-MM-DD').toString()
                  : adhered.vigencia_inicial
              }
              onChange={(e, _) => {
                setAdhered({ ...adhered, vigencia_inicial: e.target.value });
              }}
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Carência falso foco'
              className={classes.input}
              value={adhered.carencia_do_falso_foco}
              onChange={(e, _) => {
                setAdhered({
                  ...adhered,
                  carencia_do_falso_foco: e.target.value,
                });
              }}
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
            <FormControl variant='outlined' className={classes.input}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Ativo
              </InputLabel>
              <Select
                label='Ativo'
                id='demo-simple-select-outlined'
                value={adhered.ativo}
                onChange={(e, _) => {
                  setAdhered({ ...adhered, ativo: e.target.value });
                }}
              >
                <MenuItem value={'Sim'}>Sim</MenuItem>
                <MenuItem value={'Não'}>Não</MenuItem>
              </Select>
            </FormControl>
            <Grid container item justify='flex-end'>
              <Button
                variant='contained'
                onClick={() => handleClose()}
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
