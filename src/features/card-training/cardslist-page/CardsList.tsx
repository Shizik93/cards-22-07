import React, {useEffect} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";
import {useNavigate, useParams} from "react-router-dom";
import {Search} from "../packslist-page/packslist-components/search/Search";
import {CardsListTable} from "./cardslist-components/cardslist-table/CardsListTable";
import {AddNewCardTC, DeleteCardTC, EditCardTC, FetchCardsListTC} from "./cardslist-reducer/cardsListReducer";

import {Button} from "@mui/material";

import style from './CardsList.module.css'
import '../../auth/auth.css'

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        id && dispatch(FetchCardsListTC({id}))
    }, [dispatch])

    const HandleClickDelete = (id: string) => {
        dispatch(DeleteCardTC(id))
    }
    const HandleClickEdit = (id: string) => {
        dispatch(EditCardTC(id))
    }
    const HandlerToPacksList = () => {
        navigate(PATH.PACKSLISTPAGE)
    }
    const HandlerAddNewCard = () => {
        id && dispatch(AddNewCardTC(id))
    }
    return (
        <div className={'auth'}>
            <div className={style.cardsListContainer}>
                <div><Button onClick={HandlerToPacksList}> <i className={style.left}></i> Back to Packs List
                </Button></div>

                <div className={style.cardsListHeader}>
                    <h2>My Pack</h2>  <Button onClick={HandlerAddNewCard} variant="contained"
                                              style={{height: '35px'}}>Add new
                    card</Button>
                </div>
                <div className={style.toolsContainer}>
                    <div><Search/></div>
                </div>
                <div className={style.tableContainer}>
                    <CardsListTable callbackDelete={HandleClickDelete} callbackEdit={HandleClickEdit}/>
                </div>
            </div>
        </div>
    )
}