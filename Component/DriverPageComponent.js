import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Button } from '@mui/material';


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
                backgroundColor: 'yellow',
                opacity: [1.0, 1.0, 0.95],
                borderRadius: "10px",
                height: "230px",
                width: "380px",
                }} >
                <div style={{position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
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
                    <Button sx={{float: 'right'}}>Add</Button>
                </div>
                

            </Box>
        </div>
    )
}

export default DriverPageComponent