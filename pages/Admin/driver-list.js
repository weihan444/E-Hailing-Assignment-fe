import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { drivers } from '../data/data'
import { styled } from '@mui/material/styles';
import Head from 'next/head';


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
    '&:last-child td, &:last-child th': {
        border: 0,
      },
}))


export async function getStaticProps() {
    const data = await drivers
  
    return {
      props: { list : data },
    }
}

const requestList = ({list}) => {
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
        <TableContainer>
            <Table sx={{ minWidth: 100 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Driver</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Capacity</StyledTableCell>
                        <StyledTableCell align="center">Location</StyledTableCell>
                        <StyledTableCell align="center">Customer</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {list.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell>{row.driver}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center">{row.capacity}</StyledTableCell>
                            <StyledTableCell align="center">{row.location}</StyledTableCell>
                            <StyledTableCell align="center">{row.customer}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default requestList