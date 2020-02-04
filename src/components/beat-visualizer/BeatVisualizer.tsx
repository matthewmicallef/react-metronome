import React from "react";
import "./BeatVisualizer.css";

type BeatVisualizerProps = {
	beat: number;
	beatCount: number;
	isPlaying: boolean;
	onPlayClicked: () => void;
}

const BeatVisualizer: React.FunctionComponent<BeatVisualizerProps> = props => {
	const myFunc = (beatCount?: number) => {
		return (
			<>
				<div className="beat-circles-container">
					<span className={`beat-circle ${beatCount === 1 ? 'beat-circle-active' : ''}`}></span>
					<span className={`beat-circle ${beatCount === 2 ? 'beat-circle-active' : ''}`}></span>
					<span className={`beat-circle ${beatCount === 3 ? 'beat-circle-active' : ''}`}></span>
					<span className={`beat-circle ${beatCount === 4 ? 'beat-circle-active' : ''}`}></span>
				</div>
			</>
		);
	};

	if (props.isPlaying) {
		return (
			<>
				<div className={`beat-container`}>
					<div className={`beat beat-${props.beat}`}></div>
					<div className="beat-value">{props.beat}</div>
				</div>

				{myFunc(props.beatCount)}
			</>
		);
	}
	else {
		return (
			<>
				<div className={`beat-container`}>
					<div className="beat-value beat-play-btn"
						onClick={() => props.onPlayClicked()}>
						PLAY
				</div>
				</div>

				{ myFunc() }
			</>
		);
	}
}

export default BeatVisualizer;
