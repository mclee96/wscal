import './App.css';
import React from 'react'
import Data from './backend/Data.js'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import 'bootstrap/dist/css/bootstrap.min.css';


import {ALL, ADVERB, RESULT, LEMMA, CASE, GENDER, NUMBER, MOOD, PART, PERSON, TENSE, VOICE, CHAPTER, GLOSS, REFERENCE, ESV, NA28} from './backend/Filters.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      records: [],
      filters: {},
      fields: [LEMMA, RESULT, GENDER, CASE, TENSE, VOICE, MOOD, PERSON, NUMBER, GLOSS, PART, CHAPTER, REFERENCE, ESV, NA28],
      showOffcanvas: false,
      limit: 20,
    };
    console.log("constructor")

    this.updateFilters = this.updateFilters.bind(this)
    this.updateFields = this.updateFields.bind(this)
    this.updateRecords = this.updateRecords.bind(this)
    this.setOffcanvas = this.setOffcanvas.bind(this)
  }

  static fields = 
    [LEMMA, RESULT, GENDER, CASE, TENSE, VOICE, MOOD, PERSON, NUMBER, GLOSS, PART, CHAPTER, ADVERB, REFERENCE, ESV, NA28]

  componentDidMount() {
    Data.loadData((records) => this.setState({ records: records }));
  }

  updateFilters(type, value) {
    this.setState((state, props) => {
      let currFilters = state.filters[type] || []
      let newFilters = currFilters.slice()

      if (currFilters.includes(value)) {
        newFilters.splice(newFilters.indexOf(value), 1)
      } else {
        newFilters.push(value)
      }

      return { filters: Object.assign({}, state.filters, { [type]: newFilters }) }
    })
  }

  updateFields(value) {
    this.setState((state, props) => {
      let fields = (state.fields || []).slice()
      if (fields.includes(value)) {
        fields.splice(fields.indexOf(value), 1)
      } else {
        fields.push(value)
      }

      return { fields: fields }
    })
  }

  updateRecords() {
    this.setState({ records: Data.getRecords(this.state.filters) })
  }

  setOffcanvas(value) {
    this.setState({ showOffcanvas: value })
  }

  render() {
    const index = Math.floor(Math.random() * this.state.records.length - 10)
    return (
      <div className="App">
        <header className="App-header">
          <p>
            "SM Baugh A Greek Primer"
          </p>
        </header>
        <Container>
          <Offcanvas show={this.state.showOffcanvas} onHide={(e) => this.setOffcanvas(false, e)} placement="start" scoll="true">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Adjust filters</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* filter selection */}
              <Container>
                {Object.keys(ALL).map(filterType => (
                  <Row style={ { margin: '1rem' } }>
                    <ToggleButtonGroup id={filterType} key={filterType} defaultValue={ALL[filterType]} type="checkbox" size="sm" style={{justifyContent: 'space-between'}}>
                      {ALL[filterType].map(filterValue => (
                        <ToggleButton key={filterValue} id={filterValue} value={filterValue} variant='outline-success' onClick={(e) => this.updateFilters(filterType, filterValue, e)}>
                          {filterValue}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Row>
                ))}
              <Button onClick={(e) => { this.updateRecords(e); this.setOffcanvas(false, e)} }>
                Refresh!
              </Button>
              </Container>
            </Offcanvas.Body>
          </Offcanvas>

          {/* header section */}
          <Row>
            <Col>
              <Button variant="primary" onClick={(e) => this.setOffcanvas(true, e)} className="me-2">
                Adjust filters
              </Button>
            </Col>
            <Col>
              <Button onClick={this.updateRecords}>
                Refresh!
              </Button>
            </Col>
          </Row>
          <Row style={ { marginTop: '1rem' } }>
            <Col>
              {/* refresh! */}
              <Row>
                <Container>
                </Container>
              </Row>
              <Row>
                {/* select output */}
                <ButtonGroup defaultValue={this.state.fields} size="sm">
                  {App.fields.map(field => (
                    <Button key={field} id={field} value={field} active={this.state.fields.includes(field)} variant='outline-secondary' onClick={(e) => this.updateFields(field, e)}>
                      {field}
                    </Button>
                  ))
                  }
                </ButtonGroup>
              </Row>
              {/* preview dataset */}
              <Row>
                <Table responsive striped bordered hover size="sm">
                  <thead>
                    <tr>
                      {App.fields.filter(field => this.state.fields.includes(field)).map(field => (
                          <th key={field} style={{whiteSpace: 'nowrap'}}>{field}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.records.slice(index, index + this.state.limit).map(record => (
                        <tr key={'tr-' + record[RESULT]}>
                          {App.fields.filter(field => this.state.fields.includes(field)).map(field => (
                            <td key={field} style={{whiteSpace: 'nowrap'}}>{record[field]}</td>
                          ))}
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
