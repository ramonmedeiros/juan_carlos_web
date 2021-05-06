import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

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

            var file = torrent.files.find(function (file) {
                return file.name.endsWith('.mp4')
            })

            file.getBlobURL(function (err, url) {
                if (err) throw err
                document.getElementById("progress").remove()
                document.getElementById("player").src = url
            })
        })
    }

    generateMagnetLink(infoHash) {
        return `magnet:?xt=urn:btih:${infoHash}&tr=udp://tracker.openbittorrent.com:6969&tr=udp://tracker.coppersurfer.tk:6969&udp://www.torrent.eu.org:451&tr=udp://open.stealth.si:80&tr=udp://tracker.opentrackr.org:1337&tr=wss://tracker.openwebtorrent.com`
    }

    render() {
        return (
            <React.Fragment>
                <CircularProgress id="progress" />
                <br />
                <video controls id="player" width="100%"></video>
            </React.Fragment>)
    }
}

export default withRouter(Watch);
