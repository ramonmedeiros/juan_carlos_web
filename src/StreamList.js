import { Component, Fragment } from 'react';
import WebTorrent from 'webtorrent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const JuanCarlos = "https://juan.best4stremio.space/stremioget/stremio/v1/q.json?b="

class StreamList extends Component {

	constructor(props) {
		super(props)
		this.props = props
		this.imdbId = props.imdbId
		this.state = { streams: [] }
		this.startStream = this.startStream.bind(this)
	}

	componentDidMount() {
		this.listStreams()
	}

	buildQuery() {
		let params = {
			"params": [
				null,
				{
					"query": {
						"imdb_id": this.imdbId,
						"type": "movie",
						"video_id": this.imdbId
					}
				}
			],
			"method": "stream.find",
			"id": 1,
			"jsonrpc": "2.0"
		}

		return btoa(JSON.stringify(params))
	}

	listStreams() {
		fetch(`${JuanCarlos}${this.buildQuery()}`, {
			method: 'GET',
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json()
			})
			.then(data => {
				this.generateList(data.result)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	startStream(event) {
		let magnetURI = event.target.parentElement.attributes.infohash.value
		var client = new WebTorrent()

		client.add(magnetURI, function (torrent) {
			// Torrents can contain many files. Let's use the .mp4 file
			debugger;
			console.log(torrent.files)
			var file = torrent.files.find(function (file) {
				return file.name.endsWith('.mp4')
			})

			// Display the file by adding it to the DOM.
			// Supports video, audio, image files, and more!
			file.appendTo('body')
		})
	}

	generateList(streams) {
		const items = []
		for (let stream of streams) {
			let movie = stream.filename
			if (movie === undefined)
				movie = document.getElementById("imdb_search").value
			items.push(<Fragment key={stream.infoHash}>
				<ListItem button>
					<ListItemText primary={movie} infohash={stream.infoHash} onClick={this.startStream} />
				</ListItem>
				<Divider />
			</Fragment>)
		}
		this.setState({ ...this.state, streams: items })
	}

	render() {
		return (
			<Fragment>
				<List component="nav" aria-label="mailbox folders">
					{this.state.streams}
				</List>
			</Fragment>
		)
	}
}
export default StreamList;