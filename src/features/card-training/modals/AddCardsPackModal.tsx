import React, {ChangeEvent} from "react";
import {BasicModal} from "./BasicModal";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import style from './AddCardsPack.module.css'

type PropsType = {
    open: boolean
    handleOpen: () => void
    handleClose: () => void
    addNewCardsPack: (title: string) => void
}

export const AddCardsPackModal = (props: PropsType) => {
    const [title, setTitle] = React.useState('');
const handleCloseModal = ()=> {
    props.handleClose()
}
const handleSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
    setTitle(e.currentTarget.value)

}
    const handleSubmit = ()=> {
        props.addNewCardsPack(title)
        setTitle('')
    }

    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3"> Add new pack </Typography>
                <ClearIcon onClick={handleCloseModal}/>
            </div>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <TextField value={title} onChange={handleSetTitle} id="standard-basic" label="pack name" variant="standard"/>
            </Typography>
            <FormGroup sx={{mt: 2}}>
                <FormControlLabel control={<Checkbox defaultChecked/>} label="Label"/>
            </FormGroup>
            <div className={style.footer}>
                <Button variant="contained" onClick={handleCloseModal}>CANCEL</Button>
                <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
            </div>
        </BasicModal>
    )
}