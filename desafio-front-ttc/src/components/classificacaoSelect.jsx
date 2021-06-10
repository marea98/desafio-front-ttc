import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classificacoes from '../data/classificacoes';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '30rem',
  },
}));

const ClassificacaoSelect = ({ classific }) => {
  const classes = useStyles();

  const [classificacao, setClassificacao] = useState(classific);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">
        Classificação
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={classificacao}
        onChange={(e) => setClassificacao(e.target.value)}
        label="Classificação"
      >
        {classificacoes.map((classific) => (
          <MenuItem value={classific.nome}>{classific.nome}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClassificacaoSelect;
