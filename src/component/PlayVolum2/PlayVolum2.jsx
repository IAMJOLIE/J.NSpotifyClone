import { Slider, Stack, IconButton, Box } from '@mui/material';
import { useState } from 'react';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';

const PlayVolum2 = ({ player }) => {
	const defaultVolume = 50;
	const [volume, setVolume] = useState(defaultVolume);
	const [isSliderOpen, setIsSliderOpen] = useState(false); 

	const handleVolumeChange = async (v) => {
		try {
			await player.setVolume(v / 100);
		} catch (e) {
			console.error(e);
		}
	};

	const handleIconClick = () => {
			setIsSliderOpen((prev) => !prev);
	};


	return (
		<Stack direction="column" spacing={2} alignItems="center"   sx={{ position: 'relative',  color: 'text.primary'}}>
			
			<IconButton onClick={() => { handleIconClick() }}   sx={{  color: 'text.secondary' }}>
				{volume === 0 ? <VolumeOff /> : volume < 50 ? <VolumeDown /> : <VolumeUp />}
			</IconButton>

			
			{isSliderOpen && (
				<Box
					sx={{
                        direction: 'column',
						position: 'absolute',
						bottom: 30,
                        padding: 4,
                        height: 80
					}}
				>
					<Slider
                        orientation='vertical'
						value={volume}
						min={0}
						max={100}
						step={1}
						onChange={(e, v) => setVolume(v)}
						onChangeCommitted={(e, v) => handleVolumeChange(v)}
					/>
				</Box>
			)}
		</Stack>
	);
};

export default PlayVolum2;
