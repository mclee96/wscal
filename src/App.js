import logo from './logo.svg';
import './App.css';
import React from 'react'
import Data from './backend/Data.js'

import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import 'bootstrap/dist/css/bootstrap.min.css';


import {ALL, ADVERB, RESULT, LEMMA, CASE, GENDER, NUMBER, MOOD, PART, PERSON, TENSE, VOICE, CHAPTER, GLOSS, REFERENCE, ESV, NA28} from './backend/Filters.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      records: Data.getRecords({}),
      filters: {},
    };
    console.log(Data.getRecords({}))
    this.updateFilters = this.updateFilters.bind(this)
    this.getRecords = this.getRecords.bind(this)
  }

  updateFilters(type, filters) {
    this.setState((state, props) => {
      let newFilters = Object.assign(state['filters'], { [type]: filters })
      return { filters: newFilters }
    })
  }

  getRecords() {
    this.setState({ records: Data.getRecords(this.state.filters) })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            "SM Baugh A Greek Primer"
          </p>
        </header>
        {/* filter selection */}
        <Container>
          <ButtonToolbar style={{justifyContent: 'space-between'}}>
            {Object.keys(ALL).map(filterType => (
              <ToggleButtonGroup id={filterType} key={filterType} type="checkbox" onChange={(e) => this.updateFilters(filterType, e)}>
                {ALL[filterType].map(cse => (
                  <ToggleButton key={cse} id={cse} value={cse} variant='outline-danger' size="sm">
                    {cse}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            ))}
          </ButtonToolbar>
        </Container>

        {/* go! */}
        <Container>
          <Button onClick={this.getRecords}>
            Get Records!
          </Button>
        </Container>

        {/* select output */}
        <Container>
          <ToggleButtonGroup type="checkbox">
            {[RESULT, ADVERB, LEMMA, CASE, GENDER, NUMBER, MOOD, PART, PERSON, TENSE, VOICE, CHAPTER, GLOSS, REFERENCE, ESV, NA28].map(header => (
              <ToggleButton key={header} id={header} value={header} variant='outline-success' size="sm">
                {header}
              </ToggleButton>
            ))
            }
          </ToggleButtonGroup>
        </Container>

        {/* preview dataset */}
        <Container>
          <Table responsive bordered hover>
              <thead>
                <tr>
                  {Object.keys(this.state.records[0]).map(header => (
                    <th key={header} style={{whiteSpace: 'nowrap'}}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.records.slice(0, 5).map(record => (
                  <tr key={'tr-' + record[LEMMA]}>
                    {Object.keys(record).map(filter => (
                      <td key={filter} style={{whiteSpace: 'nowrap'}}>{record[filter]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
        </Container>
      </div>
    );
  }
}

export default App;
