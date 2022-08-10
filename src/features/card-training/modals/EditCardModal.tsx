import React, {ChangeEvent, useEffect} from "react";
import {BasicModal} from "./BasicModal";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';
import {Button, TextField} from "@mui/material";
import style from './AddCardsPack.module.css'

type PropsType = {
    open: boolean
    handleCloseEdit: () => void
    editCard: (newQuestion: string, newAnswer: string) => void
    previousQuestion: string
    previousAnswer: string
}

export const EditCardModal = (props: PropsType) => {
    const [question, setQuestion] = React.useState(props.previousQuestion);
    const [answer, setAnswer] = React.useState(props.previousAnswer);
    useEffect(() => {
        if(question !==props.previousQuestion && answer !==props.previousAnswer) {setQuestion(props.previousQuestion)
            setAnswer(props.previousAnswer)}
    },[props.previousQuestion, props.previousAnswer])

    const handleCloseModal = () => {
        props.handleCloseEdit()
    }
    const handleEditQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const handleEditAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleSubmit = () => {
        props.editCard(question, answer)
    }

    return (
        <BasicModal open={props.open}>
            <div className={style.header}>
                <Typography variant="h6" component="h3">Edit pack <span style={{fontWeight: 'bold'}}>{props.previousQuestion}</span></Typography>
                <ClearIcon onClick={handleCloseModal}/>
            </div>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <TextField value={question} onChange={handleEditQuestion} id="standard-basic" label="question"
                           variant="standard"/>
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <TextField value={answer} onChange={handleEditAnswer} id="standard-basic" label="answer"
                           variant="standard"/>
            </Typography>

            <div className={style.footer}>
                <Button variant="contained" onClick={handleCloseModal}>CANCEL</Button>
                <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
            </div>
        </BasicModal>
    )
}