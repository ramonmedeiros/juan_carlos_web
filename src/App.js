import './App.css';
import { Component, Fragment } from 'react';
import { Button } from "react-bootstrap";
import WebTorrent from 'webtorrent';

//const TPB = "https://thepiratebay-plus.strem.fun/manifest.json"
// download files and read it 
// https://www.imdb.com/interfaces/

class App extends Component {

  startStream(magnetURI) {
    var client = new WebTorrent()

    client.add(magnetURI, function (torrent) {
      // Torrents can contain many files. Let's use the .mp4 file
      var file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
      })

      // Display the file by adding it to the DOM.
      // Supports video, audio, image files, and more!
      file.appendTo('player')
    })
  }

  render() {
    return (
      <Fragment>
        <h1>Search movie</h1>
        <input type="text" id="search"></input>
        <Button block bssize="large" type="submit">
          Search sources
        </Button>
        <div id="player"></div>
      </Fragment>
    );
  }
}

export default App;
