import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
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


const DriverInfoPageComponent = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}>
            <Box sx={{ backgroundColor: 'white', opacity: [0.9, 0.8, 0.75], borderRadius: "10px", 
                       height: "400px", width: "400px",}} >
            </Box>
            <div style={{position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <form action='' method='put'>
                        <ThemeProvider theme={theme} >
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PersonIcon sx={{mr: 1, my: 1}}/>
                                <TextField id="standard-read-only-input" label="Driver Name" defaultValue="Ali tay" 
                                InputProps={{readOnly: true,}} variant="standard"/>
                            </Box>
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <DirectionsCarFilledIcon sx={{mr: 1, my: 1}}/>
                                <TextField id="standard-read-only-input" label="Plat Number" defaultValue="JQJ 7166" 
                                InputProps={{readOnly: true,}} variant="standard"/>
                            </Box>
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccessTimeIcon sx={{mr: 1, my: 1}}/>
                                <TextField id="standard-read-only-input" label="Expected Arrival Time" defaultValue="16:45" 
                                InputProps={{readOnly: true,}} variant="standard"/>
                            </Box>

                        </ThemeProvider>
                </form>
            </div>       
        </div>
    )
}

export default DriverInfoPageComponent