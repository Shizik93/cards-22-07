import React, {SyntheticEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";
import {useNavigate, useParams} from "react-router-dom";
import {CardsListTable} from "./cardslist-components/cardslist-table/CardsListTable";
import {
    AddNewCardTC,
    DeleteCardTC,
    EditCardTC,
    FetchCardsListTC,
    GradeCardTC,
    setPageAC,
    setPageCountAC
} from "./cardslist-reducer/cardsListReducer";

import {Button} from "@mui/material";

import style from './CardsList.module.css'
import '../../auth/auth.css'
import {Searchinator2} from "../../packCardManager/search/Searchinator";
import {Paginator} from "../../../common/components/Paginator/Paginator";
import {Select} from "../../packCardManager/selector/Select";

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const pageForEffect = useAppSelector(state => state.cardsList.requestBodyCards.page)
    const page = useAppSelector(state => state.cardsList.page)
    const pageCountForEffect = useAppSelector(state => state.cardsList.requestBodyCards.pageCount)
    const pageCount = useAppSelector(state => state.cardsList.pageCount)

    console.log(pageCount)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        id && dispatch(FetchCardsListTC({id}))
    }, [dispatch, pageForEffect, pageCountForEffect])

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
    const gradeHandler = (cardId: string, e: SyntheticEvent, value: number | null) => {
        console.log(e.currentTarget)
        console.log(value)
        // if (e&&value!== null) {
        //     dispatch(GradeCardTC(cardId, e.currentTarget.value))
        // }
    }
    const paginationHandler = (page: number) => {
        dispatch(setPageAC({page}))
    }
    const selectHandler = (pageCount: number) => {
        dispatch(setPageCountAC({pageCount}))
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
                    <div><Searchinator2/></div>
                </div>
                <div className={style.tableContainer}>
                    <CardsListTable callbackDelete={HandleClickDelete} callbackEdit={HandleClickEdit}
                                    callbackGrade={gradeHandler}/>
                    <Paginator
                        totalCount={cardsTotalCount === null ? 0 : cardsTotalCount}
                        page={page === null ? 1 : page}
                        onClickHandler={paginationHandler}
                        portionSize={pageCount === null ? 1 : pageCount}
                    />
                    <Select portionSize={pageCount === null ? 1 : pageCount} setCountPage={selectHandler}/>

                </div>
            </div>
        </div>
    )
}