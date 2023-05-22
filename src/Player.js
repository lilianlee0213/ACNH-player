import {useQuery} from 'react-query';
import {getSongs} from './Api';
import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';

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
const MyPlayer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* gap: 15px; */
	height: 100%;
	max-width: 400px;
`;
const Menu = styled.div`
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
const Buttons = styled.div`
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
const Audio = styled.div`
	grid-area: c;
	width: 100%;
	/* height: 45px;
	border-radius: 35px; */
`;
const AudioMeta = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
`;
export default function Player() {
	const {data, isLoading} = useQuery('songs', getSongs);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef(null);
	const previousSongIndex = useRef(null);
	const song = data?.[currentSongIndex];

	useEffect(() => {
		const handleTimeUpdate = () => {
			if (audioRef.current) {
				const audioElement = audioRef.current;
				const audioCurrentTime = Math.floor(audioElement.currentTime);
				const minute = Math.floor(audioCurrentTime / 60);
				const second = audioCurrentTime % 60;
				const formattedTime = `${minute}:${second.toString().padStart(2, '0')}`;
				setCurrentTime(formattedTime);
			}
		};
		if (audioRef.current) {
			audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
		}

		return () => {
			if (audioRef.current) {
				audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
			}
		};
	}, []);

	useEffect(() => {
		const getDuration = () => {
			if (audioRef.current) {
				const audioElement = audioRef.current;
				const audioDuration = Math.floor(audioElement.duration);
				const minute = Math.floor(audioDuration / 60);
				const second = audioDuration % 60;
				const formattedDuration = `${minute}:${second
					.toString()
					.padStart(2, '0')}`;
				setDuration(formattedDuration);
			}
		};

		if (audioRef.current) {
			audioRef.current.addEventListener('loadedmetadata', getDuration);
		}

		return () => {
			if (audioRef.current) {
				audioRef.current.removeEventListener('loadedmetadata', getDuration);
			}
		};
	}, []);

	const handleAudioEnded = () => {
		handleNextSong();
	};
	const handleNextSong = () => {
		previousSongIndex.current = currentSongIndex;
		setCurrentSongIndex((prevIndex) => {
			let newIndex = prevIndex + 1;
			if (newIndex === data?.length) {
				newIndex = 0;
			}
			return newIndex;
		});
	};

	const handlePrevSong = () => {
		if (currentSongIndex === 0) {
			const lastIndex = data?.length - 1;
			previousSongIndex.current = lastIndex;
			setCurrentSongIndex(lastIndex);
		} else {
			const newIndex = currentSongIndex - 1;
			previousSongIndex.current = currentSongIndex;
			setCurrentSongIndex(newIndex);
		}
	};

	const handlePlay = () => {
		setIsPlaying((prev) => !prev);
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
		}
	};
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Wrapper>
			<Container>
				<MyPlayer>
					<Menu>
						<Button>
							<i className="fa-solid fa-bars"></i>
						</Button>
					</Menu>
					<Album>
						<AlbumTitle>{song.name['name-USen']}</AlbumTitle>
						<AlbumImg src={song.image_uri} />
					</Album>
					<Buttons>
						<Button onClick={handlePrevSong}>
							<i className="fa-solid fa-angles-left"></i>
						</Button>
						<Button onClick={handlePlay}>
							{isPlaying ? (
								<i className="fa-solid fa-pause"></i>
							) : (
								<i className="fa-solid fa-play"></i>
							)}
						</Button>
						<Button onClick={handleNextSong}>
							<i className="fa-solid fa-angles-right"></i>
						</Button>
					</Buttons>
					<Audio>
						<AudioMeta>
							<span>{currentTime}</span>
							<input type="range" />
							<span>{duration}</span>
						</AudioMeta>
						<audio
							src={song.music_uri}
							ref={audioRef}
							onEnded={handleAudioEnded}
							controls
							autoPlay={true}></audio>
					</Audio>
				</MyPlayer>
			</Container>
		</Wrapper>
	);
}
