import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {setCurrentPageAC, setPageCountAC} from "../../card-training/packslist-page/packslist-reducer/packsListReducer";
import React from "react";
import styles from './Pagination.module.css'
import {Select} from "../selector/Select";
import {Pagination} from "@mui/material";


export const PaginatorContainer = React.memo(() => {
        const dispatch = useAppDispatch()
        let totalCardPacksCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
        let page = useAppSelector(state => state.packsList.page)
        let pageCount = useAppSelector(state => state.packsList.pageCount)
        const setCardsPackOnPage = (pageCount: number) => {
            dispatch(setPageCountAC({pageCount}))
        }
        const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
            dispatch(setCurrentPageAC({page: value}))
        }
        return (
            <div className={styles.paginationBlock}>
                <Pagination defaultPage={1} count={Math.ceil(totalCardPacksCount/pageCount)} page={page} onChange={handleChange}/>

                <Select portionSize={pageCount} setCountPage={setCardsPackOnPage}/>
            </div>

        )
    }
)
