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
import Engine from './backend/Engine.js'
import VocabSelect from './VocabSelect.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';


import {ALL, ADVERB_TYPE, RESULT, LEMMA, CASE, GENDER, NUMBER, MOOD, PERSON, TENSE, VOICE, CHAPTER, GLOSS, REFERENCE, ENGLISH, GREEK} from './backend/Filters.js'
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
      flashcardFields: [RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, ENGLISH],
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
    [RESULT, LEMMA, GENDER, CASE, TENSE, VOICE, MOOD, PERSON, NUMBER, GLOSS, PART, CHAPTER, ADVERB_TYPE, REFERENCE, ENGLISH, GREEK]
  static flashcardFields =
    [RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, ENGLISH]

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

    Engine.getTranslations(filters)
    let records = Engine.getRecords(filters)
    let flashcards = Engine.getFlashcards(filters, this.state.flashcardFields)
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
          {/*
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
          */}
          <Row className="mt-3">
            <Col sm="6" md="6" lg="6" xl="6" xxl="6" className="pe-0">
              <Collapse in={this.state.showVocab} dimension="width">
                <div>
                  <VocabSelect
                    selected={this.getSelected()}
                    onSelect={this.toggleSelect}/>
                </div>
              </Collapse>
            </Col>
            <Col className="ps-0" sm="9" md="9" lg="9" xl="9" xxl="9">
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
                    <ToggleButtonGroup
                      id='Gender'
                      key='Gender'
                      type='checkbox'
                      size='sm'>
                        <ToggleButton 
                          key='feminine'
                          id='feminine'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='feminine'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Gender', 'feminine', e)}>
                          fem.
                        </ToggleButton>
                        <ToggleButton 
                          key='masculine'
                          id='masculine'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='masculine'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Gender', 'masculine', e)}>
                          mas.
                        </ToggleButton>
                        <ToggleButton 
                          key='neuter'
                          id='neuter'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='neuter'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Gender', 'neuter', e)}>
                          neu.
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      id='Case'
                      key='Case'
                      type='checkbox'
                      size='sm'>
                        <ToggleButton 
                          key='nominative'
                          id='nominative'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='nominative'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Case', 'nominative', e)}>
                          nom.
                        </ToggleButton>
                        <ToggleButton 
                          key='genitive'
                          id='genitive'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='genitive'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Case', 'genitive', e)}>
                          gen.
                        </ToggleButton>
                        <ToggleButton 
                          key='dative'
                          id='dative'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='dative'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Case', 'dative', e)}>
                          dat.
                        </ToggleButton>
                        <ToggleButton 
                          key='accusative'
                          id='accusative'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='accusative'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Case', 'accusative', e)}>
                          acc.
                        </ToggleButton>
                        <ToggleButton 
                          key='vocative'
                          id='vocative'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='vocative'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Case', 'vocative', e)}>
                          voc.
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      id='Person'
                      key='Person'
                      type='checkbox'
                      size='sm'>
                        <ToggleButton 
                          key='first person'
                          id='first person'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='first person'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Person', 'first person', e)}>
                          1p
                        </ToggleButton>
                        <ToggleButton 
                          key='second person'
                          id='second person'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='second person'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Person', 'second person', e)}>
                          2p
                        </ToggleButton>
                        <ToggleButton 
                          key='third person'
                          id='third person'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='third person'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Person', 'third person', e)}>
                          3p
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      id='Number'
                      key='Number'
                      type='checkbox'
                      size='sm'>
                        <ToggleButton 
                          key='singular'
                          id='singular'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='singular'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Number', 'singular', e)}>
                          sg.
                        </ToggleButton>
                        <ToggleButton 
                          key='pl.'
                          id='pl.'
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value='pl.'
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter('Number', 'pl.', e)}>
                          pl.
                        </ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>

                  <ButtonToolbar style={{justifyContent: 'space-between'}}>
                  {Object.keys(ALL)
                    .filter(field => field !== PART)
                    .map(filterType => (
                    <ToggleButtonGroup id={filterType} key={filterType} type="checkbox" size="sm" >
                      {ALL[filterType].map(filterValue => (
                        <ToggleButton 
                          key={filterValue} 
                          id={filterValue} 
                          style={{ lineHeight: 1, fontSize: '.75em' }}
                          value={filterValue} 
                          variant='outline-success' 
                          onClick={(e) => this.toggleFilter(filterType, filterValue, e)}>
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
                      <Button onClick={this.updateRecords} variant="primary">
                        Generate Translation Exercises
                      </Button>
                      <Button onClick={this.updateRecords} variant="primary">
                        Flip
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
