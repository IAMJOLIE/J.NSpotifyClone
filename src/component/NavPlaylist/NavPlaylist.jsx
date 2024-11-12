import { NavLink } from 'react-router-dom';
import './NavPlaylist.css';
import { Box, Skeleton } from '@mui/material';


const NavPlaylist = ({name, id, loading}) => {
    return ( 
        <NavLink className="playlist__navlink" to={loading ? '' : `/playlist/${id}`} style={{textDecoration: 'none'}}>
        <Box px={3} py={1} 
        sx={{
            
            cursor: 'pointer',
            '&:hover': {color: 'white'},
            transition: 'color 0.2s ease-in-out',

        }}>
            
            {loading ? <Skeleton variant="text" sx={{ fontSize: '15px' ,  }} /> : name}

        </Box>

        </NavLink>
     );
}
 
export default NavPlaylist;