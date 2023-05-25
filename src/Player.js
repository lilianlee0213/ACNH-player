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
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
	background-image: url('/images/background.jpeg');
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
	margin-bottom: 10px;
`;

const Album = styled.div`
	margin-bottom: 20px;
	padding: 0 10px;
	text-align: center;
`;

const AlbumTitle = styled.h1`
	margin-bottom: 10px;
	font-size: 24px;
	font-weight: 500;
	color: ${(props) => props.theme.black};
`;

const AlbumImg = styled.img`
	object-fit: cover;
	width: 100%;
	max-width: 230px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.35);
	margin-bottom: 40px;
`;

const Button = styled.button`
	font-size: 25px;
	i {
		color: ${(props) => props.theme.green};
		opacity: 1;
	}
`;

export default function Player() {
	const {data, isLoading} = useQuery('songs', getSongs);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [startTime, setStartTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [endTime, setEndTime] = useState(0);
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
		setProgress(startTime);
	}, [startTime]);

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
			setStartTime(inputValue);
		}
	};
	const handleTimeUpdate = () => {
		if (audioRef.current) {
			const seconds = Math.floor(audioRef.current.currentTime);
			setStartTime(seconds);
		}
	};
	const handleDuration = () => {
		if (audioRef.current) {
			const seconds = Math.floor(audioRef.current.duration);
			setEndTime(seconds);
		}
	};
	const handleAudioEnded = () => {
		handleNextSong();
	};

	const handleNextSong = () => {
		if (audioRef.current) {
			if (audioRef.current.readyState === 4 && !audioRef.current.isLoading) {
				audioRef.current.isLoading = true;
				previousSongIndex.current = currentSongIndex;
				setCurrentSongIndex((prevIndex) =>
					prevIndex === data?.length - 1 ? 0 : prevIndex + 1
				);
				changeSongTime();
			}
		}
	};

	const handlePrevSong = () => {
		if (audioRef.current) {
			if (audioRef.current.readyState === 4 && !audioRef.current.isLoading) {
				audioRef.current.isLoading = true;
				setCurrentSongIndex((prevIndex) =>
					prevIndex === 0 ? data?.length - 1 : prevIndex - 1
				);
				changeSongTime();
			}
		}
	};
	const changeSongTime = () => {
		setIsPlaying(false);
		setTimeout(() => {
			setIsPlaying(true);
			audioRef.current.isLoading = false;
		}, 300);
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
						time={formattedTime(parseInt(startTime))}
						duration={formattedTime(parseInt(endTime))}
						value={progress}
						finish={endTime}
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
