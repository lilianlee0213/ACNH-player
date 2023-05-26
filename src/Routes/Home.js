import styled from 'styled-components';
import {animate, motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

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
	line-height: 1.2;
	font-family: 'Mukta', sans-serif;
	font-weight: 600;
	font-size: ${(props) => (props.lastLine ? '22px' : '17px')};
	text-align: ${(props) => (props.lastLine ? 'center' : 'left')};
	color: ${(props) => (props.lastLine ? props.theme.blue : props.theme.brown)};
`;

const NextBtn = styled(motion.button)`
	position: absolute;
	top: 40.5%;
	right: 0;
	left: 0;
	margin: 0 auto;
	width: fit-content;
	font-size: 35px;
	color: ${(props) => props.theme.yellow};
	cursor: pointer;
`;
const letterVariants = {
	hidden: {visibility: 'hidden'},
	visible: {visibility: 'visible'},
};
const buttonVariants = {
	initial: {scale: 1},
	animate: {
		scale: [1, 1.2, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
			repeatType: 'reverse',
		},
	},
};

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [line, setLine] = useState(
		"Welcome to ACNH Music Player! I'm K.K. Slider, the howlin' hound with a guitar in paw."
	);
	const [animate, setAnimate] = useState(true);
	const [lastLine, setListLine] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoading(true);
		}, 6000);
	}, []);
	const showDialouge = () => {
		setAnimate(false);
		setTimeout(() => {
			setAnimate(true);
			setLine('Get ready to groove and let the melodies uplift your spirits!');
			if (line.startsWith('Get')) {
				setListLine(true);
				setAnimate(false);
				setTimeout(() => {
					setAnimate(true);
					setLine("Arf-arf, let's make the music play!");
				}, 0);
			}
		}, 0);
	};

	return (
		<Wrapper>
			<Container>
				{loading ? (
					<div>Loading</div>
				) : (
					<>
						<Dialogue src="/images/dialogue.png" />
						<NameTag>K.K.</NameTag>
						<Text lastLine={lastLine}>
							{line.split('').map(
								(char, index) =>
									animate && (
										<motion.span
											key={index}
											variants={letterVariants}
											initial="hidden"
											animate="visible"
											transition={{delay: index * 0.1}}>
											{char}
										</motion.span>
									)
							)}
						</Text>
						<NextBtn
							variants={buttonVariants}
							initial="initial"
							animate="animate"
							onClick={showDialouge}>
							{lastLine ? (
								<Link to="/play">
									<i class="fa-solid fa-sort-down"></i>
								</Link>
							) : (
								<i class="fa-solid fa-sort-down"></i>
							)}
						</NextBtn>
					</>
				)}
			</Container>
		</Wrapper>
	);
}
