import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
    apiKey: 'YOUR_API_KEY'
});


const particleOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};


class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(
            function(response) {
                console.log(response.output[0].data.regions[0].region_info.bounding_box);
            },
            function (err) {
                
            }
        );
    };

    render() {
        return (
            <div className="App">
                <Particles className="particles"
                    params={particleOptions}
                />
                <Navigation/>
                <Logo />
                <Rank />
                <ImageLinkForm
                    onInputChange = {this.onInputChange}
                    onButtonSubmit = {this.onButtonSubmit}
                />
                <FaceRecognition imageUrl={this.state.imageUrl} />
            </div>
        );
    }
}


export default App;
