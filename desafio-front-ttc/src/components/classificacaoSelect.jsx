import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classificacoes from '../data/classificacoes';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ClassificacaoSelect() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={classificacoes}
      disableCloseOnSelect
      getOptionLabel={(option) => option.nome}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.nome}
        </React.Fragment>
      )}
      style={{ 
        width: "480px",
        margin: ".2rem 0 .2rem .5rem" 
        }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Classificação"/>
      )}
    />
  );
}

export default ClassificacaoSelect;
