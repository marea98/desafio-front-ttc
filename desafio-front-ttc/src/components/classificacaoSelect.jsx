import React from 'react';
import classificacoes from '../data/classificacoes';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const ClassificacaoSelect = () => {
  return (
    <Autocomplete
      multiple
      limitTags={3}
      id='checkboxes-tags-demo'
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
        width: '30rem',
        margin: '.5rem',
      }}
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label='Classificação' />
      )}
    />
  );
};

export default ClassificacaoSelect;
