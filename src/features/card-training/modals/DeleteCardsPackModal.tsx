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
    deleteCardsPack: () => void
}

export const DeleteCardsPackModal = (props: PropsType) => {

    const handlerCloseModal = () => {
        props.handleCloseDelete()
    }
    const handlerSubmit = () => {
        props.deleteCardsPack()
    }

    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3"> Do you realy want to remove pack <span
                    style={{fontWeight: 'bold'}}>{props.deleteQuestion}? </span> All cards will be deleted.
                </Typography>
                <ClearIcon onClick={handlerCloseModal}/>
            </div>
            <div className={style.footer}>
                <Button variant="contained" onClick={handlerCloseModal}>CANCEL</Button>
                <Button variant="contained" color='error' onClick={handlerSubmit}>Delete</Button>
            </div>
        </BasicModal>
    )
}