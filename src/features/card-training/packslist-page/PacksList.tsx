import React, {useEffect} from "react";
import {ShowPacks} from "./packslist-components/show-packs/ShowPacks";
import {CardsSlider} from "./packslist-components/cards-slider/CardsSlider";
import {useAppDispatch} from "../../../app/hooks";
import {
    AddNewPackTC,
    DeleteCardsPackTC,
    EditCardsPackTC,
    FetchCardsPackListTC
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
        dispatch(FetchCardsPackListTC({}))
    }, [dispatch])

    const HandleClickDelete = (id: string) => {
        dispatch(DeleteCardsPackTC(id))
    }
    const HandleClickEdit = (id: string) => {
        dispatch(EditCardsPackTC(id))
    }
    const HandlerAddNewCardsPack = () => {
        dispatch(AddNewPackTC())
    }
    return (
        <div className={'auth'}>
            <div className={style.packsListContainer}>
                <div className={style.packsListHeader}>
                    <h2>Packs list</h2>
                    <Button onClick={HandlerAddNewCardsPack} variant="contained" style={{height: '35px'}}>Add new
                        pack</Button>
                </div>
                <div className={style.toolsContainer}>
                    {/*<div><Search/></div>*/}
                    <Searchinator2/>
                    <div><ShowPacks/></div>
                    <div><CardsSlider/></div>
                </div>
                <div className={style.tableContainer}>
                    <PacksListTable callbackDelete={HandleClickDelete} callbackEdit={HandleClickEdit}/>
                </div>
                <div>
                    <PaginatorContainer/>
                </div>
            </div>
        </div>
    )
}