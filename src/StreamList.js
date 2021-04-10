import { Component, Fragment } from 'react';
import WebTorrent from 'webtorrent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const TPB = "https://thepiratebay-plus.strem.fun/stream/movie/"

class StreamList extends Component {

	constructor(props) {
		super(props)
		this.imdbId = props.imdbId
		this.state = { streams: [] }
		this.startStream = this.startStream.bind(this)
	}

	componentDidMount(){
		this.listStreams()
	}

	listStreams() {
		fetch(`${TPB}${this.imdbId}.json`, {
			method: 'GET',
		})
			.then(response => response.json())
			.then(data => {
				this.generateList(data.streams)
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
			items.push(<Fragment>
				<ListItem button key={stream.infoHash}>
					<ListItemText key={stream.infoHash}	primary={stream.title} infohash={stream.infoHash} onClick={this.startStream} />
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