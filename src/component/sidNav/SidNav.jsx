import { useState, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import NavItem from "../NavItem";
import HomeIcon from '@mui/icons-material/Home';
import NavPlaylist from "../NavPlaylist/NavPlaylist";
const SidNav = ({spotifyApi, token}) => {
    const [playlist, setPlaylist] = useState ([]);
    const [loading, setLoading] = useState (true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();
            setPlaylist(data.body.items);
            setLoading(false);
			
			
		}
		getPlaylists();
	}, [spotifyApi, token]);

    const renderPlaylist = () => {
        if (loading) {

           return Array.from({ length: 20 }).map((_, i)=> <NavPlaylist key={i} loading={loading} />

           )}
           
           return playlist.map((playlist, i)=> <NavPlaylist name={playlist.name} id={playlist.id} loading={loading} key={i}/>)
    }

    return ( 
        <Box sx={{
            width: 230,
            height: '100%',
            bgcolor: 'background.default',
            display: {xs: 'none', md: 'flex'},
            flexDirection: 'column'
            }}>
        <Box p={3}>
            <img src="/Spotify_Logo.png" alt="spotify" width={'75%'}/>
        </Box>  
        <NavItem name="Home" Icon={HomeIcon} target="/"/>
        <Box px={3} py={1}>
            <Divider sx={{backgroundColor: '#ffffff40'}}/>
        </Box>   
        <Box sx={{ overflowY: 'auto', flex: 1}}>
            {renderPlaylist()}           
        </Box>
        </Box>
     );
}
 
export default SidNav;