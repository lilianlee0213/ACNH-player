import styled from 'styled-components';

const WaveSvg = styled.svg`
	position: absolute;
	bottom: 0;
	left: 0;
	height: fit-content;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
`;
export default function Wave() {
	return (
		<WaveSvg
			width="100%"
			height="100%"
			id="svg"
			viewBox="0 0 1440 490"
			xmlns="http://www.w3.org/2000/svg"
			className="transition duration-300 ease-in-out delay-150">
			<path
				d="M 0,500 C 0,500 0,166 0,166 C 88.35176915149435,183.37822054276882 176.7035383029887,200.7564410855376 242,195 C 307.2964616970113,189.2435589144624 349.5376159395397,160.35245620061835 417,155 C 484.4623840604603,149.64754379938165 577.1459979388526,167.833734111989 638,161 C 698.8540020611474,154.166265888011 727.8783923050499,122.31260735142561 788,113 C 848.1216076949501,103.68739264857439 939.3404328409481,116.91583648230852 1011,144 C 1082.659567159052,171.08416351769148 1134.7598763311578,212.0240467193404 1203,218 C 1271.2401236688422,223.9759532806596 1355.620061834421,194.9879766403298 1440,166 C 1440,166 1440,500 1440,500 Z"
				stroke="none"
				strokeWidth="0"
				fill="#89ced7"
				fillOpacity="0.53"></path>
			<path
				d="M 0,500 C 0,500 0,333 0,333 C 78.32840948127793,330.830985915493 156.65681896255586,328.6619718309859 222,334 C 287.34318103744414,339.3380281690141 339.7011336310545,352.18309859154925 411,341 C 482.2988663689455,329.81690140845075 572.5386465132258,294.6056338028169 649,305 C 725.4613534867742,315.3943661971831 788.1442803160427,371.3943661971831 844,377 C 899.8557196839573,382.6056338028169 948.8842322226039,337.8169014084507 1017,339 C 1085.115767777396,340.1830985915493 1172.3187907935417,387.3380281690141 1246,394 C 1319.6812092064583,400.6619718309859 1379.8406046032292,366.830985915493 1440,333 C 1440,333 1440,500 1440,500 Z"
				stroke="none"
				strokeWidth="0"
				fill="#89ced7"
				fillOpacity="1"></path>
		</WaveSvg>
	);
}
