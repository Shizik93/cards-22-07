import React, {useState} from 'react';
import {CardsPackListButtons} from "../buttons/CardsPackListButtons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../app/store";
import {CardPackItemsType} from "../../api-packslist/api-packsList";
import {TableSortLabel} from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Link} from 'react-router-dom'
import {v1} from "uuid";

type PacksListTableType = {
    callbackDelete: (id: string) => void
    callbackEdit: (id: string) => void
}
export const PacksListTable = (props: PacksListTableType) => {
    let selector = useSelector<AppStoreType, Array<CardPackItemsType>>(state => state.packsList.cardPacks)
    const [activeSort, setActiveSort] = useState<boolean>(false)
    // const [active, setActive] = useState([{name:"Name",name: "Cards count",name: "Update", name:"Author name", name:"Actions"}])
    // type HeaderType = {
    //     id: string
    //     name: string
    // }
    {/*const TableCellCreator= (props: { names: string[] }) => {*/}
    {/*    debugger*/}
    {/*    const names = props.names*/}
    {/*    const headersForTable: Array<HeaderType> = []*/}
    {/*    names.forEach(n => headersForTable.push({id: v1(), name: n}))*/}
    {/*    return(*/}
    {/*        <>*/}
    {/*            {*/}
    //                 headersForTable.map((title) => {
    //
    //                     return (
    {/*                        <TableCell*/}
    {/*                            key={title.id}*/}
    {/*                            onMouseEnter={() => setActiveSort(true)}*/}
    {/*                            onBlur={() => setActiveSort(false)}*/}
    //                             align="center">
    //
    //                             {/*<TableSortLabel active={active} onClick={()=>setActive(!active)}>{title.name}</TableSortLabel>*/}
    //                             {/*{activeSort?sortLabel(props.name):props.name}*/}
    //                         </TableCell>
    {/*                    )*/}


    //                 })
    //
    //             }
    //         </>
    //                )
    //
    //
    // }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/*<TableCellCreator names={["Name", "Cards count", "Update", "Author name", "Actions"]}/>*/}
                        {/*/!*<TableCellCreator name={"Cards count"}/>*!/*/}
                        {/*/!*<TableCellCreator name={"Update"}/>*!/*/}
                        {/*/!*<TableCellCreator name={"Author name"}/>*!/*/}
                        {/*/!*<TableCellCreator name={"Actions"}/>*!/*/}
                        {/*<TableCell onMouseEnter={()=>setActiveSort(true)} onBlur={()=>setActiveSort(false)} align="center" >{activeSort?sortLabel("Name"):"Name"}</TableCell>*/}
                        {/*<TableCell onMouseEnter={()=>setActiveSort(true)} onBlur={()=>setActiveSort(false)} align="center" >{activeSort?sortLabel("Cards count"): "Cards count"}</TableCell>*/}
                        {/*<TableCell onMouseEnter={()=>setActiveSort(true)} onBlur={()=>setActiveSort(false)} align="center" >{activeSort?sortLabel("Update"):"Update"}</TableCell>*/}
                        {/*<TableCell onMouseEnter={()=>setActiveSort(true)} onBlur={()=>setActiveSort(false)} align="center" >{activeSort?sortLabel("Author name"): "Author name"}</TableCell>*/}
                        {/*<TableCell onMouseEnter={()=>setActiveSort(true)} onBlur={()=>setActiveSort(false)} align="center" >{activeSort?sortLabel("Actions"):"Actions"}</TableCell>*/}
                        <TableCell align="center"><TableSortLabel>Name</TableSortLabel></TableCell>
                        <TableCell align="center"><TableSortLabel>Cards count</TableSortLabel></TableCell>
                        <TableCell align="center"><TableSortLabel>Update</TableSortLabel></TableCell>
                        <TableCell align="center"><TableSortLabel>Author name</TableSortLabel></TableCell>
                        <TableCell align="center"><TableSortLabel>Actions</TableSortLabel></TableCell>
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