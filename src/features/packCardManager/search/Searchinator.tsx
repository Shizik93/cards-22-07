import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './Search.module.css'
import {useFormik} from "formik";
import {useAppDispatch} from "../../../app/hooks";
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';

import {useDebounce} from 'usehooks-ts'
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import {fetchCardsPackListTC} from "../../card-training/packslist-page/packslist-reducer/packsListReducer";

type SearchPropsType = {
    // totalcardPacksCount: number
    // currentPageNumber: number
    // onClickPageChosen: (pageNumber: number) => void
    // portionSize?: number
    // minCardsCount: number
    // maxCardsCount: number
}

// export const Searchinator: React.FC<SearchPropsType> = () => {
//     const dispatch = useAppDispatch()
//     const formik = useFormik({
//         // validate: (values)=>{
//         // if(!values.email){
//         //     return {
//         //         search: 'Search is required'
//         //     }
//         // },
//         initialValues: {
//             packName: '',
//
//         },
//         onSubmit: values => {
//             // dispatch(getCardsTC(values));
//         },
//     });
//     return (
//         <div className={styles.searchBlock}>
//             <Grid container justifyContent={'center'}>
//                 <Grid item justifyContent={'center'}>
//                     <form onSubmit={formik.handleSubmit}>
//                         <FormControl>
//                             <FormGroup>
//                                 <TextField
//                                     label="packName"
//                                     margin="normal"
//                                     {...formik.getFieldProps('packName')}
//                                 />
//                                 {formik.errors.packName ? <div>{formik.errors.packName}</div> : null}
//
//                                 <Button type={'submit'} variant={'contained'} color={'primary'}>
//                                     Search
//                                 </Button>
//                             </FormGroup>
//                         </FormControl>
//                     </form>
//                 </Grid>
//             </Grid>
//
//         </div>
//     )
// }

export default function Searchinator2() {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    // Fetch API (optional)
    useEffect(() => {
        dispatch(fetchCardsPackListTC({packName: value }))
        // Do fetch here...
        // Triggers when "debouncedValue" changes
    }, [debouncedValue])

    return (
        <div className={styles.searchBlock}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Provide your text"
                    inputProps={{ 'aria-label': 'Provide your text' }}
                    value={value}
                    onChange={handleChange}
                />

            </Paper>
            {/*<Grid container justifyContent={'center'}>*/}
            {/*    <Grid item justifyContent={'center'}>*/}
            {/*        <Input type="text" value={value} onChange={handleChange}/>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}

        </div>

    )
}







