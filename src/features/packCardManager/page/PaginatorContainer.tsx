import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Paginator} from "../../../common/components/Paginator/Paginator";
import {setCurrentPageAC, setPageCountAC} from "../../card-training/packslist-page/packslist-reducer/packsListReducer";
import React from "react";
import {Select} from "../selector/Select";


export const PaginatorContainer = React.memo(() => {
        const dispatch = useAppDispatch()
        let totalcardPacksCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
        let page = useAppSelector(state => state.packsList.page)
        let pageCount = useAppSelector(state => state.packsList.pageCount)

        const setCardsPackOnPage = (pageCount: number) => {
            dispatch(setPageCountAC({pageCount}))
        }
        const setCurrentPage = (page: number) => {
            dispatch(setCurrentPageAC({page}))
        }

        return (
            <>
                <Paginator
                    totalcardPacksCount={totalcardPacksCount}
                    currentPageNumber={page}
                    onClickPageChosen={setCurrentPage}
                    portionSize={pageCount}
                    minCardsShow={3}
                    maxCardsShow={9}
                />
                <Select portionSize={pageCount} setCountPage={setCardsPackOnPage}/>
            </>

        )
    }
)
