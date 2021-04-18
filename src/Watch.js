import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Watch extends Component {

    constructor(props) {
        super(props)
        this.infoHash = props.match.params.id
    }

    componentDidMount() {
        this.startStream()
    }

    startStream() {
        var client = new window.WebTorrent()

        client.add(this.generateMagnetLink(this.infoHash), (torrent) => {
            console.log("AAAAAAAAAA")
            console.log(torrent.files)
            var file = torrent.files.find(function (file) {
                return file.name.endsWith('.mp4')
            })

            file.appendTo('#player')

            torrent.on('download', function (bytes) {
                console.log('just downloaded: ' + bytes)
                console.log('total downloaded: ' + torrent.downloaded)
                console.log('download speed: ' + torrent.downloadSpeed)
                console.log('progress: ' + torrent.progress)
            })

        })
    }

    generateMagnetLink(infoHash) {
        return `magnet:?xt=urn:btih:${infoHash}&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F`
    }

    render() {
        return (
            <React.Fragment>
                <div id="player"></div>
            </React.Fragment>)
    }
}

export default withRouter(Watch);
