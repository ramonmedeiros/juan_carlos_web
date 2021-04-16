import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Watch extends Component {

    constructor(props) {
        super(props)
        try {
            this.infoHash = window.location.pathname.split("/")[3]
        } catch (error) {
            this.props.history.push("/")
        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js";
        script.async = true;
        script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
    }

    scriptLoaded() {
        this.startStream()
    }

    startStream() {
        var client = new window.WebTorrent()

        client.on('error', function (err) {
            console.error('ERROR: ' + err.message)
        })

        client.on('torrent', function (torrent) {
            console.log(torrent)
        })

        client.add(this.infoHash, (torrent) => {
            debugger
            var file = torrent.files.find(function (file) {
                return file.name.endsWith('.mp4')
            })

            file.appendTo('body')

            torrent.on('download', function (bytes) {
                console.log('just downloaded: ' + bytes)
                console.log('total downloaded: ' + torrent.downloaded)
                console.log('download speed: ' + torrent.downloadSpeed)
                console.log('progress: ' + torrent.progress)
            })

        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="player"></div>
            </React.Fragment>)
    }
}

export default withRouter(Watch);