import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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
        <div>
            <Box sx={{ 
                backgroundColor: 'white',
                opacity: [0.9, 0.8, 0.75],
                borderRadius: "10px",
                height: "400px",
                width: "400px",
                }} >
                <div style={{position: 'absolute', top: "42%", left: "50%", transform: "translate(-50%, -50%)"}}>
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
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Capacity
                                    </InputLabel>
                                    <NativeSelect
                                    defaultValue={30}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                    </NativeSelect>
                                </FormControl>
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

            <div style={{
                color: "black", 
                float: "right",
                marginRight: "20px",
                textShadow: "0 0 10px #ebd9ce, 0 0 20px #ebd9ce, 0 0 30px #ede0d8, 0 0 40px #f5ede9, 0 0 50px #f5ede9"
            }}>    
                <Link href='/Driver/resign'>
                    <a><b><u>To Resign . . .</u></b></a>
                </Link>
            </div> 
        </div>
    )
}

export default DriverPageComponent