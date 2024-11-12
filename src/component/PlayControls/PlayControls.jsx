import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import { formatTime } from '../../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PlayVolum2 from '../PlayVolum2/PlayVolum2';

const PlayControls = ({ is_paused, progress, duration, player }) => {
	const [currenctProgress, setCurrenctprogress] = useState(progress);
	const skipStyle = { width: 28, height: 28 };
	const playStyle = { width: 38, height: 38 };

	useEffect(() => {
		const intervallId = setInterval(() => {
			if (!is_paused && player) {
				setCurrenctprogress((prevState) => prevState + 1);
			}
		}, 1000);
		return () => clearInterval(intervallId);
	}, [is_paused, player]);

	useEffect(() => {
		setCurrenctprogress(progress);
	}, [progress]);

	return (
		<Stack direction={'column'} spacing={2} justify="center" alignItems="center" sx={{ width: '100%' }}>
			<Stack  direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrenctprogress(0);
						player.previousTrack();
					}}
				>
					<SkipPrevious sx={skipStyle} />
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						player.togglePlay();
					}}
				>
					{is_paused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrenctprogress(0);
						player.nextTrack();
					}}
				>
					<SkipNext sx={skipStyle} />
				</IconButton>
				<Box  sx={{  display: {md: 'none', xs: 'flex'}, justifyContent: 'flex-end' }} >
				
				<PlayVolum2 player={player} />

				</Box>
			</Stack>
			
			
			<Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(currenctProgress)}</Typography>
				<Slider
					max={duration}
					value={currenctProgress}
					min={0}
					size="medium"
					width="100"
					onChange={(e, value) => {
						console.log('change', value);
						setCurrenctprogress(value);
					}}
					onChangeCommitted={(e, value) => {
						player.seek(value * 1000);
						console.log('commit', value);
					}}
				/>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(duration)}</Typography>
			</Stack>
		</Stack>
	);
};

export default PlayControls;
