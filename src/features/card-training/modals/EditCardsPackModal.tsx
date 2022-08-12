import React, {ChangeEvent, useEffect} from "react";
import {BasicModal} from "./BasicModal";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import style from './AddCardsPack.module.css'

type PropsType = {
    open: boolean
    handleClose: () => void
    editTitleCardsPack: (newTitle: string, privatePack: boolean) => void
    previousTitle: string
}

export const EditCardsPackModal = (props: PropsType) => {
    const [title, setTitle] = React.useState(props.previousTitle);
    const [privatePack, setPrivatePack] = React.useState(false);
    useEffect(() => {
        if (title !== props.previousTitle) setTitle(props.previousTitle)
    }, [props.previousTitle])

    const handlerCloseModal = () => {
        props.handleClose()
    }
    const handlerSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handlerSubmit = () => {
        props.editTitleCardsPack(title, privatePack)
    }
    const handlerChacked = () => {
        setPrivatePack(true)
    }
    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3">Edit pack</Typography>
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