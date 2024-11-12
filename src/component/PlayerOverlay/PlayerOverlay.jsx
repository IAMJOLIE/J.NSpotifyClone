import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayControls from '../PlayControls/PlayControls';

import PlayVolum2 from '../PlayVolum2/PlayVolum2';


const PlayerOverlay = ({
	playerOverlayIsOpen,
	closeOverlay,
	is_paused,
	progress,
	duration,
	player,
	current_track
	
}) => {
	return (
		<Box
			id="PlayerOverlay"
			sx={{
				width: '100%',
				height: 'calc(100vh - 75px)',
				backgroundColor: 'background.paper',
				display: { xs: 'block', md: 'none' },
				position: 'fixed',
				top: 0,
				left: 0,
				transition: 'all o.3s',
				transform: playerOverlayIsOpen ? 'translateY(0px)' : 'translateY(100vh)'
			}}
		>
			<Container sx={{ height: '100%', background: 'linear-gradient(0deg, #121212 0%, #39d47230 100%)' }}>
				<Grid container direction={'column'} justifyContent={'space-between'} sx={{ height: '100%' }}>
					<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
						<IconButton onClick={closeOverlay} sx={{ paddingLeft: 0 }}>
							<KeyboardArrowDownIcon sx={{ color: 'text.primary' }} fontSize="large" />
						</IconButton>
					</Grid>
					<Grid
						item
						xs={5}
						sx={{
							backgroundImage: `url(${current_track?.album.images[0].url})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover'
						}}
					></Grid>
					<Grid item xs={1}>
						<Typography sx={{ color: 'text.primary', fontSize: '28px' }}>{current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: '18px' }}>
							{current_track?.artists?.map((artist) => artist.name).join(', ')}
						</Typography>
						
					</Grid>
					
					
					<Grid item xs={1}  sx={{ display:  'flex', gap: 0, margin: 0 }}>
					
							<PlayControls
								is_paused={is_paused}
								progress={progress}
								duration={duration}
								player={player}
							/>
							
					</Grid>
					
					
					
				</Grid>
			</Container>
		</Box>
	);
};

export default PlayerOverlay;
