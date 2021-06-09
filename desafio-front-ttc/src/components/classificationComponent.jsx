import React from 'react';
import { Add, Delete } from '@material-ui/icons';
import classificacoes from '../data/classificacoes'
import {
    Box,
    Grid,
    TextField,
    Tabs,
    Tab,
    Typography,
    AppBar,
    makeStyles,
    Button,
    Avatar,
    IconButton
} from '@material-ui/core';



const ClassificationComponent = () => {
    console.log(classificacoes)
    return (
        <Grid container>
            <Grid container item justify="flex-end" direction="column" style={{ padding: "1rem 2.5rem 1rem 2.5rem", maxHeight: "23rem", overflow: "auto" }}>
                {classificacoes.map(classificado => {
                    return (
                        <Grid container item xs="4" alignItems="center" justify="flex-start" style={{margin: ".2rem"}}>
                            <Typography component="span"variant="h6"><b>{classificado.sigla}</b></Typography>                         
                            <TextField variant='outlined' value={classificado.nome} size="small" style={{ backgroundColor: "#ffff", marginLeft: ".5rem" }} />
                            <IconButton aria-label="delete" onClick={() => alert("Deletar")}>
                                <Delete htmlColor="#b71c1c"/>
                            </IconButton>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default ClassificationComponent;