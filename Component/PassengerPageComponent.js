import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Link from 'next/link'


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

const PassengerPageComponent = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      }}>
        <Box sx={{ 
              backgroundColor: 'white',
              opacity: 0.95,
              borderRadius: "10px",
              height: "400px",
              width: "400px",
              }} >
                <div style={{position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <form action='' method='put'>
                        <ThemeProvider theme={theme} >
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PersonIcon sx={{mr: 1, my: 1}}/>
                                <TextField variant="standard" label="Name" size='small'/>
                            </Box>
                            <Space />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <DirectionsCarIcon sx={{mr: 1, my: 1}}/>
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
                                <LocationOnIcon sx={{mr: 1, my: 1}}/>
                                <Box>
                                  <TextField variant="standard" label="From" size='small'/>
                                  <TextField variant="standard" label="To" size='small'/>
                                </Box>
                            </Box>
                            <Space />  
                            <Link href="/"> 
                            <Button sx={{float: 'left'}} type="submit" variant='contained'>Back</Button>
                            </Link>
                            <Link href="/DriverInfo"> 
                            <Button sx={{float: 'right'}} type="submit" variant='contained'>Next</Button>
                            </Link>

                            </ThemeProvider>

                  </form>
           </div>
        </Box>
    </div>
  )
}

export default PassengerPageComponent

