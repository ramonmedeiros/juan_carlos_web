import { React, Component, Fragment } from 'react';
import StreamList from './StreamList';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';


class App extends Component {

  constructor(props) {
    super(props);
    this.props = props
    this.state = {
      open: false,
      options: [],
      streamList: [],
    }
    this.searchTitle = this.searchTitle.bind(this);
    this.listStreams = this.listStreams.bind(this)
    this.data = []
    this.url = window.location.origin + window.location.pathname
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList() {
    fetch(`${this.url}/movies.json`, {
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
  searchJson(title) {
    let results = []
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i]["originalTitle"].toLowerCase().includes(title.toLowerCase()))
        results.push(this.data[i]);
    }
    return results
  }

  searchTitle(event) {
    let title = event.target.value
    if (title.length < 3) return
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ ...this.state, options: this.searchJson(title) });
    }, 300);
  }

  listStreams() {
    let items = this.searchJson(document.getElementById("imdb_search").value)
    let imdbId = items[0].tconst
    this.setState({ ...this.state, streamList: <StreamList key={imdbId} imdbId={imdbId} /> })
  }

  render() {

    return (
      <Fragment>
        <Autocomplete
          id="imdb_search"
          style={{ width: '100%' }}
          open={this.state.open}
          onOpen={() => { this.setState({ ...this.state, open: true }); }}
          onClose={() => { this.setState({ ...this.state, open: false }); }}
          getOptionSelected={(option, value) => option.originalTitle === value.originalTitle}
          getOptionLabel={option => option.originalTitle}
          options={this.state.options}
          renderTags={this.listStreams}
          renderInput={params => (
            <TextField
              {...params}
              label="Type the movie name"
              variant="outlined"
              onChange={ev => { this.searchTitle(ev) }}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        /><Button variant="contained" onClick={this.listStreams}>Search Available streams</Button>
        {this.state.streamList}
      </Fragment>
    );
  }
}


export default App;
