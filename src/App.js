import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Routes/Home';
import Player from './Routes/Player';
import Discover from './Routes/Discover';
import './common-styles.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/discover" element={<Discover />}></Route>
				<Route path="/play" element={<Player />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
