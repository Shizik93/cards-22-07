import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getCardsTC} from "./page-reducer";
import {Paginator} from "../../common/components/Paginator/Paginator";


export const PaginatorContainer = () => {
    const dispatch = useAppDispatch()
    let totalCount = useAppSelector(state => state.page.cardPacksTotalCount)
    let currentPageNumber = useAppSelector(state => state.page.page)
    let pageCount = useAppSelector(state=> state.page.pageCount)
    // let minCardsCount = useAppSelector(state=> state.page.minCardsCount)
    // let maxCardsCount = useAppSelector(state=> state.page.maxCardsCount)

    useEffect(()=>{
        dispatch(getCardsTC(currentPageNumber))
    },[])
    const getCardsOnPage = (page: number) => {
        dispatch(getCardsTC(page))
            }
    return (
        <>
            <Paginator
                totalCount={totalCount}
                currentPageNumber={currentPageNumber}
                onClickPageChosen={getCardsOnPage}
                portionSize={pageCount}
                minCardsCount={3}
                maxCardsCount={9}
            />
        </>

    )
}