## React Metronome App 

A React metronome responsive application that allows the user to choose a BPM (tempo) choice and presents several songs that have the chosen tempo. The application also provides sound animation for the different beats chosen.

Once loaded, simply press the PLAY button to launch the metronome and select any beat you like.

Optional features implemented: 

- An option/link at the bottom of the songs list, enables Spotify API communication for different song suggestions.

- Additional beat visualizations have been added to the original design.

Technologies used: React, TypeScript, and CSS.

Note: The play button was introduced due to limitations from browsers like Chrome where the autoplay feature is no longer supported in the same way as before, and requires user interaction first.

## Installation and Setup Instructions

Clone this repository and `cd` into the project repository (`cd react-metronome`). You will need `node` and `npm` or `yarn` installed globally on your machine.  

Installation:

`npm install` or `yarn install`

To Start Server (run the app):

Note: It is important that the app is run on `localhost: 3000` which is the default port. This is because the Spotify settings are set to callback the same URL.

`npm start` or `yarn start`

To Visit App (launches automatically):

`localhost:3000/`

## Possible Improvements

- Investigate the implementation of a more accurate interval mechanism for the beat calculation.

- Retrieve more song choices from public APIs. Note: Tried looking for free, publicly available APIs, but at the time of writing didn't really find any of them that allow querying by tempo/bpm.

- Add and update tests.