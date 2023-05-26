import styled from 'styled-components';
import {motion, useAnimationControls} from 'framer-motion';
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
	background-image: ${(prop) =>
		`url(${
			prop.loading ? '/images/loading-image.png' : '/images/home-background.png'
		})`};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;
const Logo = styled(motion.div)`
	position: relative;
	top: 20%;
	left: 12%;
	height: 40%;
`;
const LogoImg = styled.img`
	position: absolute;
	object-fit: contain;
	&.kk-sldier {
		top: -20px;
		left: 45px;
		width: 150px;
		height: 150px;
		transform: rotate(10deg);
	}
	&.guitar {
		width: 230px;
		height: 230px;
		top: 12px;
		transform: rotate(70deg);
		left: 88px;
		z-index: 1;
	}
`;
const LogoText = styled.h1`
	position: absolute;
	&.logo-acnh {
		font-size: 60px;
		top: 20px;
		/* left: 50px; */
		span:first-child,
		span:last-child {
			color: ${(props) => props.theme.green};
		}
		span:nth-child(2) {
			color: ${(props) => props.theme.yellow};
		}
		span:nth-child(3) {
			color: ${(props) => props.theme.pink};
		}
	}
	&.logo-music {
		font-size: 60px;
		color: ${(props) => props.theme.darkBlue};
		top: 70px;
		left: -20px;
	}
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
const logoVariants = {
	initial: {
		opacity: 0,
	},
	animate: {
		transform: [
			'rotate(0deg)',
			'rotate(3deg)',
			'rotate(0deg)',
			'rotate(-3deg)',
			'rotate(0deg)',
		],
		opacity: 1,
		transition: {
			opacity: {
				duration: 1.2,
			},
			transform: {
				duration: 0.2,
				repeat: 3,
				ease: 'linear',
				delay: 0.8,
			},
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
			<Container loading={loading}>
				{loading ? (
					<>
						<Logo initial="initial" animate="animate" variants={logoVariants}>
							<LogoImg className="guitar" src="/images/guitar.png" alt="" />
							<LogoImg src="/images/K.K.Slider.png" className="kk-sldier" />
							<LogoText className="logo-acnh">
								<span>A</span>
								<span>C</span>
								<span>N</span>
								<span>H</span>
							</LogoText>
							<LogoText className="logo-music">MUSIC</LogoText>
						</Logo>
					</>
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
