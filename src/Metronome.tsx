import React from "react";
import * as SpotifyWebApi from 'spotify-web-api-js';
import BeatVisualizer from "./components/beat-visualizer/BeatVisualizer";
import SongsList from "./components/songs-list/SongsList";
import BeatsList from "./components/beats-list/BeatsList";
import FirstBeat from "./sounds/beat-1.wav";
import SecondBeat from "./sounds/beat-2.wav";
import { getHash } from "./utils/Utils";
import { spotifyConfig } from "./config";
import "./Metronome.css";

type MetronomeState = {
  beatCount: number;
  beatsPerMeasure: number;
  activeBeat: number;
  beatsList: number[];
  isPlaying: boolean;
  spotifyToken?: string;
  useSpotify?: boolean;
  spotifyAuthLink: string;
  spotifySuggestions?: string[];
}

class Metronome extends React.Component<{}, MetronomeState> {
  firstBeatSound: HTMLAudioElement;
  defaultBeatSound: HTMLAudioElement;
  timer: any;
  spotifyApi: SpotifyWebApi.default.SpotifyWebApiJs;

  constructor(props: any) {
    super(props);

    const { authEndpoint, clientId, redirectUri, scopes } = spotifyConfig;

    this.state = {
      beatCount: 0,
      beatsPerMeasure: 4,
      isPlaying: false,
      activeBeat: 72,
      beatsList: [72, 74, 82, 84, 128, 138],
      spotifyAuthLink: `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
    }

    this.firstBeatSound = new Audio(FirstBeat);
    this.defaultBeatSound = new Audio(SecondBeat);
    this.spotifyApi = new SpotifyWebApi.default();
  }

  componentDidMount() {
    // Get Spotify token
    let _token = getHash("access_token");
    window.location.hash = "";

    if (_token) {
      this.setState({
        spotifyToken: _token,
        useSpotify: true
      }, () => {
        this.spotifyApi.setAccessToken(this.state.spotifyToken!);
        this.getSpotifyData();
      });
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private getSpotifyData() {
    this.spotifyApi.getRecommendations({
      seed_artists: spotifyConfig.seedArtists,
      target_tempo: this.state.activeBeat,
      limit: spotifyConfig.limit
    })
      .then((data) => {
        this.setState({ spotifySuggestions: [] }, () => {
          data.tracks.map((track, i) => {
            this.setState(prevState => ({
              spotifySuggestions: [
                ...prevState.spotifySuggestions || [],
                `${track.name}, (${track.artists[0].name})`
              ]
            }));
            return true;
          });
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  private startPlaying() {
    this.setState({ isPlaying: true }, this.handleBeatChange);
  }

  private playBeat() {
    const { beatCount, beatsPerMeasure } = this.state;

    // Different first beat of every measure
    if (beatCount % beatsPerMeasure === 0) {
      this.defaultBeatSound.play();
    } else {
      this.firstBeatSound.play();
    }

    this.setState(prevState => ({
      beatCount: (prevState.beatCount + 1) % prevState.beatsPerMeasure
    }));
  }

  private handleBeatChange(beat?: number) {
    if (beat)
      this.setState({ activeBeat: beat }, () => {
        if (this.state.useSpotify) {
          this.getSpotifyData();
        }
      });

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
        <p className="metronome-title">DIGITAL METRONOME</p>

        <BeatVisualizer beat={this.state.activeBeat}
          beatCount={this.state.beatCount + 1}
          isPlaying={this.state.isPlaying}
          onPlayClicked={this.startPlaying.bind(this)}>
        </BeatVisualizer>

        <BeatsList firstActiveBeat={this.state.beatsList[0]}
          beatsList={this.state.beatsList}
          clickHandler={this.handleBeatChange.bind(this)}>
        </BeatsList>

        <SongsList beat={this.state.activeBeat}
          useSpotify={this.state.useSpotify}
          songsList={this.state.spotifySuggestions}>
        </SongsList>

        {!this.state.spotifyToken && (
          <a className="metronome-spotify-link"
            href={this.state.spotifyAuthLink}>
            Click here to use Spotify suggestions
          </a>
        )}
      </div>
    );
  }
}

export default Metronome;