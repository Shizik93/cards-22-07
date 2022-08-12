import * as React from 'react';

type ButtonsProps = {
    id: string
    callbackDelete: (id: string) => void
    getPreviousCard: (id: string, previousQuestion: string, previousAnswer: string) => void
    previousQuestion: string
    previousAnswer: string
}

export const CardsListButtons = (props: ButtonsProps) => {
    const HandlerDelete = () => {
        props.callbackDelete(props.id)
    }
    const HandlerEdit = () => {
        props.getPreviousCard(props.id, props.previousQuestion, props.previousAnswer)
    }
    if (props.id === '') {
        return null
    }
    return (
        <div>
            <button onClick={HandlerDelete}> del</button>
            <button onClick={HandlerEdit}> edit</button>
        </div>
    )
}