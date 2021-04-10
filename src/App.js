import { React, Component } from 'react';
import StreamList from './StreamList';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
});


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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            WebStremio
        </Typography>
          <Autocomplete
            id="imdb_search"
            style={{ width: 500 }}
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
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">We love Stremio</Typography>
          </Container>
        </footer>
      </div>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
