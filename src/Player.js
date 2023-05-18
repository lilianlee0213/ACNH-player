import {useQuery} from 'react-query';
import {getSongs} from './Api';

export default function Player() {
	const {data, isLoading} = useQuery('songs', getSongs);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	const songs = data.slice(0, 4);
	return (
		<div>
			{songs.map((song) => (
				<div key={song.id}>
					<h1>{song.name['name-USen']}</h1>
					<img src={song.image_uri} style={{width: '100px'}} />
					<audio src={song.music_uri} controls>
						Music
					</audio>
				</div>
			))}
		</div>
	);
}
