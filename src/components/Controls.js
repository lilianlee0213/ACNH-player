import styled from 'styled-components';

const ControlButton = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	gap: 20px;
	margin-bottom: 20px;
`;

const Button = styled.button`
	font-size: 25px;
	i {
		color: ${(props) => props.theme.darkBlue};
		opacity: 0.8;
	}
	&:hover {
		i {
			opacity: 1;
		}
	}
`;
export default function Controls(props) {
	return (
		<ControlButton>
			<Button onClick={props.handlePrevSong}>
				<i className="fa-solid fa-angles-left"></i>
			</Button>
			<Button onClick={props.handlePlay}>
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
