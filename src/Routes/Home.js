import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useState} from 'react';

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
const NameTag = styled.h1`
	position: absolute;
	top: 26%;
	padding-left: 5px;
	font-family: 'Mukta', sans-serif;
	font-size: 13px;
	color: white;
	transform: rotate(-10deg);
`;
const Text = styled(motion.h2)`
	position: absolute;
	top: 30%;
	left: 10%;
	width: 240px;
	font-family: 'Mukta', sans-serif;
	font-weight: 600;
	line-height: 1.2;
	color: ${(props) => props.theme.brown};
`;
const NextBtn = styled.button`
	position: absolute;
	top: 37%;
	right: 10%;
	width: 30px;
	height: 30px;
	color: #ffb900;
	font-size: 20px;
	cursor: pointer;
	z-index: 10;
`;
const letterVariants = {
	hidden: {visibility: 'hidden', y: 50},
	visible: {visibility: 'visible', y: 0},
};
export default function Home() {
	const line1 =
		"Welcome to ACNH Music Player! I'm K.K. Slider, the howlin' hound with a guitar in paw.";
	const line2 = 'Get ready to groove and let the melodies uplift your spirits!';
	return (
		<Wrapper>
			<Container>
				<Dialogue src="/images/dialogue.png" />
				<NameTag>K.K.</NameTag>
				<Text>
					{line1.split('').map((char, index) => (
						<motion.span
							key={index}
							variants={letterVariants}
							initial="hidden"
							animate="visible"
							transition={{delay: index * 0.1}}>
							{char}
						</motion.span>
					))}
				</Text>
				<NextBtn>
					<i className="fa-solid fa-caret-right"></i>
				</NextBtn>
			</Container>
		</Wrapper>
	);
}
