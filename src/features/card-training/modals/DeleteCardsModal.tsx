import React from "react";
import {BasicModal} from "./BasicModal";
import ClearIcon from '@mui/icons-material/Clear';
import {Button} from "@mui/material";
import style from './AddCardsPack.module.css'
import Box from "@mui/material/Box";

type PropsType = {
    open: boolean
    deleteQuestion: string
    handleCloseDelete: () => void
    deleteCard: () => void
}

export const DeleteCardModal = React.memo((props: PropsType) => {
    const handlerCloseModal = () => {
        props.handleCloseDelete()
    }
    const handlerSubmit = () => {
        props.deleteCard()
    }
    return (
        <BasicModal open={props.open}>
            <header className={style.header}>
                <Box component="h3"> Do you realy want to remove card: <span
                    style={{fontWeight: 'bold'}}>{props.deleteQuestion}</span> </Box>
                <ClearIcon onClick={handlerCloseModal}/>
            </header>
            <footer className={style.footer}>
                <Button variant="contained" onClick={handlerCloseModal}>CANCEL</Button>
                <Button variant="contained" color='error' onClick={handlerSubmit}>Delete</Button>
            </footer>
        </BasicModal>
    )
})