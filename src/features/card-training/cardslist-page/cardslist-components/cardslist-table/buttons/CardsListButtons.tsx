import * as React from 'react';
import style from "../../../../packslist-page/packslist-components/buttons/CardsPackListButton.module.css";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";

type ButtonsProps = {
    id: string
    callbackDelete: (id: string, deleteQuestion: string) => void
    getPreviousCard: (id: string, previousQuestion: string, previousAnswer: string) => void
    previousQuestion: string
    previousAnswer: string
}

export const CardsListButtons = React.memo((props: ButtonsProps) => {
    const handlerDelete = () => {
        props.callbackDelete(props.id, props.previousQuestion)
    }
    const handlerEdit = () => {
        props.getPreviousCard(props.id, props.previousQuestion, props.previousAnswer)
    }
    if (props.id === '') {
        return null
    }

    return (
        <div>
            <DeleteTwoToneIcon onClick={handlerDelete} className={style.icon} titleAccess={'delete'}/>
            <EditIcon onClick={handlerEdit} className={style.icon} titleAccess={'edit'}/>
        </div>
    )
})