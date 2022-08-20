import React, {ChangeEvent, useEffect} from "react";
import {BasicModal} from "./BasicModal";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';
import {Button, TextField} from "@mui/material";
import style from './AddCardsPack.module.css'
import Box from "@mui/material/Box";

type PropsType = {
    open: boolean
    handleCloseEdit: () => void
    editCard: (newQuestion: string, newAnswer: string) => void
    previousQuestion: string
    previousAnswer: string
}

export const EditCardModal = React.memo((props: PropsType) => {
    const [question, setQuestion] = React.useState(props.previousQuestion);
    const [answer, setAnswer] = React.useState(props.previousAnswer);
    useEffect(() => {
        if (question !== props.previousQuestion && answer !== props.previousAnswer) {
            setQuestion(props.previousQuestion)
            setAnswer(props.previousAnswer)
        }
    }, [props.previousQuestion, props.previousAnswer])

    const handlerCloseModal = () => {
        props.handleCloseEdit()
    }
    const handlerEditQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const handlerEditAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handlerSubmit = () => {
        props.editCard(question, answer)
    }

    return (
        <BasicModal open={props.open}>
            <header className={style.header}>
                <Typography variant="h6" component="h3">Edit pack: <span
                    style={{fontWeight: 'bold'}}>{props.previousQuestion}</span></Typography>
                <ClearIcon onClick={handlerCloseModal}/>
            </header>
            <Box sx={{mt: 2}}>
                <TextField value={question} onChange={handlerEditQuestion} id="standard-basic" label="question"
                           variant="standard"/>
            </Box>
            <Box sx={{mt: 2}}>
                <TextField value={answer} onChange={handlerEditAnswer} id="standard-basic" label="answer"
                           variant="standard"/>
            </Box>

            <footer className={style.footer}>
                <Button variant="contained" onClick={handlerCloseModal}>CANCEL</Button>
                <Button variant="contained" onClick={handlerSubmit}>SAVE</Button>
            </footer>
        </BasicModal>
    )
})