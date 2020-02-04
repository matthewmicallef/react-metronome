import React, { useState, useEffect } from "react";
import "./SongsList.css";

type SongsListProps = {
	beat: number;
}

type SongData = [string, string, number];

type SongsList = SongData[];

const SongsList: React.FunctionComponent<SongsListProps> = props => {
	const [currentSongs, setCurrentSongs] = useState<string[]>([]);
	const [songsList, setSongsList] = useState<SongsList>([]);

	useEffect(() => {
		fetch("./data/bpm.json")
			.then(res => res.json())
			.then(response => {
				setSongsList(response);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const filterSongs = (beat: number) => {
			setCurrentSongs([]);
	
			if (!songsList) {
				return;
			}
	
			let currentSongsTemp: string[] = [];
			songsList
				.filter(songItem => songItem[songItem.length - 1] === beat)
				.map((songItem, ) => {
					currentSongsTemp = [...currentSongsTemp, `${songItem[0]} (${songItem[1]})`];
					return true;
				});
	
			setCurrentSongs(currentSongsTemp);
		};
		
		filterSongs(props.beat);
	}, [songsList, props.beat]);

	return (
		<div className="songs-list">
			<p className="songs-title">Songs that use this BPM:</p>

			{
				currentSongs.map(song =>
					<p className="songs-description" key={song}>{song}</p>
				)
			}
		</div>
	)
}

export default SongsList;
