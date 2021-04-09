import './App.css';
import { Component, Fragment } from 'react';
import WebTorrent from 'webtorrent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from "@material-ui/core/CircularProgress";

//const TPB = "https://thepiratebay-plus.strem.fun/manifest.json"
// download files and read it 
const IMDB = "http://www.omdbapi.com/?apikey=e9843e26&page=100&s="

class App extends Component {

  constructor(props) {
    super(props);
    this.props = props
    this.state = {
      open: false,
      options: [],
    }
    this.loading = this.state.open && this.options.length === 0;
    this.searchTitle = this.searchTitle.bind(this);
  }

  componentDidUpdate() {
  }

  searchTitle(event) {
    let title = event.target.value
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      fetch(IMDB + encodeURIComponent(title), {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.Response === "False"){
            return
          } 
          console.log(data.Search)
          this.setState({ ...this.state, options: data.Search });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
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
        getOptionSelected={(option, value) => option.Title === value.Title}
        getOptionLabel={option => option.Title}
        options={this.state.options}
        loading={this.loading}
        renderInput={params => (
          <TextField
            {...params}
            label="IMDB database search"
            variant="outlined"
            onChange={ev => {this.searchTitle(ev)}}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {this.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              )
            }}
          />
        )}
      />
    );
  }
}

export default App;