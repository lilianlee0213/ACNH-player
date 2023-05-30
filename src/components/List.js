import {motion} from 'framer-motion';
import styled from 'styled-components';
const Container = styled(motion.div)`
	position: absolute;
	width: 290px;
	border-radius: 15px;
	background-color: ${(props) => props.theme.yellow};
	left: 0;
	z-index: 2;
`;
const containerVariants = {
	show: {
		height: '508px',
		top: 0,
		transition: {duration: 0.5},
	},
	hide: {
		height: 0,
		top: '100%',
		transition: {duration: 0.5},
	},
};
export default function List(props) {
	return (
		<Container
			showList={props.showList}
			variants={containerVariants}
			animate={props.showList ? 'show' : 'hide'}>
			<div>
				{props.songList.map((list) => (
					<div key={list.id}>
						<h1>{list.name['name-USen']}</h1>
						<img src={list.image_uri} alt="" />
					</div>
				))}
			</div>
		</Container>
	);
}
