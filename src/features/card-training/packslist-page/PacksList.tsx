import React, {useEffect} from "react";
import {ShowPacks} from "./packslist-components/show-packs/ShowPacks";
import {CardsSlider} from "./packslist-components/cards-slider/CardsSlider";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    addNewPackTC,
    deleteCardsPackTC, editCardsPackTC, FetchCardsPackListTC,

} from "./packslist-reducer/packsListReducer";
import {PacksListTable} from "./packslist-components/packslist-table/PacksListTable";

import {Button} from "@mui/material";

import style from './Packslist.module.css'
import '../../auth/auth.css'

import {PaginatorContainer} from "../../packCardManager/page/PaginatorContainer";
import {AddCardsPackModal} from "../modals/AddCardsPackModal";
import {Searchinator2} from "../../packCardManager/search/Searchinator";
import {EditCardsPackModal} from "../modals/EditCardsPackModal";
import {flushSync} from "react-dom";


export const PacksList = () => {
    const dispatch = useAppDispatch()

    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [previousTitle, setpreviousTitle] = React.useState('');
    const [idPack, setIdPack] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    let isAuth = useAppSelector(state => state.login.isAuth)
    let page = useAppSelector(state => state.packsList.page)
    let pageCount = useAppSelector(state => state.packsList.pageCount)
    let min = useAppSelector(state => state.packsList.min)
    let max = useAppSelector(state => state.packsList.max)
    let packName = useAppSelector(state => state.packsList.packName)
    let user_id = useAppSelector(state => state.packsList.user_id)

    useEffect(() => {
        console.log(isAuth)
        isAuth && dispatch(FetchCardsPackListTC())
    }, [ page, pageCount, min, max, packName, user_id, isAuth])
    console.log(previousTitle)
    const handleClickDelete = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const handleClickEdit = (id: string, title: string) => {
        setpreviousTitle(title)
        setOpenEdit(true)
        setIdPack(id)

    }
    const editTitleCardsPack = (newTitle: string) => {
        dispatch(editCardsPackTC(idPack, newTitle))
        setOpenEdit(false)
    }

    const handlerAddNewCardsPackModal = () => {
        setOpen(true)

    }
    const addNewCardsPack = (title: string) => {
        dispatch(addNewPackTC(title))
        setOpen(false)
    }

    return (
        <div className={'auth'}>
            <AddCardsPackModal open={open} addNewCardsPack={addNewCardsPack} handleOpen={handleOpen}
                               handleClose={handleClose}/>
            <EditCardsPackModal open={openEdit} editTitleCardsPack={editTitleCardsPack} previousTitle={previousTitle}
                                handleOpen={handleOpenEdit}
                                handleClose={handleCloseEdit}/>
            <div className={style.packsListContainer}>
                <div className={style.packsListHeader}>
                    <h2>Packs list</h2>
                    <Button onClick={handlerAddNewCardsPackModal} variant="contained" style={{height: '35px'}}>Add new
                        pack</Button>
                </div>
                <div className={style.toolsContainer}>
                    <Searchinator2/>
                    <div><ShowPacks/></div>
                    <div><CardsSlider/></div>
                </div>
                <div className={style.tableContainer}>
                    <PacksListTable callbackDelete={handleClickDelete}
                                    titleCardsPack={handleClickEdit} addNewCardsPack={addNewCardsPack}/>
                </div>
                <div>
                    <PaginatorContainer/>
                </div>
            </div>
        </div>
    )
}
