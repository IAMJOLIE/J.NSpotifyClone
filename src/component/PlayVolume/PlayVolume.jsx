import { Slider, Stack } from '@mui/material';
import { useState } from 'react';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';

const PlayVolume = ({ player }) => {
	const defaultVolume = 50;
	const [volume, setVolume] = useState(defaultVolume);

	const handleVolumeChange = async (v) => {
		try {
			await player.setVolume(v / 100);
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ width: {md: 150}, color: 'text.secondary' }}>
			{volume === 0 ? <VolumeOff /> : volume < 50 ? <VolumeDown /> : <VolumeUp />}
			<Slider
				min={0}
				max={100}
				step={1}
				value={volume}
				onChange={(e, v) => setVolume(v)}
				onChangeCommitted={async (_, v) => {
					handleVolumeChange(v);
				}}
			/>
		</Stack>
	);
};

export default PlayVolume;
