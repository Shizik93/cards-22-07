import * as React from 'react';
import {SyntheticEvent, useState} from 'react';
import Box from '@mui/material/Box';
import {Slider} from "@mui/material";
import {setMinMaxDataAC} from "../../packslist-reducer/packsListReducer";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";


export const CardsSlider = () => {
    const dispatch = useAppDispatch()
    let minCardsCount = useAppSelector(state => state.packsList.minCardsCount)
    let maxCardsCount = useAppSelector(state => state.packsList.maxCardsCount)
    let min = useAppSelector(state => state.packsList.min)
    let max = useAppSelector(state => state.packsList.max)
    const [value, setValue] = useState<number[]>([min, max]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleChangeCommitted = (event: SyntheticEvent | Event) => {
        dispatch(setMinMaxDataAC({min: value[0], max: value[1]}))
    };

    return (
        <>
            <h4>Number of cards</h4>
            <Box sx={{width: 300}}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay='auto'
                    min={minCardsCount}
                    max={maxCardsCount}
                />
            </Box>
        </>
    );
}
