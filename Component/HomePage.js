import Button from '@mui/material/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HailIcon from '@mui/icons-material/Hail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link'

const theme = createTheme({
    palette: {
      primary: {
        main: '#263238',
      },
    },
  });

function HomePage() {
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        }}>
        <Box sx={{ 
            '& button': { m:3 },
            backgroundColor: 'white',
            opacity: [0.9, 0.8, 0.7],
            borderRadius: "10px",
            height: "300px",
            width: "300px",
            }} >
            
            <div style={{position: 'absolute', top: "50%", left: "42%", transform: "translate(-50%, -50%)"}}>
                <ThemeProvider theme={theme} >
                    <Link href="/Driver"> 
                        <Button variant="outlined" startIcon={<DirectionsCarIcon />} fullWidth>Driver</Button>
                    </Link>
                    <Link href="/Passenger">
                        <Button variant="outlined" startIcon={<HailIcon />} fullWidth>Passenger</Button>
                    </Link>
                    <Link href="/Admin">
                        <Button variant="outlined" startIcon={<AdminPanelSettingsIcon />} fullWidth>Admin</Button>
                    </Link>
                </ThemeProvider>
            </div>
        </Box>
    </div>
  )
}

export default HomePage