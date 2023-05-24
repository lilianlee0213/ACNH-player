import {useQuery} from 'react-query';
import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {getSongs} from './Api';
import Audio from './components/Audio';
import Controls from './components/Controls';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin: 0 20px;
`;

const Container = styled.div`
	position: relative;
	padding: 20px 20px 15px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
	background-image: url('/images/wave-haikei.png');
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
`;

const PlayerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	max-width: 400px;
`;

const MenuButton = styled.div`
	align-self: flex-start;
`;

const Album = styled.div`
	margin-bottom: 15px;
	padding: 0 10px;
	text-align: center;
`;

const AlbumTitle = styled.h1`
	margin-bottom: 5px;
	font-size: 24px;
	font-weight: 500;
	color: ${(props) => props.theme.darkBlue};
`;

const AlbumImg = styled.img`
	object-fit: cover;
	width: 100%;
	max-width: 230px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.35);
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

export default function Player() {
	const {data, isLoading} = useQuery('songs', getSongs);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [time, setTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef(null);
	const previousSongIndex = useRef(null);
	const song = data?.[currentSongIndex];
	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [isPlaying]);
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.play();
			setIsPlaying(true);
		}
	}, [currentSongIndex]);

	useEffect(() => {
		setProgress(time);
	}, [time]);

	const formattedTime = (sec) => {
		const minute = Math.floor(sec / 60);
		const second = sec % 60;
		return `${minute}:${second.toString().padStart(2, '0')}`;
	};

	const handleProgressBar = (event) => {
		const inputValue = event.target.value;
		setProgress(inputValue);
		if (audioRef.current) {
			audioRef.current.currentTime = inputValue;
			setTime(inputValue);
		}
	};
	const handleTimeUpdate = () => {
		if (audioRef.current) {
			const seconds = Math.floor(audioRef.current.currentTime);
			setTime(seconds);
		}
	};
	const handleDuration = () => {
		if (audioRef.current) {
			const seconds = Math.floor(audioRef.current.duration);
			setDuration(seconds);
		}
	};
	const handleAudioEnded = () => {
		handleNextSong();
	};

	const handleNextSong = () => {
		previousSongIndex.current = currentSongIndex;
		setCurrentSongIndex((prevIndex) => {
			return prevIndex === data?.length - 1 ? 0 : prevIndex + 1;
		});
	};

	const handlePrevSong = () => {
		setCurrentSongIndex((prevIndex) =>
			prevIndex === 0 ? data?.length - 1 : prevIndex - 1
		);
	};

	const handlePlay = () => {
		setIsPlaying((prev) => !prev);
		if (audioRef.current) {
			isPlaying ? audioRef.current.play() : audioRef.current.pause();
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Wrapper>
			<Container>
				<PlayerContainer>
					<MenuButton>
						<Button>
							<i className="fa-solid fa-bars"></i>
						</Button>
					</MenuButton>
					<Album>
						<AlbumTitle>{song.name['name-USen']}</AlbumTitle>
						<AlbumImg src={song.image_uri} alt="Album Cover" />
					</Album>
					<Controls
						handlePrevSong={handlePrevSong}
						handlePlay={handlePlay}
						handleNextSong={handleNextSong}
						isPlaying={isPlaying}
						button={Button}
					/>
					<Audio
						time={formattedTime(parseInt(time))}
						duration={formattedTime(parseInt(duration))}
						value={progress}
						finish={duration}
						handleProgressBar={handleProgressBar}
						song={song.music_uri}
						songRef={audioRef}
						handleAudioEnded={handleAudioEnded}
						handleTimeUpdate={handleTimeUpdate}
						handleDuration={handleDuration}
					/>
				</PlayerContainer>
			</Container>
		</Wrapper>
	);
}
