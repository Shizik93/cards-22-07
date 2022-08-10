import React, {ChangeEvent, useEffect} from "react";
import {BasicModal} from "./BasicModal";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';
import {Button, TextField} from "@mui/material";
import style from './AddCardsPack.module.css'

type PropsType = {
    open: boolean
    handleOpen: () => void
    handleClose: () => void
    editTitleCardsPack: (newTitle: string) => void
    previousTitle: string
}

export const EditCardsPackModal = (props: PropsType) => {
    const [title, setTitle] = React.useState(props.previousTitle);
    useEffect(() => {
        if(title !==props.previousTitle) setTitle(props.previousTitle)
    },[props.previousTitle])

    const handleCloseModal = () => {
        props.handleClose()
    }
    const handleSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const handleSubmit = () => {
        props.editTitleCardsPack(title)

    }

    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3">Edit pack</Typography>
                <ClearIcon onClick={handleCloseModal}/>
            </div>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <TextField value={title} onChange={handleSetTitle} id="standard-basic" label="pack name"
                           variant="standard"/>
            </Typography>
            <div className={style.footer}>
                <Button variant="contained" onClick={handleCloseModal}>CANCEL</Button>
                <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
            </div>
        </BasicModal>
    )
}