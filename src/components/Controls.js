import styled from 'styled-components';

const ControlButton = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 80%;
	gap: 20px;
	margin-bottom: 10px;
`;

const Button = styled.button`
	font-size: 22px;
	color: ${(props) => props.theme.beige};
	transition: all 0.2s ease-in-out;
	opacity: 0.8;
	&.play-btn {
		width: 50px;
		height: 50px;
		border: 2px solid ${(props) => props.theme.beige};
		border-radius: 50%;
		font-size: 30px;

		.fa-play {
			padding-left: 6px;
			font-size: 28px;
		}
	}
	&:hover {
		opacity: 1;
	}
	&.play-btn:hover {
		transform: scale(1.1);
	}
`;
export default function Controls(props) {
	return (
		<ControlButton>
			<Button onClick={props.handlePrevSong}>
				<i className="fa-solid fa-angles-left"></i>
			</Button>
			<Button onClick={props.handlePlay} className="play-btn">
				{props.isPlaying ? (
					<i className="fa-solid fa-pause"></i>
				) : (
					<i className="fa-solid fa-play"></i>
				)}
			</Button>
			<Button onClick={props.handleNextSong}>
				<i className="fa-solid fa-angles-right"></i>
			</Button>
		</ControlButton>
	);
}
