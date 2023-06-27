import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Routes/Home';
import Player from './Player';
import Discover from './Routes/Discover';
import './common-styles.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={process.env.PUBLIC_URL + '/'} element={<Home />}></Route>
				<Route
					path={process.env.PUBLIC_URL + '/discover'}
					element={<Discover />}></Route>
				<Route
					path={process.env.PUBLIC_URL + '/play'}
					element={<Player />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
