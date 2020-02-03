import React, { FunctionComponent } from "react";
import "./BeatVisualizer.css";

type BeatVisualizerProps = {
	beat: number;
	isPlaying: boolean;
	onPlayClicked: () => void;
}

const BeatVisualizer: React.FunctionComponent<BeatVisualizerProps> = props => {
	if (props.isPlaying) {
		return (
			<div className={`beat-container`}>
				<div className={`beat beat-${props.beat}`}></div>
				<div className="beat-value">{props.beat}</div>
			</div>
		);
	}
	else {
		return (
			<div className={`beat-container`}>
				<div className="beat-value" onClick={() => props.onPlayClicked()}>PLAY</div>
			</div>
		);
	}
}

export default BeatVisualizer;
