import React from "react";
import {BasicModal} from "./BasicModal";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';
import {Button} from "@mui/material";
import style from './AddCardsPack.module.css'

type PropsType = {
    open: boolean
    deleteQuestion: string
    handleCloseDelete: () => void
    deleteCard: () => void
}

export const DeleteCardModal = (props: PropsType) => {
    const handlerCloseModal = () => {
        props.handleCloseDelete()
    }
    const handlerSubmit = () => {
        props.deleteCard()
    }
    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3"> Do you realy want to remove card: <span
                    style={{fontWeight: 'bold'}}>{props.deleteQuestion}</span> </Typography>
                <ClearIcon onClick={handlerCloseModal}/>
            </div>
            <div className={style.footer}>
                <Button variant="contained" onClick={handlerCloseModal}>CANCEL</Button>
                <Button variant="contained" color='error' onClick={handlerSubmit}>Delete</Button>
            </div>
        </BasicModal>
    )
}