import {motion} from 'framer-motion';
import styled from 'styled-components';

const SongContainer = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	background-color: ${(props) => props.theme.lightBlue};
`;
const Button = styled(motion.button)`
	font-size: 25px;
	color: ${(props) => props.theme.beige};
`;
export default function Songs(props) {
	return (
		<SongContainer
			animate={{
				height: props.showList ? '100%' : 0,
				transition: {duration: 0.5},
			}}>
			<Button
				onClick={props.handleToggle}
				whileHover={{scale: 1.2, transition: {type: 'tween'}}}>
				{props.showList && <i className="fa-solid fa-chevron-down show-icon" />}
			</Button>
		</SongContainer>
	);
}
