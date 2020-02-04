import React, { useState } from "react";
import "./BeatsList.css";

type BeatsListProps = {
	firstActiveBeat: number;
	beatsList: number[];
	clickHandler: (x: any) => void;
}

const BeatsList: React.FunctionComponent<BeatsListProps> = props => {
	const [activeBeat, setActiveBeat] = useState<number>(props.firstActiveBeat);

	const handleBeatClicked = (beat: number) => {
		if (activeBeat === beat) {
			return;
		}

		setActiveBeat(beat);
		props.clickHandler(beat);
	}

	return (
		<div className="beat-choice-area">
			{
				props.beatsList.map(beat =>
					<p className={`beat-choice-btn ${activeBeat === beat ? 'beat-choice-btn-selected' : ''}`}
						key={beat}
						onClick={() => handleBeatClicked(beat)}>
						{beat} BPM
					</p>
				)
			}
		</div>
	);
}

export default BeatsList;
