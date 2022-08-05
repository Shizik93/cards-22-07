import * as React from 'react';

type ButtonsProps = {
    id: string
    callbackDelete: (id: string) => void
    callbackEdit: (id: string) => void
}

export const CardsListButtons = (props: ButtonsProps) => {
    const HandlerDelete = () => {
        props.callbackDelete(props.id)
    }
    const HandlerEdit = () => {
        props.callbackEdit(props.id)
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