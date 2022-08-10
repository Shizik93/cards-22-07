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
import {AddCardsPackModal} from "../modals/AddCardsPackModal";
import {AddCardsModal} from "../modals/AddCardsModal";

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {id} = useParams<{ id: string }>()

    const [openAddCard, setOpenAddCard] = React.useState(false);
    const [openEditCard, setOpenEditCard] = React.useState(false);
    const [previousTitleCard, setpreviousTitleCard] = React.useState('');
    const [idCard, setIdCard] = React.useState('');

    const handleOpen = () => setOpenAddCard(true);
    const handleClose = () => setOpenAddCard(false);
    const handleOpenEdit = () => setOpenEditCard(true);
    const handleCloseEdit = () => setOpenEditCard(false);

    useEffect(() => {
        id && dispatch(FetchCardsListTC({id}))
    }, [dispatch])

    const handleClickDelete = (id: string) => {
        dispatch(DeleteCardTC(id))
    }
    const handleClickEdit = (id: string) => {
        dispatch(EditCardTC(id))
    }
    const handlerToPacksList = () => {
        navigate(PATH.PACKSLISTPAGE)
    }


    const handleAddNewCardModal = () => {
        setOpenAddCard(true)
    }

    const handlerAddNewCard = (question: string, answer: string) => {
        id && dispatch(AddNewCardTC(id, question, answer))
    }
    return (
        <div className={'auth'}>
            <AddCardsModal open={openAddCard} addNewCard={handlerAddNewCard} handleOpen={handleOpen}
                           handleClose={handleClose}/>
            <div className={style.cardsListContainer}>
                <div><Button onClick={handlerToPacksList}> <i className={style.left}></i> Back to Packs List
                </Button></div>

                <div className={style.cardsListHeader}>
                    <h2>My Cards</h2>
                    <Button onClick={handleAddNewCardModal} variant="contained"
                            style={{height:'35px'}}>Add new card</Button>
                </div>
                <div className={style.toolsContainer}>
                    <div><Search/></div>
                </div>
                <div className={style.tableContainer}>
                    <CardsListTable callbackDelete={handleClickDelete} callbackEdit={handleClickEdit}/>
                </div>
            </div>
        </div>
    )
}