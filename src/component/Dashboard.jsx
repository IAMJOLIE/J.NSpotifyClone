import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SidNav from './sidNav/SidNav';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';
import Playlist from '../pages/Playlist';
import Player from './Player/Player';
import MobilNav from './MobilNav/MobilNav';
import Library from '../pages/Library';

const Dashboard = ({ spotifyApi }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [token, setToken] = useState(getAccessTokenFromStorage());
	useEffect(() => {
		async function onMount() {
		
			await spotifyApi.setAccessToken(token);
			
			setIsLoading(false)


		}
		if (token) {
			onMount();
		}
	}, []);

	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			{!isLoading && 
			<Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
			<SidNav spotifyApi={spotifyApi} token={token} />
			<Routes>
				<Route path="/playlist/:id" element={<Playlist spotifyApi={spotifyApi} token={token} />} />
				<Route path="/Library" element={<Library spotifyApi={spotifyApi} token={token} />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</Box>
			 }
			
			
			 {token &&  !isLoading  && <Player spotifyApi={spotifyApi} token={token} />} 
            <MobilNav/>
		</Box>
	);
};

export default Dashboard;
