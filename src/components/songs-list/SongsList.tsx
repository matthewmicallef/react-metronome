import React, { useState, useEffect } from "react";
import "./SongsList.css";

type SongsListProps = {
	beat: number;
	useSpotify?: boolean;
	songsList?: string[];
}

type SongData = [string, string, number];

type SongsList = SongData[];

const SongsList: React.FunctionComponent<SongsListProps> = props => {
	const [currentSongs, setCurrentSongs] = useState<string[]>([]);
	const [songsList, setSongsList] = useState<SongsList>([]);

	useEffect(() => {
		if (props.useSpotify)
			return;

		fetch("./data/bpm.json")
			.then(res => res.json())
			.then(response => {
				setSongsList(response);
			})
			.catch(err => {
				console.error(err);
			});
	}, [props.useSpotify]);

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

		if (!props.useSpotify) {
			filterSongs(props.beat);
			return;
		}

		if (props.songsList)
			setCurrentSongs(props.songsList);
	}, [songsList, props]);

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
