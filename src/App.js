import './App.css';
import { Component, Fragment } from 'react';
import WebTorrent from 'webtorrent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//const TPB = "https://thepiratebay-plus.strem.fun/manifest.json"
// download files and read it 

class App extends Component {

  constructor(props) {
    super(props);
    this.props = props
    this.state = {
      open: false,
      options: [],
    }
    this.searchTitle = this.searchTitle.bind(this);
    this.data = []
    this.fetchList()
  }

  fetchList() {
    fetch(`${window.location.href}/movies.json`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.data = data
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  componentDidUpdate() {
  }

  searchTitle(event) {
    let title = event.target.value
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let results = []
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i]["originalTitle"].includes(title))
          results.push(this.data[i]);
      }
      this.setState({ ...this.state, options: results });

    }, 300);
  }

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
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: 300 }}
          open={this.state.open}
          onOpen={() => {
            this.setState({ ...this.state, open: true });
          }}
          onClose={() => {
            this.setState({ ...this.state, open: false });
          }}
          getOptionSelected={(option, value) => option.originalTitle === value.originalTitle}
          getOptionLabel={option => option.originalTitle}
          options={this.state.options}
          renderInput={params => (
            <TextField
              {...params}
              label="IMDB database search"
              variant="outlined"
              onChange={ev => { this.searchTitle(ev) }}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default App;