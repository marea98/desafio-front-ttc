import React from 'react';
import { Delete } from '@material-ui/icons';
import { Grid, TextField, Typography, IconButton } from '@material-ui/core';

const ClassificationComponent = ({ classificacoes, removeClassificacao }) => {
  const alpha = Array.from(Array(26)).map((_, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  return (
    <Grid container>
      <Grid
        container
        item
        justify="flex-start"
        direction="column"
        style={{
          padding: '1rem 2.5rem .5rem 2.5rem',
          minHeight: '23rem',
          maxHeight: '23rem',
          overflow: 'auto',
        }}
      >
        {classificacoes.map((classificado, i) => {
          return (
            <Grid
              container
              item
              xs={4}
              alignItems="center"
              justify="space-between"
              style={{ margin: '.2rem', padding: "0 2rem 0 2rem"}}
              key={i}
            >
              <Grid item style={{width: "20px"}}>
                <Typography component="span" variant="h6">
                  <b>{alphabet[i]}</b>
                </Typography>
              </Grid>
              <TextField
                variant="outlined"
                value={classificado.nome}
                size="small"
                style={{ backgroundColor: '#ffff'}}
              />
              <IconButton aria-label="delete" onClick={() => removeClassificacao(i)}>
                <Delete htmlColor="#b71c1c" />
              </IconButton>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ClassificationComponent;
