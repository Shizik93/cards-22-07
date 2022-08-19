import React, {useEffect, useState} from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {fetchCardsPackListTC, setUserIdAC} from "../../packslist-reducer/packsListReducer";

export const ShowPacks = () => {
    let user_id = useAppSelector(state => state.login._id)
    const dispatch = useAppDispatch()
    const [showCardsList, setShowCardsList] = useState<boolean>(false)

    const setShowMyCardsList = () => {
        dispatch(setUserIdAC({user_id: user_id ? user_id : ''}))
        dispatch(fetchCardsPackListTC())
        setShowCardsList(true)
    }
    const setShowAllCardsList = () => {
        dispatch(setUserIdAC({user_id: ''}))
        dispatch(fetchCardsPackListTC())
        setShowCardsList(false)
    }
    // useEffect(() => {
    //     if (showMyCardsList) {
    //         dispatch(setUserIdAC({user_id: user_id ? user_id : ''}))
    //         dispatch(fetchCardsPackListTC())
    //     }
    //     else {
    //         dispatch(setUserIdAC({user_id: ''}))
    //         dispatch(fetchCardsPackListTC())
    //     }
    //
    // }, [showMyCardsList])

    return (
        <>
            <h4>Show packs cards</h4>
            <ButtonGroup disableElevation variant='contained'>
                <Button color={showCardsList ? 'primary' : "inherit"} style={{width: '90px'}}
                        onClick={setShowMyCardsList}>My</Button>
                <Button color={!showCardsList ? 'primary' : "inherit"} style={{width: '90px'}}
                        onClick={setShowAllCardsList}>All</Button>
            </ButtonGroup>

        </>
    )
}