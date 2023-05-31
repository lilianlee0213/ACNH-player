import {motion} from 'framer-motion';
import styled from 'styled-components';

const SongContainer = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	background-color: ${(props) =>
		props.selectedSection === 'top-songs'
			? props.theme.lightBlue
			: props.selectedSection === 'isabelle-picks'
			? props.theme.lightYellow
			: props.selectedSection === 'tom-picks'
			? props.theme.lightGreen
			: ''};
`;
const Button = styled(motion.button)`
	font-size: 25px;
	color: ${(props) => props.theme.beige};
`;
const Album = styled.img`
	width: 80px;
`;
export default function Songs(props) {
	return (
		<SongContainer
			selectedSection={props.selectedSection}
			animate={{
				height: props.showList ? '100%' : 0,
				transition: {duration: 0.5},
			}}>
			<div>
				{props.showList && props.selectedSection === 'top-songs' && (
					<>
						{props.topSongs.map((song) => (
							<div key={song.id} id={song.id}>
								{song.name['name-USen']}
								<Album src={song.image_uri} alt="" />
							</div>
						))}
					</>
				)}
				{props.showList && props.selectedSection === 'isabelle-picks' && (
					<>
						{props.isabellePicks.map((song) => (
							<div key={song.id} id={song.id}>
								{song.name['name-USen']}
								<Album src={song.image_uri} alt="" />
							</div>
						))}
					</>
				)}
				{props.showList && props.selectedSection === 'tom-picks' && (
					<>
						{props.tomPicks.map((song) => (
							<div key={song.id} id={song.id}>
								{song.name['name-USen']}
								<Album src={song.image_uri} alt="" />
							</div>
						))}
					</>
				)}
			</div>
			<Button
				onClick={props.handleToggle}
				whileHover={{scale: 1.2, transition: {type: 'tween'}}}>
				{props.showList && <i className="fa-solid fa-chevron-down show-icon" />}
			</Button>
		</SongContainer>
	);
}
