import * as React from 'react';
import Box from '@mui/material/Box';
import {useState} from "react";
import {Slider} from "@mui/material";

function valuetext(value: number) {
    return `${value}°C`;
}

export const CardsSlider = () => {
    const [value, setValue] = useState<number[]>([0, 10]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <>
            <h4>Number of cards</h4>
            <Box sx={{width: 300}}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                    min={0}
                    max={10}
                    getAriaValueText={valuetext}
                />
            </Box>
        </>
    );
}
