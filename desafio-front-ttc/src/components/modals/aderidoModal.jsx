import React from 'react';
import ClassificacaoSelect from '../classificacaoSelect'
import { Visibility } from '@material-ui/icons';
import {
    Grid,
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    input: {
        margin: ".5rem",
        width: "30rem"
    },
    ButtonsAction: {
        margin: ".5rem"
    }
}));

const AderidoModal = ({ data }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton>
                <Visibility size="small" onClick={handleClickOpen} />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Typography component="span" variant="h5" >Aderidos</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container alignItems="flex-start" justify="flex-start" direction="column" style={{ padding: "0 .5rem .5rem .5rem" }}>
                        <TextField variant='outlined' disabled label="Código" value={data?.codigo || ''} className={classes.input} />
                        <TextField variant='outlined' label="Descrição" value={data?.descricao || ''}  className={classes.input} />
                        <ClassificacaoSelect classific={data?.classificacao || ''}  className={classes.input} />
                        <TextField variant='outlined' label="Liberado" value={data?.liberado || ''}  className={classes.input} />
                        <Grid container item justify="flex-end"> 
                            <Button variant="contained" onClick={handleClose} className={classes.ButtonsAction}>
                                Voltar
                            </Button>
                            <Button variant="contained" color="primary" className={classes.ButtonsAction}>
                                Salvar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AderidoModal;

