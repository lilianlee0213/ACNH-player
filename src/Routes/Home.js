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
	position: relative;
	width: 290px;
	height: 508px;
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
	background-image: url('/images/home-background.png');
	background-size: cover;
	background-position: bottom;
	background-repeat: no-repeat;
`;
const Dialogue = styled.img`
	position: absolute;
	left: 5px;
	bottom: 50%;
	width: 280px;
	object-fit: cover;
`;
const Text = styled.h2`
	position: absolute;
	top: 30%;
	color: ${(props) => props.theme.brown};
`;
export default function Home() {
	return (
		<Wrapper>
			<Container>
				<div>
					<Dialogue src="/images/dialogue.png" />
					<Text style={{}}>Hi I'm K.K Slider. </Text>
				</div>
			</Container>
		</Wrapper>
	);
}
