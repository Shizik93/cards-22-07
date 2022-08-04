import React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../app/store";
import {CardPackItemsType} from "../../api-packslist/api-packsList";
import {Pagination, TablePagination} from "@mui/material";


const PaginationComponent = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let selector = useSelector<AppStoreType, Array<CardPackItemsType>>(state => state.packsList.cardPacks)
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
        <div>
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
    )
}