import * as React from 'react';

type ButtonsProps = {
    id: string
    callbackDelete: (id: string, deleteQuestion: string) => void
    getPreviousCard: (id: string, previousQuestion: string, previousAnswer: string) => void
    previousQuestion: string
    previousAnswer: string
}

export const CardsListButtons = (props: ButtonsProps) => {
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
            <button onClick={handlerDelete}> del</button>
            <button onClick={handlerEdit}> edit</button>
        </div>
    )
}