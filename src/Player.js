import {useQuery} from 'react-query';
import {getSongs} from './Api';
import styled from 'styled-components';
import Wave from './components/Wave';
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
	padding: 8vw;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
	background-color: ${(props) => props.theme.bgColor1};
	/* height: 500px; */
`;
const MyPlayer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	height: 100%;
	max-width: 400px;
`;
const Menu = styled.div`
	align-self: flex-start;
`;
const Album = styled.div`
	margin-bottom: 20px;
`;
const AlbumImg = styled.img`
	object-fit: cover;
	width: 100%;
	max-width: 250px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.35);
`;
const Buttons = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	gap: 20px;
`;
const Button = styled.button`
	font-size: 6vw;
	i {
		color: ${(props) => props.theme.blue};
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
`;
export default function Player() {
	const {data, isLoading} = useQuery('songs', getSongs);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const audioRef = useRef(null);
	const previousSongIndex = useRef(null);
	const randomIndex = data ? Math.floor(Math.random() * data.length) : 0;
	const song = data?.[currentSongIndex];

	const handleNextSong = () => {
		previousSongIndex.current = currentSongIndex;
		setCurrentSongIndex(randomIndex);
	};

	const handlePrevSong = () => {
		if (previousSongIndex.current !== null) {
			setCurrentSongIndex(previousSongIndex.current);
		}
	};

	const handleAudioEnded = () => {
		setIsPlaying(false);
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
	// if (!currentSong) {
	// 	setcurrentSong(song);
	// 	console.lopg
	// }

	return (
		<Wrapper>
			<Container>
				<Wave />
				<MyPlayer>
					<Menu>
						<Button>
							<i className="fa-solid fa-bars"></i>
						</Button>
					</Menu>
					<Album>
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
						<h1>{song.name['name-USen']}</h1>
						<audio
							src={song.music_uri}
							ref={audioRef}
							onEnded={handleAudioEnded}
							controls></audio>
					</Audio>
				</MyPlayer>
			</Container>
		</Wrapper>
	);
}
