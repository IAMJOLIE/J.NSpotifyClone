import {Box, Button} from '@mui/material'
import {accessUrl} from '../../config/config'

 const Login = () => {
    return <Box 
            sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <img src="/Spotify_Logo.png" alt="spotify logo" style={{marginBottom: 300, width: '70%', maxWidth: '500px'}} />
        <Button variant='contained' color='primary' size='large' href={accessUrl} >
            login to Spotify
        </Button>
    </Box>
}

export  default Login;