import React, { InputHTMLAttributes } from 'react';
import allClassifications from '../../data/classificacoes';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {IClassification} from '../../data/interfaces/IClassification';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface IClassificationSelect extends InputHTMLAttributes<HTMLInputElement> {
  classifications: IClassification[],
}

const ClassificationSelect : React.FC<IClassificationSelect> = ({ classifications, ...rest }) => {
  return (
    <Autocomplete
      multiple 
      limitTags={3}
      id='checkboxes-tags-demo'
      defaultValue={allClassifications.filter((x: IClassification) =>
        classifications.some((y: IClassification) => y.nome === x.nome)
      )}
      options={allClassifications}
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

export default ClassificationSelect;
