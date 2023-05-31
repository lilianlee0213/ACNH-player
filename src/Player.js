import {useQuery} from 'react-query';
import {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import {getSongs} from './Api';
import Audio from './components/Audio';
import Controls from './components/Controls';
import Playlist from './components/Playlist';

const Loading = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.fa-spinner {
		font-size: 50px;
		color: ${(props) => props.theme.yellow};
	}
`;
const Container = styled.div`
	padding: 20px 20px 10px;
	border-radius: 15px;
	background: ${(props) =>
		props.isLoading ? props.theme.green : 'url("/images/background.jpeg")'};
	background-size: cover;
	background-position: bottom;
	background-repeat: no-repeat;
`;

const PlayerContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	max-width: 400px;
`;

const MenuButton = styled.div`
	align-self: flex-start;
	margin-bottom: 10px;
`;

const Album = styled.div`
	height: 300px;
`;

const AlbumTitle = styled.h1`
	margin-bottom: 20px;
	font-size: 24px;
	font-weight: 500;
	color: ${(props) => props.theme.black};
	text-align: center;
`;
const AlbumCover = styled.div`
	position: relative;
	max-width: 230px;
	margin-bottom: 40px;
`;
const AlbumImg = styled.img`
	position: absolute;
	left: -5px;
	object-fit: cover;
	width: 190px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.35);
	z-index: 1;
`;
const Vinyl = styled(motion.div)`
	position: absolute;
	right: -35px;
	img {
		object-fit: cover;
	}
	.vinyl-image {
		position: relative;
		width: 190px;
	}
	.album-image {
		position: absolute;
		width: 65px;
		height: 65px;
		border-radius: 50%;
		right: 63px;
		top: 63px;
	}
`;
const Button = styled(motion.button)`
	margin: 0 auto;
	width: fit-content;
	font-size: 25px;
	.fa-bars {
		color: ${(props) => props.theme.green};
	}
	&.show-btn {
		z-index: ${(props) => (props.showList ? 1000 : 0)};
	}
	.show-icon {
		color: ${(props) => props.theme.yellow};
	}
	.close-icon {
		color: ${(props) => props.theme.blue};
	}
`;
export default function Player() {
	const {data, isLoading} = useQuery('songs', getSongs);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [startTime, setStartTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [endTime, setEndTime] = useState(0);
	const [showList, setShowList] = useState(false);
	const audioRef = useRef(null);
	const previousSongIndex = useRef(null);
	const song = data?.[currentSongIndex];
	let songList;
	const lastIndex = data?.length - 1;
	if (currentSongIndex <= lastIndex) {
		if (currentSongIndex + 4 <= lastIndex) {
			songList = data?.slice(currentSongIndex, currentSongIndex + 4);
		} else {
			const remaining = 4 - (lastIndex - currentSongIndex + 1);
			songList = [
				...data?.slice(currentSongIndex),
				...data?.slice(0, remaining),
			];
		}
	}
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
	const ToggleShowList = () => {
		setShowList((prev) => !prev);
	};
	return (
		<div className="wrapper">
			<Container isLoading={isLoading} className="app-container">
				{isLoading ? (
					<Loading>
						<motion.i
							className="fa-solid fa-spinner"
							animate={{rotate: 360}}
							transition={{
								ease: 'linear',
								duration: 2,
								repeat: Infinity,
							}}></motion.i>
					</Loading>
				) : (
					<PlayerContainer>
						<MenuButton>
							<Button>
								<i className="fa-solid fa-bars"></i>
							</Button>
						</MenuButton>
						<Album>
							<AlbumTitle>{song.name['name-USen']}</AlbumTitle>
							<AlbumCover>
								<AlbumImg src={song.image_uri} alt={song.name['name-USen']} />
								<Vinyl
									animate={isPlaying ? {rotate: 360} : {rotate: 0}}
									transition={
										isPlaying
											? {ease: 'linear', duration: 2, repeat: Infinity}
											: {}
									}>
									<img
										src="/images/vinyl.png"
										alt="vinyl"
										className="vinyl-image"
									/>
									<img
										src={song.image_uri}
										alt={song.name['name-USen']}
										className="album-image"
									/>
								</Vinyl>
							</AlbumCover>
						</Album>
						<Controls
							handlePrevSong={handlePrevSong}
							handlePlay={handlePlay}
							handleNextSong={handleNextSong}
							isPlaying={isPlaying}
							button={Button}
						/>
						<Audio
							showList={showList}
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
						<Button
							style={{
								zIndex: showList && '1000',
								marginBottom: showList && '10px',
							}}
							className="show-btn"
							onClick={ToggleShowList}
							whileHover={{scale: 1.2, transition: {type: 'tween'}}}>
							{showList ? (
								<i className="fa-solid fa-chevron-down close-icon"></i>
							) : (
								<i className="fa-solid fa-chevron-up show-icon"></i>
							)}
						</Button>
						<Playlist showList={showList} songList={songList} />
					</PlayerContainer>
				)}
			</Container>
		</div>
	);
}
