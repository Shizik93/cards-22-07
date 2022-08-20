import React, {useCallback, useEffect, useState} from 'react';
import {CardsPackListButtons} from "../buttons/CardsPackListButtons";
import {CardPackItemsType} from "../../api-packslist/api-packsList";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {setSortColumnAC} from "../../packslist-reducer/packsListReducer";
import {Link} from 'react-router-dom'

import {TableSortLabel} from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";


type PacksListTableType = {
    callbackDelete: (id: string, title: string) => void
    editCardsPack: (id: string, title: string) => void
}
export const PacksListTable = React.memo((props: PacksListTableType) => {
    const dispatch = useAppDispatch()
    let selector = useAppSelector<Array<CardPackItemsType>>(state => state.packsList.cardPacks)
    const sortPacks = useAppSelector(state => state.packsList.sortPacks)
    let sortValue = +sortPacks[0]
    const [sortUpOrDown, setSortUpOrDown] = useState<number>(sortValue)
    const [title, setTitle] = useState('')

    useEffect(() => {
        dispatch(setSortColumnAC({sortPacks: {value: sortUpOrDown, name: title}}))
    }, [sortUpOrDown])

    const sortColumnHandler = useCallback((name: string) => {
        setSortUpOrDown(sortUpOrDown === 0 ? 1 : 0)
        setTitle(name)
    }, [sortUpOrDown, title])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">
                            <TableSortLabel
                                direction={sortPacks === '1cardsCount' ? 'asc' : 'desc'}
                                onClick={() => {
                                    sortColumnHandler('cardsCount')
                                }}>Cards count</TableSortLabel>
                        </TableCell>

                        <TableCell align="center">
                            <TableSortLabel
                                direction={sortPacks === '1updated' ? 'asc' : 'desc'}
                                onClick={() => {
                                    sortColumnHandler('updated')
                                }}>Update</TableSortLabel>
                        </TableCell>
                        <TableCell align="center">Author name</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selector.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                            <TableCell component="th" scope="row">
                                <Link to={`/cardslist/${row._id}`} style={
                                    {
                                        textDecoration: 'none',
                                        color: 'rgba(0, 0, 0, 0.87)',
                                        cursor: 'pointer'
                                    }}>{row.name}</Link> </TableCell>
                            <TableCell align="center">{row.cardsCount}</TableCell>
                            <TableCell align="center">{row.updated}</TableCell>
                            <TableCell align="center">{row.user_name}</TableCell>
                            <TableCell align="center">{<CardsPackListButtons
                                callbackDelete={props.callbackDelete} editCardsPack={props.editCardsPack}
                                title={row.name}
                                id={row._id}/>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})

