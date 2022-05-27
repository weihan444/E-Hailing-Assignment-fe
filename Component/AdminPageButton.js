import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link'
import ViewListIcon from '@mui/icons-material/ViewList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8d6e63',
    },
  },
});

export const AdminPageButton = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}>
            <Box sx={{ 
                '& button': { m:2 },
                backgroundColor: '#ffecb3',
                opacity: [1.0, 1.0, 0.95],
                borderRadius: "10px",
                height: "180px",
                width: "280px",
                }} >
            
                <div style={{position: 'absolute', top: "50%", left: "42%", transform: "translate(-50%, -50%)"}}>
                    <ThemeProvider theme={theme} >
                        <Link href="/Admin/request-list"> 
                            <Button variant="contained" fullWidth startIcon={<ViewListIcon />}>Request List</Button>
                        </Link>
                        <Link href="/Admin/driver-list">
                            <Button variant="contained" fullWidth startIcon={<ViewListIcon />}>Driver List</Button>
                        </Link>
                    </ThemeProvider>
                </div>
            </Box>
        </div>
    )
}

export default AdminPageButton