import {createGlobalStyle} from 'styled-components';

export const defaultTheme = {
	bgColor1: '#F8F3E7',
	blue: '#BCDFF8',
	darkBlue: '#5588B8',
	green: '#a4d4a2',
	darkGreen: '#68b894',
	yellow: '#f7d359',
};

export const GlobalStyles = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
	box-sizing: border-box;
}
body{
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background: url(/images/background-large.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Rubik', sans-serif;
}
@media only screen and (max-width:720px) {
  body{
    background: url(/images/background-medium.jpeg);
  }
}

a{
	text-decoration: none;
  color:inherit;
}
input{
  font-family: 'Montserrat', sans-serif;    
  outline: none;

}
button{
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}
i{
  cursor: pointer;
}
`;
