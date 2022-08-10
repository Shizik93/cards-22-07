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
    addNewCard: (question: string, answer: string) => void
}

export const AddCardsModal = (props: PropsType) => {
    const [question, setQuestion] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const handleCloseModal = () => {
        props.handleClose()
    }
    const handleSetQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const handleSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleSubmit = () => {
        props.addNewCard(question, answer)
        setQuestion('')
    }

    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3"> Add new card </Typography>
                <ClearIcon onClick={handleCloseModal}/>
            </div>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <TextField value={question} onChange={handleSetQuestion} id="standard-basic" label="question"
                           variant="standard"/>
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <TextField value={answer} onChange={handleSetAnswer} id="standard-basic" label="answer"
                           variant="standard"/>
            </Typography>

            <div className={style.footer}>
                <Button variant="contained" onClick={handleCloseModal}>CANCEL</Button>
                <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
            </div>
        </BasicModal>
    )
}