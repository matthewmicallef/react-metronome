import React from "react";
import "./BeatsList.css";

interface BeatsListProps {
	firstActiveBeat: number;
	beatsList: number[];
	clickHandler: (x: any) => void;
}

interface BeatsListState {
	activeBeat: number;
}

class BeatsList extends React.Component<BeatsListProps, BeatsListState> {

	constructor(props: BeatsListProps) {
		super(props);

		this.state = {
			activeBeat: this.props.firstActiveBeat
		};
	}

	handleBeatClicked(beat: number) {
		if (this.state.activeBeat === beat) {
			return;
		}

		this.setState({ activeBeat: beat });
		this.props.clickHandler(beat);
	}

	render() {
		return (
			<>
				<div className="beat-choice-area">
					{
						this.props.beatsList.map(beat => 
							<p className={`beat-choice-btn ${this.state.activeBeat === beat ? 'beat-choice-btn-selected': ''}`}
								key={beat}
								onClick={() => this.handleBeatClicked(beat)}>{beat} BPM</p>
						)
					}
				</div>
			</>
		)
	}
}

export default BeatsList;
