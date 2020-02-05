import React from "react";
import BeatVisualizer from "./components/beat-visualizer/BeatVisualizer";
import SongsList from "./components/songs-list/SongsList";
import BeatsList from "./components/beats-list/BeatsList";
import FirstBeat from "./sounds/beat-1.wav";
import SecondBeat from "./sounds/beat-2.wav";
import "./Metronome.css";

type MetronomeState = {
  beatCount: number;
  beatsPerMeasure: number;
  activeBeat: number;
  beatsList: number[];
  isPlaying: boolean;
}

class Metronome extends React.Component<{}, MetronomeState> {
  firstBeatSound: HTMLAudioElement;
  defaultBeatSound: HTMLAudioElement;
  timer: any;

  constructor(props: any) {
    super(props);

    this.state = {
      beatCount: 0,
      beatsPerMeasure: 4,
      isPlaying: false,
      activeBeat: 72,
      beatsList: [72, 74, 82, 84, 128, 138]
    }

    this.firstBeatSound = new Audio(FirstBeat);
    this.defaultBeatSound = new Audio(SecondBeat);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startPlaying() {
    this.setState({ isPlaying: true }, this.handleBeatChange);
  }

  playBeat() {
    const { beatCount, beatsPerMeasure } = this.state;

    // Different first beat of every measure
    if (beatCount % beatsPerMeasure === 0) {
      this.defaultBeatSound.play();
    } else {
      this.firstBeatSound.play();
    }

    this.setState(state => ({
      beatCount: (state.beatCount + 1) % state.beatsPerMeasure
    }));
  }

  handleBeatChange(beat?: number) {
    if (beat)
      this.setState({ activeBeat: beat });

    if (!this.state.isPlaying) {
      return;
    }

    this.setState({ beatCount: 0 }, () => {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(this.playBeat.bind(this), (60 / this.state.activeBeat) * 1000);
    });
  }

  render() {
    return (
      <div className="metronome">
        <p className="title">DIGITAL METRONOME</p>

        <BeatVisualizer beat={this.state.activeBeat}
          beatCount={this.state.beatCount + 1}
          isPlaying={this.state.isPlaying}
          onPlayClicked={this.startPlaying.bind(this)}>
        </BeatVisualizer>

        <BeatsList firstActiveBeat={this.state.beatsList[0]}
          beatsList={this.state.beatsList}
          clickHandler={this.handleBeatChange.bind(this)}>
        </BeatsList>

        <SongsList beat={this.state.activeBeat}></SongsList>
      </div>
    );
  }
}

export default Metronome;
