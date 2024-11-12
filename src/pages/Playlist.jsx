import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState, useCallback  } from "react";
import { useParams} from "react-router-dom";
import SongTable from "../component/SongTable/SongTable";


const Playlist = ({ spotifyApi, token}) => {
    const [playlistInfo, setPlaylistInfo] = useState();
    const [songs, setSongs] = useState([]);
    const [status, setStatus] = useState ({isLoading: true, isError: null});
    const { id } = useParams();

    const formatSongs = useCallback( 
        (items) =>  
        items.map((item, i) => {
        const {track } = item;
        track.contextUri = `spotify:playlist:${id}`;
        track.position = i;
        return track;
    }), [id]);
   
    useEffect(()=> {
       async function getData () {
        setStatus({isLoading: true, isError: null});
        try{
            const playlistDetail = await spotifyApi.getPlaylist(id);
            setPlaylistInfo({
                image: playlistDetail.body.images[0].url,
                name: playlistDetail.body.name
            });
            const {items} = playlistDetail.body.tracks;

            const formatedSongs = formatSongs(items);
            setSongs(formatedSongs)
            console.log('i am here ');
            
          
        } catch (e){
            console.log(e)
            setStatus({isLoading: false, isError: e});
        }
            


        }

        getData().finally(() => {
            setStatus({isLoading: false, isError: null});
        });
    },[id, formatSongs, spotifyApi, token]);


    return ( 
        <Box id="playlist__page" sx={{backgroundColor: '#121212', flex: 1, overflowY: 'auto'}}>
            
                <Box p={{xs: 3, md: 4}} 
                sx={{
                    width: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%);',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
					gap: 3,
					boxSizing: 'border-box',
					flexDirection: { xs: 'column', md: 'row' }

                }}>
                   
                   <Avatar  src={playlistInfo?.image} variant="square" alt={playlistInfo?.name} sx={{boxShadow: 15, width: {xs: '100%', md: 235}, height: {xs: '100%', md: 235}}}/>
                    <Box>
                        <Typography sx={{fontSize: 12, fontWeight: 'bold', color: '#ffffff' }}>Playlist</Typography>
                    {status.isLoading ? 
                    (<Skeleton variant="text" sx={{fontSize: { xs: 42, md: 72 }, width: 200}} /> ) : (
                        <Typography sx={{fontSize: { xs: 42, md: 72 }, fontWeight: 'bold', color: '#ffffff' }}>
                        {playlistInfo?.name}
                    </Typography>
                    )}
                        
                    </Box>
                </Box>
        <SongTable songs={songs} loading={status.isLoading} spotifyApi={spotifyApi} />       

        </Box>
     );
}
 
export default Playlist;