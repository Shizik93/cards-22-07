import * as React from 'react';
import {useNavigate} from "react-router-dom";

type ButtonsProps = {
    id: string
    title: string
    callbackDelete: (id: string, title: string) => void
    editCardsPack: (id: string, title: string) => void
    // addNewCardsPack: (title: string) => void
}

export const CardsPackListButtons = (props: ButtonsProps) => {
    const navigate = useNavigate()
    const handlerDelete = () => {
        props.callbackDelete(props.id, props.title)
    }
    const handlerEdit = () => {
        props.editCardsPack(props.id, props.title)
    }
    const handlerLearn = () => {
        navigate(`/cardslist/${props.id}`)
    }
    if (props.id === '') {
        return null
    }
    return (
        <div>
            <button onClick={handlerDelete}> del</button>
            <button onClick={handlerEdit}> edit</button>
            <button onClick={handlerLearn}> learn</button>
        </div>
    )
}