import React from "react";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";
import {useNavigate} from "react-router-dom";

import {Button} from "@mui/material";

import style from './EmptyCardsList.module.css'
import '../../auth/auth.css'


export const EmptyCardsList = () => {
    const navigate = useNavigate()

    const HandlerToPacksList = () => {
        navigate(PATH.PACKSLISTPAGE)
    }
    const HandlerAddNewCard = () => {
        navigate(PATH.CARDSLISTPAGE)
    }

    return (
        <div className={'auth'}>
            <div className={style.emptycardsListContainer}>
                <div className={style.emptycardsListHeaderLeft}>
                    <Button onClick={HandlerToPacksList}> <i className={style.left}></i> Back to Packs List</Button>
                    <h2>Name Pack</h2>
                </div>
                <div className={style.emptycardsListHeaderCenter}>
                    <div className={style.text}>This pack is empty. Click add new card to fill this pack</div>
                    <Button onClick={HandlerAddNewCard} variant="contained" style={{height: '35px'}}>Add new
                        card</Button>
                </div>
            </div>
        </div>
    )
}