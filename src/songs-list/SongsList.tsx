import React from "react";
import "./SongsList.css";

interface SongsListProps {
	beat: number;
}

interface SongsListState {
	songsList: string[];
}

const SONGS_LIST = [
	["Bohemian Rhapsody", "Queen", 72],
	["Rap God", "Eminem", 72],
	["The Scientist", "Coldplay", 74],
	["Sultans of Swing", "Dire Straits", 74],
	["High Hopes", "Panic! at the Disco", 82],
	["Take Me Home, Country Roads", "John Denver", 82],
	["Zombie", "The Cranberries", 84],
	["Till I Collapse", "Eminem", 84],
	["Orion", "Metallica", 128],
	["Sweet Child o' Mine", "Guns N' Roses", 128],
	["Uprising", "Muse", 128],
	["Beat It", "Michael Jackson", 138],
	["Viva la Vida", "Coldplay", 138],
	["Wonderwall", "Oasis", 87],
	["Creep", "Radiohead", 92],
	["Shape of You", "Ed Sheeran", 96]
];



class SongsList extends React.Component<SongsListProps, SongsListState> {

	constructor(props: SongsListProps) {
		super(props);

		this.state = {
			songsList: []
		};
	}

	componentDidMount() {
		this.filterSongs(this.props.beat);
	}

	componentDidUpdate(prevProps: SongsListProps) {
		if (prevProps.beat !== this.props.beat) {
			this.filterSongs(this.props.beat);
		}
	}

	filterSongs(beat: number) {
		this.setState({
			songsList: []
		});

		SONGS_LIST
			.filter(songItem => songItem[songItem.length - 1] === beat)
			.map((songItem, ) => {
				this.setState(prevState => ({
					songsList: [...prevState.songsList, `${songItem[0]} (${songItem[1]})`]
				}));
				return true;
			});
	}

	render() {
		return (
			<div className="songs-list">
				<p className="songs-title">Songs that use this BPM:</p>

				{
					this.state.songsList.map(song =>
						<p className="songs-description" key={song}>{song}</p>
					)
				}
			</div>
		)
	}
}

export default SongsList;
