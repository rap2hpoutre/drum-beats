import React, {Component} from 'react';
import 'whatwg-fetch';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        console.log(window.location.href);
        this.state = {
            wav: '#'
        };
    };

    render() {
        return (
            <div>
                <header>
                    <h1>Procedural Drum Loops for Lazy Composers</h1>
                </header>
                {this.state.name}
                <div>
                    <audio src={this.state.wav} preload="auto" controls
                           loop></audio>
                </div>
            </div>
        );
    };

    componentDidMount() {
        let that = this;
        console.log(window.location.href);

        if (window.location.href === 'http://localhost:3000/') {
            that.setState({
                name: "test.wav",
                wav: "static/test.wav"
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
