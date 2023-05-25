import styled from 'styled-components';

const AudioFile = styled.div`
	grid-area: c;
	width: 100%;
`;

const AudioMeta = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 2px;
	span {
		font-size: 14px;
		color: #222;
	}
`;
const ProgressBar = styled.input`
	appearance: none;
	width: 100%;
	height: 5px;
	background: linear-gradient(
		to right,
		#f7d359 0%,
		#f7d359 ${(props) => (props.value / props.max) * 100}%,
		#f8eebc ${(props) => (props.value / props.max) * 100}%,
		#f8eebc 100%
	);

	outline: none;

	&::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: ${(props) => props.theme.darkGreen};
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
	&::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border: none;
		border-radius: 50%;
		background-color: ${(props) => props.theme.darkGreen};
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
export default function Audio(props) {
	return (
		<AudioFile>
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
				onLoadedMetadata={props.handleDuration}
				autoPlay></audio>
		</AudioFile>
	);
}
