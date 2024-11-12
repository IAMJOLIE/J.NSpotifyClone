import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PlayControls from '../PlayControls/PlayControls';
import PlayVolume from '../PlayVolume/PlayVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';
import { getAccessTokenFromStorage } from '../../../utils/getAccessTokenFromStorage';
const Player = ({ spotifyApi }) => {
	const [localPlayer, setLocalPlayer] = useState(null);
	const [is_paused, setPaused] = useState(false);
	const [current_track, setTrack] = useState(null);
	const [device, setDevice] = useState(null);
	const [duration, setDuration] = useState(null);
	const [progress, setProgress] = useState(null);
	const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);

	useEffect(() => {
		const token = getAccessTokenFromStorage();
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'J.N player',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				setDevice(device_id);
				setLocalPlayer(player);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', (state) => {
				if (!state || !state.track_window?.current_track) return;
				

				const duration = state.track_window.current_track.duration_ms / 1000;
                const position = state.position / 1000;
                setDuration(duration);
                setProgress(position);
				setTrack(state.track_window.current_track);
				setPaused(state.paused);

				
			});
			
			setLocalPlayer(player)

			player.connect();
		};
	}, []);

	useEffect(() => {
		if (!localPlayer) return;
		async function connectPlayer() {
			await localPlayer.connect();
		}

		connectPlayer();
		return () => {
			localPlayer.disconnect();
		};
	}, [localPlayer]);

	{
		useEffect(() => {
			const transferMyPlayback = async () => {
				if (device) {
					await spotifyApi.transferMyPlayback([device], true);
				}
			};
			const getDeviceFromApi = async () => {
				await spotifyApi.getMyDevices();
			};
			getDeviceFromApi();
			transferMyPlayback();
		}, [device, spotifyApi]);
	
	}
	return (
		<Box>
			<Grid
				onClick={() => setPlayerOverlayIsOpen((prevState) => !prevState)}
				container
				px={3}
				sx={{
					backgroundColor: 'background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100',
					borderTop: '1px solid #292929'
				}}
			>
				<Grid xs={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} item>
					{' '}
					<Avatar
						src={current_track?.album.images[0].url}
						alt={'#'}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}>{current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
							{current_track?.artists?.map((artist) => artist.name).join(', ')}
						</Typography>
					</Box>
				</Grid>
				<Grid
					xs={6}
					md={4}
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}
					item
				>
					
						<PlayControls
							is_paused={is_paused}
							progress={progress}
							duration={duration}
							player={localPlayer}
						/>
					
				</Grid>
				<Grid
					xs={6}
					md={4}
					sx={{ display: {md: 'flex', xs: 'none' }, alignItems: 'center', justifyContent: 'flex-end' }}
					item
				>
					<PlayVolume player={localPlayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
				playerOverlayIsOpen={playerOverlayIsOpen}
				closeOverlay={() => setPlayerOverlayIsOpen(false)}
				is_paused={is_paused}
				progress={progress}
				duration={duration}
				player={localPlayer}
				current_track={current_track}
				
			/>
		</Box>
	);
};

export default Player;
