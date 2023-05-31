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
