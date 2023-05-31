import {motion} from 'framer-motion';
import styled from 'styled-components';

const SongContainer = styled(motion.div)`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
	overflow-y: hidden;
	border-radius: 15px;
`;
const Button = styled(motion.button)`
	font-size: 25px;
	color: ${(props) => props.theme.beige};
`;
const Album = styled.img`
	width: 80px;
`;

export default function Songs(props) {
	const getFavoriteSong = (section) => {
		return (
			<div key={section[0].id} id={section[0].id}>
				{section[0].name['name-USen']}
				<Album src={section[0].image_uri} alt="" />
			</div>
		);
	};
	const songs = (section) => {
		return section.slice(1).map((song) => (
			<div key={song.id} id={song.id}>
				{song.name['name-USen']}
				<Album src={song.image_uri} alt="" />
			</div>
		));
	};
	console.log(getFavoriteSong(props.topSongs).id);
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
			<div>
				{props.showList && props.selectedSection === 'top-songs' && (
					<>
						<div>{getFavoriteSong(props.topSongs)}</div>
						<div>{songs(props.topSongs)}</div>
					</>
				)}
				{props.showList && props.selectedSection === 'isabelle-picks' && (
					<>
						<div>{getFavoriteSong(props.isabellePicks)}</div>
						<div>{songs(props.isabellePicks)}</div>
					</>
				)}
				{props.showList && props.selectedSection === 'tom-picks' && (
					<>
						<div>{getFavoriteSong(props.tomPicks)}</div>
						<div>{songs(props.tomPicks)}</div>
					</>
				)}
			</div>
			{props.showList && (
				<Button
					onClick={props.handleToggle}
					whileHover={{scale: 1.2, transition: {type: 'tween'}}}>
					<i className="fa-solid fa-chevron-down show-icon" />
				</Button>
			)}
		</SongContainer>
	);
}
