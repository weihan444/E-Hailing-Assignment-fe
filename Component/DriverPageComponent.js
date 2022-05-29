import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#263238',
        },
    },
});

function Space() {
    return (
        <Box
            sx={{
            height: 30,
            backgroundColor: (theme) =>
            theme.palette.mode === 'none'
            }}
        />
    );
}


const DriverPageComponent = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}>
            <Box sx={{ 
                backgroundColor: 'white',
                opacity: [0.9, 0.8, 0.75],
                borderRadius: "10px",
                height: "400px",
                width: "400px",
                }} >
                <div style={{position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <form action='' method='put'>
                        <ThemeProvider theme={theme} >
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircleIcon sx={{mr: 1, my: 1}}/>
                                <TextField variant="standard" label="Name" size='small'/>
                            </Box>
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <DirectionsCarIcon sx={{mr:1, my: 1}}/>
                                <TextField variant="standard" label="Car size" size='small'/>
                            </Box>
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocationOnIcon sx={{mr:1, my: 1}} />
                                <Box>
                                    <TextField variant="standard" label="Longitude" size='small'/>
                                    <TextField variant="standard" label="Latitude" size='small'/>
                                </Box>
                            </Box>
                            <Space />
                            <Button sx={{float: 'right'}} type="submit" variant='contained'>Add</Button>
                        </ThemeProvider>
                    </form>
                </div>
            </Box>
        </div>
    )
}

export default DriverPageComponent