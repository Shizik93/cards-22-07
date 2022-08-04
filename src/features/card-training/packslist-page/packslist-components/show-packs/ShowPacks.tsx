import React from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export const ShowPacks = () => {
    return (
        <>
            <h4>Show packs cards</h4>
            <ButtonGroup disableElevation variant='contained'  >
                <Button color={'primary'}  style={{width:'90px'}}>My</Button>
                <Button color={'inherit'} style={{width:'90px'}}>All</Button>
            </ButtonGroup>

        </>
    )
}