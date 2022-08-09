import React, {useEffect, useState} from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {setUserIdAC} from "../../packslist-reducer/packsListReducer";

export const ShowPacks = () => {
    let user_id = useAppSelector(state => state.login._id)
    const dispatch = useAppDispatch()
    const [showMyCardsList, setShowMyCardsList] = useState<boolean>(false)

    useEffect(() => {
        if (showMyCardsList) {
            dispatch(setUserIdAC({user_id: user_id ? user_id : ''}))
        } else {
            dispatch(setUserIdAC({user_id: ''}))
        }

    }, [showMyCardsList])

    return (
        <>
            <h4>Show packs cards</h4>
            <ButtonGroup disableElevation variant='contained'>
                <Button color={showMyCardsList ? 'primary' : "inherit"} style={{width: '90px'}}
                        onClick={() => setShowMyCardsList(true)}>My</Button>
                <Button color={!showMyCardsList ? 'primary' : "inherit"} style={{width: '90px'}}
                        onClick={() => setShowMyCardsList(false)}>All</Button>
            </ButtonGroup>

        </>
    )
}