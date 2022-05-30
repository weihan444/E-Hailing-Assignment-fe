import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { drivers } from '../data/data'
import Head from 'next/head';
import Link from 'next/link'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    { field: 'driver', headerName: 'Driver', sortable: false, width: 300 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'capacity', headerName: 'Capacity', width: 110 },
    { field: 'location', headerName: 'Location', sortable: false, width: 270 },
    { field: 'customer', headerName: 'Customer', sortable: false, width: 300 },
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
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </div>
    )
  }

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
                    components={{
                        Footer: CustomFooterStatusComponent
                    }}
                />
            </div>
        </div>
    )
}

export default driverList