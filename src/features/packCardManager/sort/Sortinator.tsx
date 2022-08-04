import React from 'react'
import {useAppDispatch} from "../../../app/hooks";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

type SortPropsType = {
    // totalcardPacksCount: number
    // currentPageNumber: number
    // onClickPageChosen: (pageNumber: number) => void
    // portionSize?: number
    minCardsCount: number
    maxCardsCount: number
}

function valuetext(value: number) {
    return `${value}°C`;
}

export default function Sortinator({minCardsCount, maxCardsCount}:SortPropsType) {
    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}







