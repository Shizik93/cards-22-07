import React, {useEffect, useState} from "react";
import {Search} from "../packlist-components/search/Search";
import {ShowPacks} from "../packlist-components/show-packs/ShowPacks";
import {CardsSlider} from "../packlist-components/number-of-cards/CardsSlider";
import {useAppDispatch} from "../../../app/hooks";
import {CreatePacksListTC} from "./packsListReducer/packsListReducer";
import {useSelector} from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Pagination, TablePagination} from "@mui/material";

import style from './Packlist.module.css'
import '../../auth/auth.css'
import {AppStoreType} from "../../../app/store";
import {CardPackItemsType} from "./api-packsList/api-packsList";
import {DataGridDemo} from "../packlist-components/packsListTable/PacksListTable";

//
// const createData = (name: string,
//                     calories: number,
//                     fat: number,
//                     carbs: number,
//                     protein: number,) => {
//     {
//         return {name, calories, fat, carbs, protein};
//     }
// }
//
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export const PacksList = () => {
    const dispatch = useAppDispatch()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    let selector = useSelector<AppStoreType, Array<CardPackItemsType>>(state => state.packsList.cardPacks)
   // let name = selector.map(el=> el.name)
   // let cardsCount = selector.map(el=> el.cardsCount)
   // let update = selector.map(el=> el.updated)
   // let authorName = selector.map(el=> el.user_name)

       useEffect(() => {
        dispatch(CreatePacksListTC())
    }, [dispatch])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - selector.length) : 0;
    return (
        <div className={'auth'}>
            <div className={style.packsListContainer}>
                <div className={style.packsListHeader}>
                    <h2>Packs list</h2>
                    <Button variant="contained" style={{height: '35px'}}>Add new pack</Button>
                </div>
                <div className={style.toolsContainer}>
                    <div><Search/></div>
                    <div><ShowPacks/></div>
                    <div><CardsSlider/></div>
                </div>
                <div className={style.tableContainer}>
                    {/*<DataGridDemo selector={selector}/>*/}
                    <TableContainer component={Paper}>
                        <Table
                            // sx={{minWidth: 650}}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
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
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                     <TableCell component="th" scope="row"> {row.name} </TableCell>
                                    <TableCell align="center">{row.cardsCount}</TableCell>
                                    <TableCell align="center">{row.updated}</TableCell>
                                    <TableCell align="center">{row.user_name}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className={style.pageContainer}>
                            <Pagination count={10} shape="rounded"
                            />
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={selector.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}