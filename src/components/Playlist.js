import {motion} from 'framer-motion';
import styled from 'styled-components';

const SongContainer = styled(motion.div)`
	color: ${(props) => props.theme.black};
	background-color: ${(props) => props.theme.lightBlue};
	z-index: 2;
`;
const Title = styled.h1`
	margin-bottom: 20px;
	color: #5e8fc0;
`;
const CurrentSong = styled.div`
	margin-top: 20px;
	height: 210px;
	background-color: ${(props) => props.theme.lightGreen};
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
				<CurrentSong id={song.id} className="overlay-main__song">
					<div className="overlay-main__img">
						<img src={song.image_uri} alt={song.name['name-USen']} />
					</div>
					<h4 className="overlay-main__title">{song.name['name-USen']}</h4>
				</CurrentSong>
			);
		}
	};
	const getNextSongs = () => {
		if (props.songList) {
			return props.songList.slice(1).map((song) => (
				<motion.div
					onClick={() => props.navigateNextSong(song.id)}
					className="overlay-song__list"
					key={song.id}
					initial={{backgroundColor: 'rgba(255,255,255,0)'}}
					whileHover={{
						backgroundColor: 'rgba(255,255,255,1)',
						transition: {duration: 0.3},
					}}>
					<img
						className="overlay-song__img"
						src={song.image_uri}
						alt={song.name['name-USen']}
					/>
					<h4 className="overlay-song__title">{song.name['name-USen']}</h4>
				</motion.div>
			));
		}
	};
	return (
		<SongContainer
			className="overlay"
			variants={containerVariants}
			animate={props.showList ? 'show' : 'hide'}>
			<motion.div className="overlay-container">
				<>
					<Title style={{}} className="overlay-title">
						Playing Next
					</Title>
					{getNextSongs()}
					{getCurrentSong()}
				</>
			</motion.div>
		</SongContainer>
	);
}
