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
import {DeleteCardsPackModal} from "../modals/DeleteCardsPackModal";


export const PacksList =React.memo (() => {
    const dispatch = useAppDispatch()

    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [previousTitle, setpreviousTitle] = React.useState('');
    const [idPack, setIdPack] = React.useState('');

    const handlerCloseAdd = () => setOpenAdd(false);
    const handlerCloseEdit = () => setOpenEdit(false);
    const handlerCloseDelete = () => setOpenDelete(false);

    let isAuth = useAppSelector(state => state.login.isAuth)
    let page = useAppSelector(state => state.packsList.page)
    let pageCount = useAppSelector(state => state.packsList.pageCount)
    let min = useAppSelector(state => state.packsList.min)
    let max = useAppSelector(state => state.packsList.max)
    let packName = useAppSelector(state => state.packsList.packName)
    let user_id = useAppSelector(state => state.packsList.user_id)
    let sortPacks = useAppSelector(state => state.packsList.sortPacks)
    useEffect(() => {
        isAuth&&dispatch(FetchCardsPackListTC())
    }, [dispatch, page, pageCount, min, max, packName, user_id, sortPacks])

    const handlerClickDelete = (id: string, title: string) => {
        setOpenDelete(true)
        setpreviousTitle(title)
        setIdPack(id)
    }
    const handlerDeleteCardsPack = () => {
        dispatch(deleteCardsPackTC(idPack))
        setOpenDelete(false)
    }
    const handlerClickEdit = (id: string, title: string) => {
        setpreviousTitle(title)
        setOpenEdit(true)
        setIdPack(id)
    }
    const editTitleCardsPack = (newTitle: string, privatePack: boolean) => {
        dispatch(editCardsPackTC(idPack, newTitle, privatePack))
        setOpenEdit(false)
    }
    const handlerAddNewCardsPackModal = () => {
        setOpenAdd(true)
    }
    const handlerAddNewCardsPack = (title: string, privatePack: boolean) => {
        dispatch(addNewPackTC(title, privatePack))
        setOpenAdd(false)
    }
    return (
        <div className={'auth'}>
            <AddCardsPackModal open={openAdd} addNewCardsPack={handlerAddNewCardsPack}
                               handleClose={handlerCloseAdd}/>
            <EditCardsPackModal open={openEdit} editTitleCardsPack={editTitleCardsPack} previousTitle={previousTitle}
                                handleClose={handlerCloseEdit}/>
            <DeleteCardsPackModal open={openDelete} deleteQuestion={previousTitle}
                                  deleteCardsPack={handlerDeleteCardsPack}
                                  handleCloseDelete={handlerCloseDelete}/>
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
                    <PacksListTable callbackDelete={handlerClickDelete}
                                    editCardsPack={handlerClickEdit}
                    />
                </div>
                <div>
                    <PaginatorContainer/>
                </div>
            </div>
        </div>
    )
}
)
