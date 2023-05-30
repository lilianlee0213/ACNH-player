import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	width: 290px;
	height: 508px;
	background-color: ${(props) => props.theme.yellow};
	border-radius: 15px;
	top: 0;
	left: 0;
	z-index: 2;
`;
export default function List() {
	return <Container>Show List</Container>;
}
