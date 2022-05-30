import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { request } from '../data/data'
import Head from 'next/head'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const columns = [
    { field: 'customer', headerName: 'Customer', sortable: false, width: 300 },
    { field: 'status', headerName: 'status', width: 130 },
    { field: 'capacity', headerName: 'Capacity', width: 110 },
    { field: 'arrtime', headerName: 'Arrival Time', width: 130 },
    { field: 'startpoint', headerName: 'Location', sortable: false, width: 270 },
    { field: 'destination', headerName: 'Destination', sortable: false, width: 270 },
  ];

function CustomFooterStatusComponent(props){
    return (
        <div>
            <Link href='/Admin'>
                <IconButton aria-label="back">
                    <KeyboardBackspaceIcon />
                </IconButton>
            </Link>
            <IconButton aria-label="delete">
            <   DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit">
                <EditIcon />
            </IconButton>
            
        </div>
    )
}

const requestList = () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {setTableData(request)},[])

    return (
        <div>
            <Head>
                <title>Request List</title>
                <link rel="icon" href="/pupg-icon.ico" />
            </Head>

            <h1 style={{
                fontFamily: "cursive", 
                textAlign: "center", 
                fontStyle: "oblique", 
                fontSize: "40px"
                }}
            >
                Request List
            </h1>

            <div style={{ height: '80vh', width: '100%'}}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    checkboxSelection
                    disableColumnMenu
                    components={{
                        Footer: CustomFooterStatusComponent
                      }}
                />
            </div>
        </div>
    )
}

export default requestList