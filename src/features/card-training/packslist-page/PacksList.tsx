import React, {useEffect} from "react";
import {ShowPacks} from "./packslist-components/show-packs/ShowPacks";
import {CardsSlider} from "./packslist-components/cards-slider/CardsSlider";
import {useAppDispatch} from "../../../app/hooks";
import {
    addNewPackTC,
    deleteCardsPackTC,
    editCardsPackTC,
    fetchCardsPackListTC
} from "./packslist-reducer/packsListReducer";
import {PacksListTable} from "./packslist-components/packslist-table/PacksListTable";

import {Button} from "@mui/material";

import style from './Packslist.module.css'
import '../../auth/auth.css'
import Searchinator2 from "../../packCardManager/search/Searchinator";
import {PaginatorContainer} from "../../packCardManager/page/PaginatorContainer";


export const PacksList = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCardsPackListTC({}))
    }, [dispatch])

    const handleClickDelete = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const handleClickEdit = (id: string) => {
        dispatch(editCardsPackTC(id))
    }
    const handlerAddNewCardsPack = () => {
        dispatch(addNewPackTC())
    }
    return (
        <div className={'auth'}>
            <div className={style.packsListContainer}>
                <div className={style.packsListHeader}>
                    <h2>Packs list</h2>
                    <Button onClick={handlerAddNewCardsPack} variant="contained" style={{height: '35px'}}>Add new
                        pack</Button>
                </div>
                <div className={style.toolsContainer}>
                    <Searchinator2/>
                    <div><ShowPacks/></div>
                    <div><CardsSlider/></div>
                </div>
                <div className={style.tableContainer}>
                    <PacksListTable callbackDelete={handleClickDelete} callbackEdit={handleClickEdit}/>
                </div>
                <div>
                    <PaginatorContainer/>
                </div>
            </div>
        </div>
    )
}