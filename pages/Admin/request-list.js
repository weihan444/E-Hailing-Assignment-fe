import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { request } from '../data/data'
import { styled } from '@mui/material/styles';
import Head from 'next/head'

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
}))

export async function getStaticProps() {
    const data = await request
  
    return {
      props: { list : data },
    }
}

const requestList = ({list}) => {
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

        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Customer</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Expected Arrival Time</StyledTableCell>
                        <StyledTableCell align="center">Capacity</StyledTableCell>
                        <StyledTableCell align="center">Starting Point</StyledTableCell>
                        <StyledTableCell align="center">Destination</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {list.map((row) => (
                        <StyledTableRow key={row.id}>
                            <TableCell>{row.customer}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.arrtime}</TableCell>
                            <TableCell align="center">{row.capacity}</TableCell>
                            <TableCell align="center">{row.startpoint}</TableCell>
                            <TableCell align="center">{row.destination}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default requestList