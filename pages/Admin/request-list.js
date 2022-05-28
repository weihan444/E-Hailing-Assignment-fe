import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { request } from '../data/data'
import Head from 'next/head'

const columns = [
    { field: 'customer', headerName: 'Customer', sortable: false, width: 300 },
    { field: 'status', headerName: 'status', width: 130 },
    { field: 'capacity', headerName: 'Capacity', width: 110 },
    { field: 'arrtime', headerName: 'Arrival Time', width: 130 },
    { field: 'startpoint', headerName: 'Location', sortable: false, width: 270 },
    { field: 'destination', headerName: 'Destination', sortable: false, width: 270 },
  ];

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
                    sx={{color: "black"}}
                />
            </div>
        </div>
    )
}

export default requestList