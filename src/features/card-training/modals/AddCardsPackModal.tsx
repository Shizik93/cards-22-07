import React, {ChangeEvent} from "react";
import {BasicModal} from "./BasicModal";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import style from './AddCardsPack.module.css'

type PropsType = {
    open: boolean
    handleClose: () => void
    addNewCardsPack: (title: string, privatePack: boolean) => void
}

export const AddCardsPackModal = (props: PropsType) => {
    const [title, setTitle] = React.useState('');
    const [privatePack, setPrivatePack] = React.useState(false);
    const handlerCloseModal = () => {
        props.handleClose()
    }
    const handlerSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handlerSubmit = () => {
        props.addNewCardsPack(title, privatePack)
        setTitle('')
    }
const handlerChacked = () => {
        setPrivatePack(true)
}
    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3"> Add new pack </Typography>
                <ClearIcon onClick={handlerCloseModal}/>
            </div>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <TextField value={title} onChange={handlerSetTitle} id="standard-basic" label="pack name"
                           variant="standard"/>
            </Typography>
            <FormGroup sx={{mt: 2}}>
                <FormControlLabel control={<Checkbox onChange={handlerChacked}/>}  label="Label"/>
            </FormGroup>
            <div className={style.footer}>
                <Button variant="contained" onClick={handlerCloseModal}>CANCEL</Button>
                <Button variant="contained" onClick={handlerSubmit}>SAVE</Button>
            </div>
        </BasicModal>
    )
}