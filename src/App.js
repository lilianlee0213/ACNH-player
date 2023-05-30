import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Routes/Home';
import Player from './Player';
import Discover from './Routes/Discover';
// import Wave from './components/Wave';

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
