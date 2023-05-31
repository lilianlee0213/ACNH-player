import {motion} from 'framer-motion';
import styled from 'styled-components';

const AudioFile = styled(motion.div)`
	width: 100%;
	margin-bottom: 10px;
`;

const ProgressBar = styled.input`
	appearance: none;
	margin-top: 34px;
	width: 100%;
	height: 5px;
	background: linear-gradient(
		to right,
		#f7c442 0%,
		#f7c442 ${(props) => (props.value / props.max) * 100}%,
		#f8eebc ${(props) => (props.value / props.max) * 100}%,
		#f8eebc 100%
	);
	outline: none;

	&::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #f29541;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
	&::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border: none;
		border-radius: 50%;
		background-color: #f29541;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
	&::-webkit-slider-thumb:hover {
		transform: scale(1.4);
	}

	&::-moz-range-thumb:hover {
		transform: scale(1.4);
	}
`;
const AudioMeta = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 2px;
	span {
		font-size: 14px;
		color: ${(props) => props.theme.gray};
	}
`;
export default function Audio(props) {
	return (
		<AudioFile
			style={{
				padding: props.showList ? '0 20px' : 'inherit',
				zIndex: props.showList ? 1000 : 0,
			}}
			animate={{
				opacity: props.showList ? [0, 1] : 1,
				transition: {delay: 0.25},
			}}>
			<ProgressBar
				type="range"
				step="1"
				min="0"
				max={props.finish}
				value={props.value}
				onInput={props.handleProgressBar}
			/>
			<AudioMeta>
				<span>{props.time}</span>
				<span>{props.duration}</span>
			</AudioMeta>
			<audio
				src={props.song}
				ref={props.songRef}
				onEnded={props.handleAudioEnded}
				onTimeUpdate={props.handleTimeUpdate}
				onLoadedMetadata={props.handleDuration}></audio>
		</AudioFile>
	);
}
