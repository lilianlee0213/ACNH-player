import {motion} from 'framer-motion';
import styled from 'styled-components';

const SongContainer = styled(motion.div)`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
	overflow-y: hidden;
	border-radius: 15px;
	color: ${(props) => props.theme.black};
`;
const ListContainer = styled.div`
	margin: 20px;
	text-align: center;
	h1 {
		margin: 10px 0;
		font-size: 24px;
		font-family: 'Mukta', sans-serif;
		font-weight: 600;
	}
`;
const FavoriteSong = styled.div`
	margin-bottom: 20px;
	padding: 10px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.lightPink};
	box-shadow: 0px 8px 35px -3px rgba(0, 0, 0, 0.15);
	h4 {
		font-size: 22px;
		text-transform: uppercase;
	}
`;
const FavoriteAlbum = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-bottom: 10px;
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
const SongList = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 5px;
	border-radius: 4px;
	/* &:not(:last-child) {
		margin-bottom: 10px;
	} */
	img {
		width: 50px;
		border-radius: 4px;
	}
	h4 {
		font-size: 18px;
		text-transform: uppercase;
	}
`;
const Button = styled(motion.button)`
	font-size: 25px;
	color: ${(props) => props.theme.yellow};
`;

export default function Songs(props) {
	const getFavoriteSong = (section) => {
		if (section) {
			return (
				<FavoriteSong key={section[0].id} id={section[0].id}>
					<FavoriteAlbum>
						<img src={section[0].image_uri} />
					</FavoriteAlbum>
					<h4>{section[0].name['name-USen']}</h4>
				</FavoriteSong>
			);
		}
	};
	const songs = (section) => {
		if (section) {
			return section.slice(1).map((song) => (
				<SongList
					key={song.id}
					id={song.id}
					whileHover={{
						backgroundColor: 'white',
					}}>
					<img src={song.image_uri} alt="" />
					<h4>{song.name['name-USen']}</h4>
				</SongList>
			));
		}
	};
	return (
		<SongContainer
			style={{
				backgroundColor:
					props.selectedSection === 'top-songs'
						? '#BCDFF8'
						: props.selectedSection === 'isabelle-picks'
						? '#FFF2BB'
						: props.selectedSection === 'tom-picks'
						? '#CFF9DB'
						: '#f8eebc',
			}}
			animate={{
				height: props.showList ? '100%' : 0,
			}}>
			<ListContainer>
				{props.showList && props.selectedSection === 'top-songs' && (
					<>
						<h1 style={{color: '#5E8FC0'}}>Top Songs</h1>
						<div>{getFavoriteSong(props.topSongs)}</div>
						<div>{songs(props.topSongs)}</div>
					</>
				)}
				{props.showList && props.selectedSection === 'isabelle-picks' && (
					<>
						<h1 style={{color: '#E6BE2F'}}>Isabelle's Picks</h1>
						<div>{getFavoriteSong(props.isabellePicks)}</div>
						<div>{songs(props.isabellePicks)}</div>
					</>
				)}
				{props.showList && props.selectedSection === 'tom-picks' && (
					<>
						<h1 style={{color: '#62AB7A'}}>Tom Nook's Picks</h1>
						<div>{getFavoriteSong(props.tomPicks)}</div>
						<div>{songs(props.tomPicks)}</div>
					</>
				)}
				{props.showList && (
					<Button
						onClick={props.handleToggle}
						whileHover={{scale: 1.2, transition: {type: 'tween'}}}>
						<i className="fa-solid fa-chevron-down show-icon" />
					</Button>
				)}
			</ListContainer>
		</SongContainer>
	);
}
