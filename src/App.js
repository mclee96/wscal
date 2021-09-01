import './App.css';
import React from 'react'

import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import Data from './backend/Data.js'
import Vocab from './Vocab.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';


import {ALL, ADVERB_TYPE, RESULT, LEMMA, CASE, GENDER, NUMBER, MOOD, PERSON, TENSE, VOICE, CHAPTER, GLOSS, REFERENCE, ESV, NA28} from './backend/Filters.js'
import {PART, NOUN, VERB, ADJECTIVE, PREPOSITION, PRONOUN, ADVERB, CONJUNCTION } from './backend/Filters.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      records: [],
      display: [],
      filters: {},
      fields: [RESULT, LEMMA, GENDER, CASE, TENSE, VOICE, MOOD, PERSON, NUMBER, GLOSS, PART, CHAPTER],
      limit: 10,
      flashcardFields: [RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, ESV],
      flashcards: [],
      flashcardsPreview: [],

      showVocab: true,
      selected: {},   // map of (criteria -> array of vocab rows)
    };

    this.vocab = []

    this.toggleFilter = this.toggleFilter.bind(this)
    this.updateFields = this.updateFields.bind(this)
    this.updateFlashcardFields = this.updateFlashcardFields.bind(this)
    this.updateRecords = this.updateRecords.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.downloadRecords = this.downloadRecords.bind(this)
    this.getSelected = this.getSelected.bind(this)
  }

  static fields = 
    [RESULT, LEMMA, GENDER, CASE, TENSE, VOICE, MOOD, PERSON, NUMBER, GLOSS, PART, CHAPTER, ADVERB_TYPE, REFERENCE, ESV, NA28]
  static flashcardFields =
    [RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, ESV]

  componentDidMount() {
    Data.loadData().then((vocab) => { this.vocab = vocab })
  }

  toggleFilter(type, value) {
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
    // TODO: refresh here?
  }

  toggleSelect(display, rows, mode) {
    if (mode === 'toggle') {
      mode = (Object.keys(this.state.selected).some(disp => disp === display))
        ? 'remove'
        : 'add'
    }

    if (mode === 'add') {
      this.setState((state, props) => {
        return {
          selected: Object.assign({}, state.selected, { [display]: rows })
        }
      })
    }

    if (mode === 'remove') {
      let select = Object.assign({}, this.state.selected)
      delete select[display]
      this.setState((state, props) => {
        return { selected: select }
      })
    }
  }

  updateFields(value) { this.setState((state, props) => {
      let fields = (state.fields || []).slice()
      if (fields.includes(value)) {
        fields.splice(fields.indexOf(value), 1)
      } else {
        fields.push(value)
      }

      return { fields: fields }
    })
  }

  updateFlashcardFields(value) {
    this.setState((state, props) => {
      let flashcardFields = (state.flashcardFields || []).slice()
      if (flashcardFields.includes(value)) {
        flashcardFields.splice(flashcardFields.indexOf(value), 1)
      } else {
        flashcardFields.push(value)
      }

      return { flashcardFields: flashcardFields }
    })
  }

  updateRecords() {
    let filters = Object.assign({}, this.state.filters)

    var vocab = []
    Object.values(this.state.selected)
      .forEach(arr => vocab = vocab.concat(arr))
    filters[LEMMA] = vocab.map(row => row[LEMMA])

    let records = Data.getRecords(filters)
    let flashcards = Data.getFlashcards(filters, this.state.flashcardFields)
    const index = Math.floor(Math.random() * records.length - this.state.limit)
    const flashcardsIndex = flashcards.length > this.state.limit
      ?  Math.floor(Math.random() * (flashcards.length - this.state.limit))
      : 0

    this.setState(
    { 
      records: records,
      display: records.slice(index, index + this.state.limit),
      flashcards: flashcards,
      flashcardsPreview: flashcards.slice(flashcardsIndex, flashcardsIndex + this.state.limit),
    })
  }

  downloadRecords() {
    var text = this.state.flashcards.map(row => row[0] + '\t' + row[1]).join('\n')
    var blob = new Blob([ text ], { type: "text/plain;charset=utf-8" })

    var outputFilename = new Date().toLocaleString('en-US', { hour12: false }).replaceAll('/', '.').replaceAll(':', '∶').replace(', ', '_') + '_flashcards_'
    if (this.state.selected !== null) {
      outputFilename += Object.keys(this.state.selected).join()
    }
    if (Object.values(this.state.filters).some(filterSet => filterSet.length > 0)) {
      outputFilename += '_'
      outputFilename += Object.values(this.state.filters).map(filterSet => filterSet.join(',')).join('_')
    }
    if (outputFilename.length > 100) {
      outputFilename = outputFilename.substr(0, 100) + '...(full name cut off)'
    }
    outputFilename += '.tsv'
    saveAs(blob, outputFilename)
  }

  getSelected() {
    var flattened = []
    Object.values(this.state.selected)
      .forEach(arr => flattened = flattened.concat(arr))
    return flattened
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p></p>
        </header>
        <Container fluid>
          <Row>
            <Col sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
              <ToggleButton 
                id="show-vocab"
                value="show-vocab"
                type="checkbox"
                variant="outline-primary"
                size="sm"
                checked={this.state.showVocab}
                onClick={() => this.setState({ showVocab: !this.state.showVocab })}>
                >
              </ToggleButton>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm="auto" md="auto" lg="auto" xl="auto" xxl="auto" className="pe-0">
              <Collapse in={this.state.showVocab} dimension="width">
                <div>
                  <Vocab 
                    selected={this.getSelected()}
                    onSelect={this.toggleSelect}/>
                </div>
              </Collapse>
            </Col>
            <Col className="ps-0">
              <Alert variant="success" style={{ textAlign: 'left' }}>
                <Row>
                  <h5>(1) I want to study...</h5>
                  <Row>
                    <Col>
                      {Object.keys(this.state.selected).map(display => (
                          <Badge pill
                            key={display}
                            className='me-1'
                            bg="primary"
                            as="button" 
                            style={{ borderWidth: 'thin' }}
                            onClick={() => this.toggleSelect(display, [], 'remove')}>
                            {display}
                          </Badge>
                        ))
                      }
                    </Col>
                  </Row>
                </Row>
                <Row style={{ marginTop: '1rem' }}>
                  <h5>(2) ...with filters...</h5>
                {/* filter selection */}
                  <ButtonToolbar style={{justifyContent: 'space-between'}}>

                  {Object.keys(ALL)
                    .filter(field => field !== PART)
                    .map(filterType => (
                    <ToggleButtonGroup id={filterType} key={filterType} type="checkbox" size="sm" >
                      {ALL[filterType].map(filterValue => (
                        <ToggleButton key={filterValue} id={filterValue} value={filterValue} variant='outline-success' onClick={(e) => this.toggleFilter(filterType, filterValue, e)}>
                          {filterValue}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  ))}
                  </ButtonToolbar>
                </Row>
              </Alert>
              {/*
              <Alert variant="dark" style={{ textAlign: 'left' }}>
              </Alert>
              */}
              <Alert variant="danger" style={{ textAlign: 'left' }}>
                <h5>(3) ...adjust flashcard fields...</h5>
                <Row>
                  <ButtonGroup defaultValue={this.state.flashcardFields} size="sm">
                    {App.flashcardFields.map(field => (
                      <Button key={field} id={field} value={field} active={this.state.flashcardFields.includes(field)} variant='outline-secondary' onClick={(e) => this.updateFlashcardFields(field, e)}>
                        {field}
                      </Button>
                    ))
                    }
                  </ButtonGroup>
                </Row>
              </Alert>
              <Alert variant="info" style={{ textAlign: 'left' }}>
                  <Row>
                    <Col>
                      <h5>(4) ...preview!</h5>
                    </Col>
                    {/* refresh! */}
                    <Col style={{ textAlign: 'right' }}>
                      <Button onClick={this.updateRecords} variant="primary">
                        Refresh!
                      </Button>
                    </Col>
                  </Row>
                  {/* preview dataset */}
                  <Row>
                    <Table responsive striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th key='front' style={{whiteSpace: 'nowrap'}}>Front</th>
                          <th key='back' style={{whiteSpace: 'nowrap'}}>Back</th>
                          {/*
                          {App.fields.filter(field => this.state.fields.includes(field)).map(field => (
                              <th key={field} style={{whiteSpace: 'nowrap'}}>{field}</th>
                          ))}
                          */}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.flashcardsPreview.map(row => (
                            <tr key={'tr-' + row[0] + row[1]}>
                              <td key='front' style={{whiteSpace: 'nowrap'}}>{row[0]}</td>
                              <td key='back' style={{whiteSpace: 'nowrap'}}>{row[1]}</td>
                              {/*
                              {App.fields.filter(field => this.state.fields.includes(field)).map(field => (
                                <td key={field} style={{whiteSpace: 'nowrap'}}>{record[field]}</td>
                              ))}
                              */}
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </Row>
              </Alert>
              {/* header section */}
              <Alert variant="secondary" style={{ textAlign: 'left' }}>
                <h5>(5) Download flashcards</h5>
                <Row>
                  <Col>
                    <Button onClick={this.downloadRecords}>
                      Download Set ({this.state.flashcards.length} flashcards)
                    </Button>
                  </Col>
                </Row>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
