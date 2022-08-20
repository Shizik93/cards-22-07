import React, {useCallback, useEffect} from "react";
import {ShowPacks} from "./packslist-components/show-packs/ShowPacks";
import {CardsSlider} from "./packslist-components/cards-slider/CardsSlider";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    addNewPackTC,
    deleteCardsPackTC, editCardsPackTC, FetchCardsPackListTC,
} from "./packslist-reducer/packsListReducer";
import {PacksListTable} from "./packslist-components/packslist-table/PacksListTable";
import {PaginatorContainer} from "../../packCardManager/page/PaginatorContainer";
import {AddCardsPackModal} from "../modals/AddCardsPackModal";
import {Searchinator2} from "../../packCardManager/search/Searchinator";
import {EditCardsPackModal} from "../modals/EditCardsPackModal";
import {DeleteCardsPackModal} from "../modals/DeleteCardsPackModal";

import {Button} from "@mui/material";

import style from './Packslist.module.css'
import '../../auth/auth.css'


export const PacksList = React.memo(() => {
        const dispatch = useAppDispatch()

        const [openAdd, setOpenAdd] = React.useState(false);
        const [openEdit, setOpenEdit] = React.useState(false);
        const [openDelete, setOpenDelete] = React.useState(false);
        const [previousTitle, setpreviousTitle] = React.useState('');
        const [idPack, setIdPack] = React.useState('');

        const handlerCloseAdd = useCallback(() => setOpenAdd(false), []);
        const handlerCloseEdit = useCallback(() => setOpenEdit(false), [])
        const handlerCloseDelete = useCallback(() => setOpenDelete(false), [])

        let page = useAppSelector(state => state.packsList.page)
        let pageCount = useAppSelector(state => state.packsList.pageCount)
        let min = useAppSelector(state => state.packsList.min)
        let max = useAppSelector(state => state.packsList.max)
        let packName = useAppSelector(state => state.packsList.packName)
        // let user_id = useAppSelector(state => state.packsList.user_id)
        let sortPacks = useAppSelector(state => state.packsList.sortPacks)

        useEffect(() => {
            dispatch(FetchCardsPackListTC())
        }, [page, pageCount, min, max, packName, sortPacks]) //убрал user_id, т.к. был двойной get запрос при возврате к PacksList

        const handlerClickDelete = useCallback((id: string, title: string) => {
            setOpenDelete(true)
            setpreviousTitle(title)
            setIdPack(id)
        }, [openDelete, previousTitle, idPack])
        const handlerDeleteCardsPack = useCallback(() => {
            dispatch(deleteCardsPackTC(idPack))
            setOpenDelete(false)
        }, [openDelete])
        const handlerClickEdit = useCallback((id: string, title: string) => {
            setpreviousTitle(title)
            setOpenEdit(true)
            setIdPack(id)
        }, [previousTitle, openEdit, idPack])
        const handlerEditTitleCardsPack = useCallback((newTitle: string, privatePack: boolean) => {
            dispatch(editCardsPackTC(idPack, newTitle, privatePack))
            setOpenEdit(false)
        }, [openEdit])
        const handlerAddNewCardsPackModal = useCallback(() => {
            setOpenAdd(true)
        }, [openAdd])
        const handlerAddNewCardsPack = useCallback((title: string, privatePack: boolean) => {
            dispatch(addNewPackTC(title, privatePack))
            setOpenAdd(false)
        }, [openAdd])

        return (
            <div className={'auth'}>
                <AddCardsPackModal open={openAdd} addNewCardsPack={handlerAddNewCardsPack}
                                   handleClose={handlerCloseAdd}/>
                <EditCardsPackModal open={openEdit} editTitleCardsPack={handlerEditTitleCardsPack}
                                    previousTitle={previousTitle}
                                    handleClose={handlerCloseEdit}/>
                <DeleteCardsPackModal open={openDelete} deleteQuestion={previousTitle}
                                      deleteCardsPack={handlerDeleteCardsPack}
                                      handleCloseDelete={handlerCloseDelete}/>
                <div className={style.packsListContainer}>
                    <div className={style.packsListHeader}>
                        <h2>Packs list</h2>
                        <Button onClick={handlerAddNewCardsPackModal} variant="contained" style={{height: '35px'}}>Add
                            new
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
