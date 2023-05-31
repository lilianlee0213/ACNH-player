import {motion} from 'framer-motion';
import styled from 'styled-components';

const SongContainer = styled(motion.div)`
	color: ${(props) => props.theme.black};
`;
const Title = styled.h1`
	margin: 10px 0;
`;
const FavoriteSong = styled.div`
	margin-bottom: 20px;
	background-color: ${(props) => props.theme.lightPink};
`;
const Button = styled(motion.button)`
	font-size: 25px;
	color: ${(props) => props.theme.yellow};
`;

export default function DiscoverList(props) {
	const getFavoriteSong = (section) => {
		if (section) {
			return (
				<FavoriteSong
					key={section[0].id}
					id={section[0].id}
					className="overlay-main__song">
					<div className="overlay-main__img">
						<img
							src={section[0].image_uri}
							alt={section[0].name['name-USen']}
						/>
					</div>
					<h4 className="overlay-main__title">
						{section[0].name['name-USen']}
					</h4>
				</FavoriteSong>
			);
		}
	};
	const getSongs = (section) => {
		if (section) {
			return section.slice(1).map((song) => (
				<motion.div
					className="overlay-song__list"
					key={song.id}
					id={song.id}
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
				transition: {duration: 0.5},
			}}>
			<div className="overlay-container">
				{props.showList && props.selectedSection === 'top-songs' && (
					<>
						<Title className="overlay-title" style={{color: '#5E8FC0'}}>
							Top Songs
						</Title>
						<div>{getFavoriteSong(props.topSongs)}</div>
						<div>{getSongs(props.topSongs)}</div>
					</>
				)}
				{props.showList && props.selectedSection === 'isabelle-picks' && (
					<>
						<Title className="overlay-title" style={{color: '#E6BE2F'}}>
							Isabelle's Picks
						</Title>
						<div>{getFavoriteSong(props.isabellePicks)}</div>
						<div>{getSongs(props.isabellePicks)}</div>
					</>
				)}
				{props.showList && props.selectedSection === 'tom-picks' && (
					<>
						<Title className="overlay-title" style={{color: '#62AB7A'}}>
							Tom Nook's Picks
						</Title>
						<div>{getFavoriteSong(props.tomPicks)}</div>
						<div>{getSongs(props.tomPicks)}</div>
					</>
				)}
				{props.showList && (
					<Button
						onClick={props.handleToggle}
						whileHover={{scale: 1.2, transition: {type: 'tween'}}}>
						<i className="fa-solid fa-chevron-down show-icon" />
					</Button>
				)}
			</div>
		</SongContainer>
	);
}
