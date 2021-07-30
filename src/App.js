import logo from './logo.svg';
import './App.css';
import React from 'react'
import Data from './backend/Data.js'

import {CASE, CHAPTER, NOMINATIVE, ACCUSATIVE} from './backend/Filters.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Data.loadData();
  }

  click() {
    console.log(Data.getRecords({ [CHAPTER]: [2, 3], [CASE]: [NOMINATIVE, ACCUSATIVE] }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.click}>hi!</button>
        </header>
      </div>
    );
  }
}

export default App;
