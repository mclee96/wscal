import logo from './logo.svg';
import './App.css';
import React from 'react'
import Data from './backend/Data.js'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import 'bootstrap/dist/css/bootstrap.min.css';


import ALL from './backend/Filters.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.updateFilters = this.updateFilters.bind(this)
    this.getStudySet = this.getStudySet.bind(this)
  }

  updateFilters(type, filters) {
    this.setState((state, props) => Object.assign(state, { [type]: filters }))
  }

  getStudySet() {
    console.log(Data.getRecords(this.state))
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
          <Container>
            {Object.keys(ALL).map(filterType => (
              <Container>
                <ToggleButtonGroup id={filterType} key={filterType} type="checkbox" onChange={(e) => this.updateFilters(filterType, e)}>
                  {ALL[filterType].map(cse => (
                    <ToggleButton key={cse} id={cse} value={cse} variant='outline-danger'>
                      {cse}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Container>
            ))}
          </Container>
          <Button onClick={this.getStudySet}>
            Get Records!
          </Button>

        </header>
      </div>
    );
  }
}

export default App;
