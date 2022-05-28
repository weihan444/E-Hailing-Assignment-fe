import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { drivers } from '../data/data'
import Head from 'next/head';


const columns = [
    { field: 'driver', headerName: 'Driver', sortable: false, width: 300 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'capacity', headerName: 'Capacity', width: 110 },
    { field: 'loaction', headerName: 'Location', sortable: false, width: 270 },
    { field: 'customer', headerName: 'Customer', sortable: false, width: 300 },
  ];


const driverList = () => {
    
    const [tableData, setTableData] = useState([])

    useEffect(() => {setTableData(drivers)},[])
  
    return (
        <div>
            <Head>
                <title>Driver List</title>
                <link rel="icon" href="/pupg-icon.ico" />
            </Head>

            <h1 style={{
                fontFamily: "cursive", 
                textAlign: "center", 
                fontStyle: "oblique", 
                fontSize: "40px"
                }}
            >
                Drivers List
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

export default driverList