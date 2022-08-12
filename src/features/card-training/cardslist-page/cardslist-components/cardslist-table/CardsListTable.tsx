import React, {SyntheticEvent} from 'react';
import {CardItemsType} from "../../api-cardslist/api-cardsList";
import {CardsListButtons} from "./buttons/CardsListButtons";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useAppSelector} from "../../../../../app/hooks";
import {Badge, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';


type CardsListTableType = {
    callbackDelete: (id: string, deleteQuestion: string) => void
    getPreviousCard: (id: string, previousQuestion: string, previousAnswer: string) => void
    callbackGrade: (cardId: string, e: SyntheticEvent, value:number | null) => void
}
export const CardsListTable = (props: CardsListTableType) => {
    let selector =  useAppSelector<Array<CardItemsType>>(state => state.cardsList.cards)

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Question</TableCell>
                        <TableCell align="center">Answer</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                        <TableCell align="center">Grade</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selector.map((row) => {
                        return(

                        <TableRow
                            key={row._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row" align="center"> {row.question} </TableCell>
                            <TableCell align="center">{row.answer}</TableCell>
                            <TableCell align="center">{row.updated}</TableCell>
                            <TableCell align="center">
                                <Badge badgeContent={row.shots} color="secondary">
                                    <Rating
                                        name="size-small"
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        onChange={(e,value)=>props.callbackGrade(row._id,e,value)}
                                        value={row.grade}
                                        size="small"
                                    />
                                </Badge>
                            </TableCell>
                            <TableCell align="center">{<CardsListButtons
                                callbackDelete={props.callbackDelete} getPreviousCard={props.getPreviousCard}
                                id={row._id} previousQuestion={row.question} previousAnswer={row.answer}/>}</TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
