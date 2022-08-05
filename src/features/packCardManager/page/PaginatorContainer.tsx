import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Paginator} from "../../../common/components/Paginator/Paginator";
import {FetchCardsPackListTC} from "../../card-training/packslist-page/packslist-reducer/packsListReducer";


export const PaginatorContainer = () => {
    const dispatch = useAppDispatch()
    let totalcardPacksCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
    let currentPageNumber = useAppSelector(state => state.packsList.page)
    let pageCount = useAppSelector(state=> state.packsList.pageCount)
    let minCardsCount = useAppSelector(state=> state.packsList.minCardsCount)
    let maxCardsCount = useAppSelector(state=> state.packsList.maxCardsCount)

    const getCardsOnPage = (page: number) => {
        // dispatch(getCardsTC({page}))
        dispatch(FetchCardsPackListTC({page}))

            }
    const setCardsOnPage = (pageCount: number) => {
        // dispatch(getCardsTC({page}))
        dispatch(FetchCardsPackListTC({pageCount}))

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
                setCardsOnPage={setCardsOnPage}
            />
            {/*<Searchinator/>*/}
        </>

    )
}