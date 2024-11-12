import { Box, Button } from "@mui/material";
const Home = () => {
    return ( 

       <Box sx= {{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#121212',
        
        gap: 4,
       }}>
        <img src="/Jolie.jpg" alt="Julia" style={{ maxWidth: '50%', maxHeight: '50%'}} />
        <Button variant='contained'
         href="mailto:julia_157nalband@outlook.com" size="large"
         target="_blank">
            Kontakta mig 
        </Button>
       </Box>
     );
}
 
export default Home;