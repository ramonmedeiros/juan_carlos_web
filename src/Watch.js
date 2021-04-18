import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class Watch extends Component {

    constructor(props) {
        super(props)
        this.infoHash = props.match.params.id
        this.loading = []
    }

    componentDidMount() {
        this.startStream()
        this.loading = <CircularProgress />
    }

    startStream() {
        var client = new window.WebTorrent()

        client.add(this.generateMagnetLink(this.infoHash), (torrent) => {
  
            var file = torrent.files.find(function (file) {
                return file.name.endsWith('.mp4')
            })

            file.appendTo('#player', function (err, elem) {
                if (err) throw err // file failed to download or display in the DOM
                this.loading=[]
                console.log('New DOM node with the content', elem)
              })

        })
    }

    generateMagnetLink(infoHash) {
        return `magnet:?xt=urn:btih:${infoHash}&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com`
    }

    render() {
        return (
            <React.Fragment>
                <div id="player">
                    {this.loading}
                </div>
            </React.Fragment>)
    }
}

export default withRouter(Watch);
