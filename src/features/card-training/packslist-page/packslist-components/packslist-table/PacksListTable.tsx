import React from 'react';
import {CardsPackListButtons} from "../buttons/CardsPackListButtons";
import {CardPackItemsType} from "../../api-packslist/api-packsList";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Link} from 'react-router-dom'
import {useAppSelector} from "../../../../../app/hooks";

type PacksListTableType = {
    callbackDelete: (id: string) => void
    callbackEdit: (id: string) => void
}
export const PacksListTable = (props: PacksListTableType) => {
      let selector = useAppSelector<Array<CardPackItemsType>>(state => state.packsList.cardPacks)

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Cards count</TableCell>
                        <TableCell align="center">Update</TableCell>
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
                                <Link to={`/cardslist/${row._id}`}>{row.name}</Link> </TableCell>
                            <TableCell align="center">{row.cardsCount}</TableCell>
                            <TableCell align="center">{row.updated}</TableCell>
                            <TableCell align="center">{row.user_name}</TableCell>
                            <TableCell align="center">{<CardsPackListButtons
                                callbackDelete={props.callbackDelete} callbackEdit={props.callbackEdit}
                                id={row._id}/>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}