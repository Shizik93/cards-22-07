import React, {useEffect} from "react";
import {ShowPacks} from "./packslist-components/show-packs/ShowPacks";
import {CardsSlider} from "./packslist-components/cards-slider/CardsSlider";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Searchinator2 from "../../packCardManager/search/Searchinator";
import {PaginatorContainer} from "../../packCardManager/page/PaginatorContainer";
import {AddCardsPackModal} from "../modals/AddCardsPackModal";
// import {EditCardsPackModal} from "../modals/EditCardsPackModal";
import {
    addNewPackTC,
    deleteCardsPackTC,
    // editCardsPackTC,
    fetchCardsPackListTC
} from "./packslist-reducer/packsListReducer";
import {PacksListTable} from "./packslist-components/packslist-table/PacksListTable";

import {Button} from "@mui/material";

import style from './Packslist.module.css'
import '../../auth/auth.css'


export const PacksList = () => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    let page = useAppSelector(state => state.packsList.page)
    let pageCount = useAppSelector(state=> state.packsList.pageCount)
    let min = useAppSelector(state => state.packsList.RequestBody.min)
    let max = useAppSelector(state => state.packsList.RequestBody.max)
    let packName = useAppSelector(state => state.packsList.RequestBody.packName)
    let user_id = useAppSelector(state => state.packsList.RequestBody.user_id)
    // const isAuth = useAppSelector(state => state.login.isAuth)


    useEffect(() => {
        // isAuth &&
        dispatch(fetchCardsPackListTC({}))
    }, [dispatch, page, pageCount, min, max, packName, user_id])

    const handleClickDelete = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const handleClickEdit = (id: string) => {
        // dispatch(editCardsPackTC(id))
    }
    const editNewCardsPack = (id: string, title: string) => {
        // dispatch(addNewPackTC(title))
        setOpen(false)
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
            <AddCardsPackModal open={open} addNewCardsPack={addNewCardsPack} editNewCardsPack={handleClickEdit} handleOpen={handleOpen}
                               handleClose={handleClose}/>
            {/*<EditCardsPackModal/>*/}
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
                    <PacksListTable callbackDelete={handleClickDelete} editNewCardsPack={handleClickEdit} callbackEdit={handleClickEdit}/>
                </div>
                <div>
                    <PaginatorContainer/>
                </div>
            </div>
        </div>
    )
}