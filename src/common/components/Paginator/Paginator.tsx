import React, {useState} from "react";
import styles from './Paginator.module.css'
import {v1} from "uuid";

type PageType = {
    id: string,
    number: number
}
type PaginatorPropsType = {
    totalCount: number
    page: number
    onClickHandler: (pageNumber: number) => void
    portionSize?: number
    }

export const Paginator: React.FC<PaginatorPropsType> = (
    {
        totalCount,
        page,
        onClickHandler,
        portionSize = 1,
    }
) => {
    let totalPages = Math.ceil(totalCount / portionSize)
    let pages: Array<PageType> = []
    for (let i = 1; i <= totalPages; i++) {
        let newPage = {
            id: v1(),
            number: i
        }
        pages.push(newPage)
    }
    let portionCount = Math.ceil(totalPages / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rigthPortionPageNumber = portionNumber * portionSize

    return (
        <div className={styles.pageBlock}>
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(1)
            }} className={styles.firstItem}>1</button>}
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }} className={styles.arrow}>Prev</button>}
            {pages.filter(p => p.number >= leftPortionPageNumber && p.number <= rigthPortionPageNumber)
                .map((p) => {
                    return (<span key={p.id} onClick={() => onClickHandler(p.number)}
                                  className={page === p.number ? styles.chosedPage : styles.unChosedPage}>{p.number}</span>
                    )
                })
            }
            {portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }} className={styles.arrow}>Next</button>}

            {portionNumber < portionCount && <button onClick={() => {
                setPortionNumber(portionCount)
            }} className={styles.lastItem}>{totalPages}</button>}
            {/*<Select value={cardsOnPage} onChange={(e)=>setCardsOnPage(+e.currentTarget.value)}/>*/}



        </div>
    )
}





