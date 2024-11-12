import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import './NavItem.css';


const navItem = ({name, Icon, target}) => {
    return (  
       <NavLink className="navlink" to={target} style={{textDecoration: 'none'}}>
        <Box px={3} py={1} 
        sx={{
        display: {xs:'flex', md:'none'},
        alignItems: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {color: 'white'},
        trnasition: 'color 0.2s ease-in-out',
        fontSize: 14
        }}>
            {Icon && <Icon sx={{ fontSize: 28, marginRight: 1 }}/>}
            {name}
        </Box>
       </NavLink>
    );
}
 
export default navItem;