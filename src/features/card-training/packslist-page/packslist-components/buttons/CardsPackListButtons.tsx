import * as React from 'react';
import {useNavigate} from "react-router-dom";

type ButtonsProps = {
    id: string
    title: string
    callbackDelete: (id: string) => void
    titleCardsPack: (id: string, title: string) => void
    addNewCardsPack: (title: string) => void
}

export const CardsPackListButtons = (props: ButtonsProps) => {
    const navigate = useNavigate()
    const HandlerDelete = () => {
        props.callbackDelete(props.id)
    }
    const HandlerEdit = () => {
        props.titleCardsPack(props.id, props.title)
    }
    const handleLearn = () => {
        navigate(`/cardslist/${props.id}`)
    }
    if (props.id === '') {
        return null
    }
    return (
        <div>
            <button onClick={HandlerDelete}> del</button>
            <button onClick={HandlerEdit}> edit</button>
            <button onClick={handleLearn}> learn</button>
        </div>
    )
}