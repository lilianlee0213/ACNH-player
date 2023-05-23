import styled from 'styled-components';

const AudioFile = styled.div`
	grid-area: c;
	width: 100%;
`;

const AudioMeta = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
`;

export default function Audio(props) {
	return (
		<AudioFile>
			<AudioMeta>
				<span>{props.time}</span>
				<input type="range" />
				<span>{props.duration}</span>
			</AudioMeta>
			<audio
				src={props.song}
				ref={props.songRef}
				onEnded={props.handleAudioEnded}
				onTimeUpdate={props.handleTimeUpdate}
				onLoadedMetadata={props.handleDuration}
				controls></audio>
		</AudioFile>
	);
}
