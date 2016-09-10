import React, {Component} from 'react';
import 'whatwg-fetch';
import ReactAudioPlayer from 'react-audio-player';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        console.log(window.location.href);
        this.state = {
            wav: '#',
            name: '#',
        };
    };

    render() {
        return (
            <div>
                <header>
                    <h1>Procedural Drum Loops for Lazy Composers</h1>
                </header>

                <br/>
                <p>
                    Listen and download unique random 4 bar 120 bpm drum beats.
                    Refresh for a new one.
                    Some are OK, some are not OK.
                    Use it for free.
                    Drum loops are made in Ruby with Sonic PI.
                    Website was built with Rust, Redis and React.
                    Names are generated using PHP.
                    Feel free to ask me anything: raphaelht@gmail.com
                </p>
                <div className="wav">
                    <h2>{this.state.name}</h2>
                    <br/>
                    <ReactAudioPlayer
                        src={this.state.wav}
                    />
                    <br/>
                    <h2><a href={this.state.wav}>Download</a> <small>(right click, save as)</small></h2>
                    <br/>
                    <h2><a href="/">Get another one</a></h2>
                </div>
            </div>
        );
    };

    componentDidMount() {
        let that = this;
        console.log(window.location.href);

        if (window.location.href === 'http://localhost:3000/') {
            that.setState({
                name: "full-sheep-432.wav",
                wav: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a"
            });
        } else {
            fetch('/wav').then(function (response) {
                return response.json()
            }).then(function (json) {
                that.setState({
                    name: json.name.split(/[\/]+/).pop(),
                    wav: json.name
                });
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            });
        }


    }
}

export default App;
