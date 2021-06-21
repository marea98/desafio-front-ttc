import React, { useState } from 'react';
import ClassificationSelect from '../selects/classificationSelect';
import { SuccessToast } from '../toasts/messageToast';
import moment from 'moment';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { useModalStyles } from './styles/modalStyles';
import { IAdhered } from '../../data/interfaces/IAdhered';

interface IAdheredModal {
  data?: IAdhered,
  isCreate: boolean,
  isOpen: boolean,
  close(): void 
}

const AdheredModal : React.FunctionComponent<IAdheredModal> = ({ data, isCreate, isOpen, close }) => {

  const classes = useModalStyles();
  const [adhered, setAdhered] = useState({
    code: data?.codigo || '',
    prefix: data?.prefixo || '',
    description: data?.descricao || '',
    classification: data?.classificacao || [],
    isEnabled: data?.ativo || '',
    lack_of_fake_focus: data?.carencia_do_falso_foco || '',
    search_frequency: data?.frequencia_pesquisa || '',
    initial_term: moment(data?.vigencia_inicial, 'DD/MM/YYYY').format(
      'yyyy-MM-DD'
    ),
  });

  const handleClose = () => {
    setAdhered({
      code: '',
      prefix: '',
      description: '',
      classification: [],
      isEnabled: '',
      lack_of_fake_focus: '',
      search_frequency: '',
      initial_term: moment(data?.vigencia_inicial, 'DD/MM/YYYY').format(
        'yyyy-MM-DD'
      ),
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
                value={adhered.code}
                className={classes.input}
              />
            )}

            <ClassificationSelect
              classifications={adhered.classification}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Prefixo'
              value={adhered.prefix}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                setAdhered({ ...adhered, prefix: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Descrição'
              value={adhered.description}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                setAdhered({ ...adhered, description: e.target.value });
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
                  : adhered.initial_term
              }
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                setAdhered({ ...adhered, initial_term: e.target.value });
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
              value={adhered.lack_of_fake_focus}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                setAdhered({
                  ...adhered,
                  lack_of_fake_focus: e.target.value,
                });
              }}
            />
            <TextField
              variant='outlined'
              label='Frequência pesquisa'
              value={adhered.search_frequency}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                setAdhered({
                  ...adhered,
                  search_frequency: e.target.value,
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
                value={adhered.isEnabled}
                onChange={(event : any) => {
                  setAdhered({ ...adhered, isEnabled: event.target.value});
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

export default AdheredModal;
