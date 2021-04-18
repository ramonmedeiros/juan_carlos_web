import { Component, Fragment } from 'react';
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
		this.state = {
			torrentInfoHash: "",
			torrentMagnetURI: "",
			torrentName: "",
			torrentProgress: "",
			torrentFiles: [],
			mp4file: {},
			streams: []
		}
		this.watch = this.watch.bind(this)
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

	generateList(streams) {
		function ListItemLink(props) {
			return <ListItem button component="a" {...props} />;
		  }
		  
		const items = []
		for (let stream of streams) {
			let movie = stream.filename
			if (movie === undefined)
				movie = document.getElementById("imdb_search").value
			let link = `${window.location.href}${stream.infoHash}`
			items.push(<Fragment key={stream.infoHash}>
				<ListItemLink button href={link}>
					<ListItemText primary={movie} infohash={stream.infoHash} />
				</ListItemLink>
				<Divider />
			</Fragment>)
		}
		this.setState({ ...this.state, streams: items })
	}

	watch (link){
		window.location.href=link
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