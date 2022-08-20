import React, {useCallback} from "react";
import {BasicModal} from "./BasicModal";

import ClearIcon from '@mui/icons-material/Clear';
import {Button} from "@mui/material";

import style from './AddCardsPack.module.css'
import Box from "@mui/material/Box";

type PropsType = {
    open: boolean
    deleteQuestion: string
    handleCloseDelete: () => void
    deleteCardsPack: () => void
}

export const DeleteCardsPackModal = React.memo((props: PropsType) => {

    const handlerCloseModal = useCallback(() => {
        props.handleCloseDelete()
    }, [props.handleCloseDelete])
    const handlerSubmit = () => {
        props.deleteCardsPack()
    }

    return (
        <BasicModal open={props.open}>
            <header className={style.header}>
                <Box component="h3"> Do you realy want to remove pack <span
                    style={{fontWeight: 'bold'}}>{props.deleteQuestion}? </span> All cards will be deleted.
                </Box>
                <ClearIcon onClick={handlerCloseModal}/>
            </header>
            <footer className={style.footer}>
                <Button variant="contained" onClick={handlerCloseModal}>CANCEL</Button>
                <Button variant="contained" color='error' onClick={handlerSubmit}>Delete</Button>
            </footer>
        </BasicModal>
    )
})