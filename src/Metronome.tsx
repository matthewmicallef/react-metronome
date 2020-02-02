import React from "react";
import BeatVisualizer from "./beat-visualizer/BeatVisualizer";
import SongsList from "./songs-list/SongsList";
import BeatsList from "./beats-list/BeatsList";
import "./Metronome.css";

interface MetronomeState {
  activeBeat: number;
  beatsList: number[];
}

class Metronome extends React.Component<{}, MetronomeState> {

  constructor(props: any) {
    super(props);

    this.state = {
      activeBeat: 72,
      beatsList: [72, 74, 82, 84, 128, 138]
    }
  }

  handleBeatClick(beat: number) {
    this.setState({ activeBeat: beat });
  }

  render() {
    return (
      <div className="metronome">
        <p className="title">DIGITAL METRONOME</p>

        <BeatVisualizer beat={this.state.activeBeat}></BeatVisualizer>

        <BeatsList firstActiveBeat={this.state.activeBeat}
          beatsList={this.state.beatsList}
          clickHandler={this.handleBeatClick.bind(this)}>
        </BeatsList>

        <SongsList beat={this.state.activeBeat}></SongsList>
      </div>
    );
  }
}

export default Metronome;
