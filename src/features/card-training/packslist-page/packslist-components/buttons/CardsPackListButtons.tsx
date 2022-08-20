import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';

import style from './CardsPackListButton.module.css';


type ButtonsProps = {
    id: string
    title: string
    callbackDelete: (id: string, title: string) => void
    editCardsPack: (id: string, title: string) => void
}

export const CardsPackListButtons = React.memo((props: ButtonsProps) => {
    const navigate = useNavigate()
    const handlerDelete = useCallback(() => {
        props.callbackDelete(props.id, props.title)
    }, [props.id, props.title])

    const handlerEdit = useCallback(() => {
        props.editCardsPack(props.id, props.title)
    }, [props.id, props.title])

    const handlerLearn = useCallback(() => {
        navigate(`/learn-page/${props.id}`)
    }, [props.id])
    if (props.id === '') {
        return null
    }

    return (
        <div>
            <DeleteTwoToneIcon onClick={handlerDelete} className={style.icon} titleAccess={'delete'}/>
            <EditIcon onClick={handlerEdit} className={style.icon} titleAccess={'edit'}/>
            <SchoolTwoToneIcon onClick={handlerLearn} className={style.icon} titleAccess={'learn'}/>
        </div>
    )
})
