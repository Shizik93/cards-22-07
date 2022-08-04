import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getCardsTC} from "./page-reducer";
import {Paginator} from "../../common/components/Paginator/Paginator";
import Searchinator2, {Searchinator} from "../Search/Searchinator";


export const PaginatorContainer = () => {
    const dispatch = useAppDispatch()
    let totalcardPacksCount = useAppSelector(state => state.page.cardPacksTotalCount)
    let currentPageNumber = useAppSelector(state => state.page.page)
    let pageCount = useAppSelector(state=> state.page.pageCount)
    // let minCardsCount = useAppSelector(state=> state.page.minCardsCount)
    // let maxCardsCount = useAppSelector(state=> state.page.maxCardsCount)

    useEffect(()=>{
        dispatch(getCardsTC({}))
    },[])
    const getCardsOnPage = (page: number) => {
        dispatch(getCardsTC({page}))
            }
    return (
        <>
            <Paginator
                totalcardPacksCount={totalcardPacksCount}
                currentPageNumber={currentPageNumber}
                onClickPageChosen={getCardsOnPage}
                portionSize={pageCount}
                minCardsCount={3}
                maxCardsCount={9}
            />
            {/*<Searchinator/>*/}
            <Searchinator2/>
        </>

    )
}