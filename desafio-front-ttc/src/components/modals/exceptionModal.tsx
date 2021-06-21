import React, { useState } from 'react';
import ClassificationSelect from '../selects/classificationSelect';
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
import { IException } from '../../data/interfaces/IException';


interface IExcecoesModal  {
    data: IException,
    isOpen: boolean,
    close(): void
}


const ExcecoesModal : React.FunctionComponent<IExcecoesModal> = ({ data, isOpen, close }) => {
  const classes = useModalStyles();

  const [exception, setException] = useState({
    code: data?.codigo || '',
    adhered_code: data?.codigo_aderido || '',
    unit_name: data?.nome_unidade || '',
    prefix: data?.prefixo || '',
    classification: data?.classificacao || '',
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
              value={exception?.code}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              disabled
              label='Código aderido'
              value={exception?.adhered_code}
              className={classes.input}
            />
            <ClassificationSelect
              classifications={exception?.classification}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Nome unidade'
              value={exception.unit_name}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                setException({ ...exception, unit_name: e.target.value });
              }}
              className={classes.input}
            />
            <TextField
              variant='outlined'
              label='Prefixo'
              value={exception.prefix}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                setException({ ...exception, prefix: e.target.value });
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
