import {motion} from 'framer-motion';
import styled from 'styled-components';
const Container = styled(motion.div)`
	position: absolute;
	left: 0;
	bottom: 0px;
	width: 290px;
	height: 0;
	color: ${(props) => props.theme.black};
	background-color: ${(props) => props.theme.lightBlue};
	border-radius: 15px;
	z-index: 2;
	overflow-y: hidden;
`;
const ListContainer = styled(motion.div)`
	margin: 20px;
	text-align: center;
	h1 {
		margin-bottom: 20px;
		font-size: 24px;
		font-family: 'Mukta', sans-serif;
		font-weight: 600;
	}
`;
const SongList = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 5px;
	border-radius: 4px;
	img {
		width: 50px;
		border-radius: 4px;
	}
	h4 {
		font-size: 18px;
		text-transform: uppercase;
	}
`;
const CurrentSong = styled.div`
	height: 210px;
	margin-top: 20px;
	padding: 10px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.lightGreen};
	box-shadow: 0px 8px 35px -3px rgba(0, 0, 0, 0.15);
	h4 {
		font-size: 22px;
		text-transform: uppercase;
	}
`;
const CurrentAlbum = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-bottom: 5px;
	padding: 5px;
	width: 80px;
	border-radius: 50%;
	background-color: white;
	box-shadow: 0px 8px 15px -3px rgba(0, 0, 0, 0.15);
	aspect-ratio: 1;
	img {
		border-radius: 50%;
		width: 100%;
	}
`;

const containerVariants = {
	show: {
		height: '100%',
		transition: {duration: 0.5},
	},
	hide: {
		height: 0,
		transition: {duration: 0.5},
	},
};
export default function Playlist(props) {
	const getCurrentSong = () => {
		if (props.songList) {
			let song = props.songList[0];
			return (
				<CurrentSong id={song.id}>
					<CurrentAlbum>
						<img src={song.image_uri} />
					</CurrentAlbum>
					<h4>{song.name['name-USen']}</h4>
				</CurrentSong>
			);
		}
	};
	const getNextSongs = () => {
		if (props.songList) {
			return props.songList.slice(1).map((song) => (
				<SongList
					key={song.id}
					initial={{backgroundColor: 'rgba(255,255,255,0)'}}
					whileHover={{
						backgroundColor: 'rgba(255,255,255,1)',
						transition: {duration: 0.3},
					}}>
					<img src={song.image_uri} alt="" />
					<h4>{song.name['name-USen']}</h4>
				</SongList>
			));
		}
	};
	return (
		<Container
			variants={containerVariants}
			animate={props.showList ? 'show' : 'hide'}>
			<ListContainer>
				<>
					<h1 style={{color: '#5E8FC0'}}>Playing Next</h1>
					{getNextSongs()}
					{getCurrentSong()}
				</>
			</ListContainer>
		</Container>
	);
}
