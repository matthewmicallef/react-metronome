import React from "react";
import "./BeatVisualizer.css";

interface BeatVisualizerProps {
	beat: number;
}

class BeatVisualizer extends React.Component<BeatVisualizerProps> {
	
	render() {
		return (
			<>
				<div className={`beat-container`}>
					<div className={`beat beat-${this.props.beat}`}></div>
					<div className="beat-value">{this.props.beat}</div>
				</div>
			</>
		)
	}
}

export default BeatVisualizer;
