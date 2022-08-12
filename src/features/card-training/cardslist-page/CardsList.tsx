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
import {AddCardModal} from "../modals/AddCardsModal";
import {EditCardModal} from "../modals/EditCardModal";
import {DeleteCardModal} from "../modals/DeleteCardsModal";
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

    const [openAddCard, setOpenAddCard] = React.useState(false);
    const [openEditCard, setOpenEditCard] = React.useState(false);
    const [openDeleteCard, setOpenDeleteCard] = React.useState(false);
    const [previousQuestion, setpreviousQuestion] = React.useState('');
    const [previousAnswer, setpreviousAnswer] = React.useState('');
    const [idCard, setIdCard] = React.useState('');


    const handlerCloseAdd = () => setOpenAddCard(false);
    const handlerCloseEdit = () => setOpenEditCard(false);
    const handlerCloseDelete = () => setOpenDeleteCard(false);

    useEffect(() => {
        id && dispatch(FetchCardsListTC({id}))
    }, [dispatch, pageForEffect, pageCountForEffect])


    const handleAddNewCardModal = () => {
        setOpenAddCard(true)
    }
    const handlerAddNewCard = (question: string, answer: string) => {
        id && dispatch(AddNewCardTC(id, question, answer))
        setOpenAddCard(false)
    }

    const handlerClickEdit = (id: string, previousQuestion: string, previousAnswer: string) => {
        setOpenEditCard(true)
        setIdCard(id)
        setpreviousQuestion(previousQuestion)
        setpreviousAnswer(previousAnswer)
    }
    const handlerEditCard = (newQuestion: string, newAnswer: string) => {
        dispatch(EditCardTC(idCard, newQuestion, newAnswer))
        setOpenEditCard(false)
           }

    const handlerClickDelete = (id: string, deleteQuestion: string) => {
        setOpenDeleteCard(true)
        setIdCard(id)
        setpreviousQuestion(deleteQuestion)
    }
    const handlerDeleteCard = () => {
        dispatch(DeleteCardTC(idCard))
        setOpenAddCard(false)
    }

    const handlerToPacksList = () => {
        navigate(PATH.PACKSLISTPAGE)
    }
/*    const HandlerAddNewCard = () => {
        id && dispatch(AddNewCardTC(id))
    }*/
    const gradeHandler = (cardId: string, e: SyntheticEvent, value: number | null) => {

         if (e&&value!== null) {
             dispatch(GradeCardTC(cardId,value))
        }
    }
    const paginationHandler = (page: number) => {
        dispatch(setPageAC({page}))
    }
    const selectHandler = (pageCount: number) => {
        dispatch(setPageCountAC({pageCount}))
    }
    return (
        <div className={'auth'}>
            <AddCardModal open={openAddCard} addNewCard={handlerAddNewCard}
                          handleClose={handlerCloseAdd}/>
            <EditCardModal open={openEditCard} editCard={handlerEditCard} previousQuestion={previousQuestion}
                           previousAnswer={previousAnswer} handleCloseEdit={handlerCloseEdit}/>
            <DeleteCardModal open={openDeleteCard} deleteCard={handlerDeleteCard} deleteQuestion={previousQuestion}
                           handleCloseDelete={handlerCloseDelete}/>
            <div className={style.cardsListContainer}>
                <div><Button onClick={handlerToPacksList}> <i className={style.left}></i> Back to Packs List
                </Button></div>

                <div className={style.cardsListHeader}>
                    <h2>My Cards</h2>
                    <Button onClick={handleAddNewCardModal} variant="contained"
                            style={{height: '35px'}}>Add new card</Button>
                </div>
                <div className={style.toolsContainer}>
                    <div><Searchinator2/></div>
                </div>
                <div className={style.tableContainer}>
                    <CardsListTable callbackGrade={gradeHandler} callbackDelete={handlerClickDelete} getPreviousCard={handlerClickEdit}/>

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
