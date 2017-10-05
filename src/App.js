import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

import Table from './components/Table/Table';

/**
 * Primary application component. Handles main search.
 *
 * TODO: Remove CORS proxy.
 *
 */

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            citySearch: '',
            carriers: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({citySearch: e.target.value});
    }

    submitSearch(e) {
        e.preventDefault();
        axios.get(`http://cors-proxy.htmldriven.com/?url=http://arrive-interview-api.azurewebsites.net/api/carriers/${this.state.citySearch}`)
            .then(res => {
                this.setState({
                    carriers: JSON.parse(res.data.body)
                });
            })
            .catch(err => {
                console.log(`Query error thrown: ${err}`);
            })
    }

    render() {
        return (
            <main>
                <h1>Carriers</h1>
                    <form className={`grid-x align-center-middle`}>
                        <div className={`cell small-6`}>
                                <input type="text"
                                       value={this.state.value}
                                       onChange={this.handleChange}
                                       placeholder="Enter a City"
                                />
                        </div>
                        <button
                            onClick={this.submitSearch}
                            className={`button cell small-3`}>Search
                        </button>
                    </form>
                <div className={`callout`}>
                    <Table carriers={this.state.carriers}/>
                </div>
            </main>
        );
    }
}

export default App;