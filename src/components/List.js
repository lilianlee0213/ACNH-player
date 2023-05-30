import {motion} from 'framer-motion';
import styled from 'styled-components';
const Container = styled(motion.div)`
	position: absolute;
	width: 290px;
	left: 0;
	bottom: 0px;
	border-radius: 15px;
	background-color: ${(props) => props.theme.yellow};
	z-index: 2;
	overflow-y: hidden;
`;
const ListContainer = styled(motion.div)`
	display: grid;
	grid-template-rows: repeat(5, 1fr);
	gap: 10px;
	margin: 20px;
`;
const ListItem = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.beige};
`;
const ListTitle = styled.h3`
	font-size: 18px;
	color: ${(props) => props.theme.black};
`;
const ListImage = styled.img`
	width: 50px;
	height: 50px;
	box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.35);
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
export default function List(props) {
	return (
		<Container
			variants={containerVariants}
			animate={props.showList ? 'show' : 'hide'}>
			<ListContainer>
				{props.songList.map((list) => (
					<ListItem key={list.id} whileHover={{scale: 1.05}}>
						<ListImage src={list.image_uri} alt="" />
						<ListTitle>{list.name['name-USen']}</ListTitle>
					</ListItem>
				))}
			</ListContainer>
		</Container>
	);
}
