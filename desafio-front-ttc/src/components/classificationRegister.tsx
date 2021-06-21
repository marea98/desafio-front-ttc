import React from 'react';
import { Delete } from '@material-ui/icons';
import { Grid, TextField, Typography, IconButton } from '@material-ui/core';
import alphabet from '../utils/alphabet';
import {IClassification} from '../data/interfaces/IClassification';

interface IClassificationSelect {
  classifications: IClassification[],
  removeClassification(index: number): void
}

const ClassificationComponent: React.FC<IClassificationSelect> = ({ classifications, removeClassification }) => {
  return (
    <Grid container>
      <Grid
        container
        item
        justify='flex-start'
        direction='column'
        style={{
          padding: '1rem 2.5rem .5rem 2.5rem',
          minHeight: '38rem',
          maxHeight: '38rem',
          overflow: 'auto',
        }}
      >
        {classifications.map((classified, i) => {
          return (
            <Grid
              container
              item
              sm={8}
              md={5}
              lg={4}
              alignItems='center'
              justify='space-around'
              direction='row'
              style={{ margin: '.2rem 0' }}
              key={i}
            >
              <Grid item style={{ width: '20px' }}>
                <Typography component='span' variant='h6'>
                  <b>{alphabet[i]}</b>
                </Typography>
              </Grid>
              <TextField
                variant='outlined'
                value={classified.nome}
                size='small'
                style={{ backgroundColor: '#ffff' }}
              />
              <IconButton
                aria-label='delete'
                onClick={() => removeClassification(i)}
              >
                <Delete htmlColor='#b71c1c' />
              </IconButton>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ClassificationComponent;
