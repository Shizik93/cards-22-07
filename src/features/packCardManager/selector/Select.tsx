import React, {ChangeEvent} from "react";
import styles from './Select.module.css'

type SelectPropsType = {
    portionSize: number
    setCountPage: (pageCount: number)=>void
    minCardsCount?: number
    maxCardsCount?: number
}

export const Select: React.FC<SelectPropsType> = (
    {
        portionSize = 4,
        setCountPage,
        minCardsCount=3,
        maxCardsCount=9,
        // setCardsOnPage
    }
) => {

    let maxValueSelect =[]
    for(let i=minCardsCount; i<=maxCardsCount;i++){
        maxValueSelect.push(i)
    }

    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setCountPage(+e.currentTarget.value)

    }

    return (
        <div className={styles.selectBlock}>


            <select value={portionSize} onChange={onChangeSelectHandler}>*
                {maxValueSelect.map((v,i) => {
                    return (
                        <option value={v} key={i}>{v}</option>
                    )
                })}


            </select>

        </div>
    )
}





