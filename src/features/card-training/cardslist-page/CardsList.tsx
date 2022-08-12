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
import {AddCardModal} from "../modals/AddCardsModal";
import {EditCardModal} from "../modals/EditCardModal";
import {DeleteCardModal} from "../modals/DeleteCardsModal";

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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
    }, [dispatch])


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
                    <div><Search/></div>
                </div>
                <div className={style.tableContainer}>
                    <CardsListTable callbackDelete={handlerClickDelete} getPreviousCard={handlerClickEdit}/>
                </div>
            </div>
        </div>
    )
}