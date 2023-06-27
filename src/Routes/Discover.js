import {motion} from 'framer-motion';
import {useState} from 'react';
import styled from 'styled-components';
import {getSongs} from '../Api';
import {useQuery} from 'react-query';
import DiscoverList from '../components/DiscoverList';

const Container = styled.div`
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	gap: 20px;
	background-color: #fff9de;
`;
const Section = styled(motion.section)`
	display: flex;
	padding-inline: 10px;
	border-radius: 10px;
	font-family: 'Mukta', sans-serif;
	cursor: pointer;
	&.top-songs {
		background-color: ${(props) => props.theme.lightBlue};
		justify-content: end;
	}
	&.isabelle-picks {
		background-color: ${(props) => props.theme.lightYellow};
	}
	&.tom-picks {
		background-color: ${(props) => props.theme.lightGreen};
		justify-content: end;
	}
`;
const Image = styled.img`
	width: 120px;
	height: 130px;
	object-fit: cover;
	object-position: top;
	align-self: end;
`;
const Title = styled.h4`
	align-self: center;
	text-align: center;
	font-size: 20px;
	font-weight: 600;
	color: ${(props) => props.color};
	line-height: 1.2;
`;

export default function Discover() {
	const {data} = useQuery('songs', getSongs);
	const topSongs = data?.filter((song) => song['buy-price'] === null);
	const isabellePicks = [
		data?.[67],
		data?.[44],
		data?.[77],
		data?.[86],
		data?.[4],
	];
	const tomPicks = [data?.[20], data?.[64], data?.[39], data?.[53], data?.[9]];
	const [showList, setShowList] = useState(false);
	const [selectedSection, setSelectedSection] = useState(null);
	const handleToggle = (section) => {
		setShowList((prev) => !prev);
		setSelectedSection(section);
	};
	return (
		<div className="wrapper">
			<Container className="app-container">
				<Section
					className="top-songs"
					whileHover={{scale: 1.05, transition: {type: 'tween'}}}
					onClick={() => handleToggle('top-songs')}>
					<Title style={{color: '#5E8FC0'}}>Top Songs</Title>
					<Image
						src={process.env.PUBLIC_URL + '/images/characters/kk-slider.webp'}
					/>
				</Section>
				<Section
					className="isabelle-picks"
					whileHover={{scale: 1.05, transition: {type: 'tween'}}}
					onClick={() => handleToggle('isabelle-picks')}>
					<Image
						className="isabelle"
						src={process.env.PUBLIC_URL + '/images/characters/isabelle.webp'}
					/>
					<Title style={{color: '#E6BE2F'}}>Isabelle's Picks</Title>
				</Section>
				<Section
					className="tom-picks"
					whileHover={{scale: 1.05, transition: {type: 'tween'}}}
					onClick={() => handleToggle('tom-picks')}>
					<Title style={{color: '#62AB7A'}}>Tom Nook's Picks</Title>
					<Image
						src={process.env.PUBLIC_URL + '/images/characters/tom-nook.webp'}
					/>
				</Section>
				<DiscoverList
					showList={showList}
					handleToggle={handleToggle}
					selectedSection={selectedSection}
					topSongs={topSongs}
					isabellePicks={isabellePicks}
					tomPicks={tomPicks}
				/>
			</Container>
		</div>
	);
}
