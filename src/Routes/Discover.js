import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin: 0 20px;
`;
const Container = styled.div`
	display: grid;
	grid-template-rows: repeat(3 1fr);
	gap: 20px;
	width: 290px;
	height: 508px;
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
	background-color: #fff9de;
`;
const Section = styled.section`
	display: flex;
	width: 100%;
	padding-inline: 10px;
	border-radius: 10px;
	font-family: 'Mukta', sans-serif;
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
	return (
		<Wrapper>
			<Container>
				<Section className="top-songs">
					<Title style={{color: '#5E8FC0'}}>Top Songs</Title>
					<Image src="/images/characters/kk-slider.webp" />
				</Section>
				<Section className="isabelle-picks">
					<Image className="isabelle" src="/images/characters/isabelle.webp" />
					<Title style={{color: '#E6BE2F'}}>Isabelle's Picks</Title>
				</Section>
				<Section className="tom-picks">
					<Title style={{color: '#62AB7A'}}>Tom Nook's Picks</Title>
					<Image src="/images/characters/tom-nook.webp" />
				</Section>
			</Container>
		</Wrapper>
	);
}
