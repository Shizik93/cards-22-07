import  React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../app/store";
import {CardPackItemsType} from "../../packslist-page/api-packsList/api-packsList";

type Props = {
    selector: Array<CardPackItemsType>
}

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'cardsCount',
        headerName: 'Cards count',
        width: 150,
        editable: true,
    },
    {
        field: 'update',
        headerName: 'Update',
        // type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'authorName',
        headerName: 'Author name',
        // type: 'number',
        width: 150,
        editable: true,
    },

    // {
    //     field: 'authorName',
    //     headerName: 'Author name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];


export const DataGridDemo = (props: Props) => {

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={props.selector}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    );
}
