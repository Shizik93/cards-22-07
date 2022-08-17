import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './Search.module.css'
import {useAppDispatch} from "../../../app/hooks";
import SearchIcon from '@mui/icons-material/Search';

import {useDebounce} from 'usehooks-ts'
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import {setPackNameDataAC} from "../../card-training/packslist-page/packslist-reducer/packsListReducer";


export const Searchinator2 = React.memo(() => {
        const dispatch = useAppDispatch()
        const [value, setValue] = useState<string>('')
        const debouncedValue = useDebounce<string>(value, 500)

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
        }

      useEffect(() => {
             dispatch(setPackNameDataAC({packName: value}))
         }, [debouncedValue])

        return (
            <div className={styles.searchBlock}>
                <Paper
                    component="form"
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                >
                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                    <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                    <InputBase
                        sx={{ml: 1, flex: 1}}
                        placeholder="Provide your text"
                        inputProps={{'aria-label': 'Provide your text'}}
                        value={value}
                        onChange={handleChange}
                    />

                </Paper>
            </div>

        )
    }
)






