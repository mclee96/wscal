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
import Fade from 'react-bootstrap/Fade'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import Data from './backend/Data.js'

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
      showOffcanvas: false,
      limit: 10,
      chapters: '',
      flashcardFields: [RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, ESV],
      flashcards: [],
      flashcardsPreview: [],
      vocab: Data.getVocab(),
      blah: false,
    };

    this.toggleFilter = this.toggleFilter.bind(this)
    this.updateFields = this.updateFields.bind(this)
    this.updateFlashcardFields = this.updateFlashcardFields.bind(this)
    this.updateRecords = this.updateRecords.bind(this)
    this.updateChapter = this.updateChapter.bind(this)
    this.setOffcanvas = this.setOffcanvas.bind(this)
    this.downloadRecords = this.downloadRecords.bind(this)
  }

  static fields = 
    [RESULT, LEMMA, GENDER, CASE, TENSE, VOICE, MOOD, PERSON, NUMBER, GLOSS, PART, CHAPTER, ADVERB_TYPE, REFERENCE, ESV, NA28]
  static flashcardFields =
    [RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, ESV]

  componentDidMount() {
    Data.loadData().then((vocab) => this.setState({ vocab: vocab }));
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

  updateChapter(event) {
    this.setState({ chapters: event.target.value })
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

    let chapters = []
    let specific = []
    var allNumbers = true
    this.state.chapters.replaceAll('ch', '').split(',')
      .map(chapter => chapter.trim())
      .forEach(chapter => {
        if (chapter.includes('-')) {
          let range = chapter.split('-')
          for (var i = parseInt(range[0]); i < parseInt(range[1]) + 1; i++) {
            chapters.push(i.toString())
          }
        } else if (chapter === '') {
          // skip
        } else if (!isNaN(chapter)) {
          chapters.push(chapter)
        } else {
          allNumbers = false
          specific.push(chapter) 
        }
      })

    if (allNumbers) {
      filters[CHAPTER] = chapters
      filters[LEMMA] = []
    } else {
      specific.push.apply(specific, 
          Data.getVocab(chapters)
            .map(row => row[LEMMA]))
      filters[CHAPTER] = []
      filters[LEMMA] = specific
    }

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
    if (this.state.chapters !== null) {
      outputFilename += this.state.chapters
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

  setOffcanvas(value) {
    if (this.state.vocab.length > 0) {
      this.setState({ showOffcanvas: value })
    } else {
      this.setState({ 
        showOffcanvas: value,
        vocab: Data.getVocab()
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            "SM Baugh A Greek Primer"
          </p>
        </header>
        <Container>
          <Row>
          <Col sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
            <Row>
              <Button onClick={() => this.setState({ blah: !this.state.blah })}>hi!</Button>
            </Row>
            <Collapse in={this.state.blah} dimension="width">
              <div>
              <Container className="wat">
                <Table responsive striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th key='lemma' style={{whiteSpace: 'nowrap'}}>Lemma</th>
                      <th key='part' style={{whiteSpace: 'nowrap'}}>Part</th>
                      <th key='chapter' style={{whiteSpace: 'nowrap'}}>Ch</th>
                      {/*<th key='gloss' style={{whiteSpace: 'nowrap'}}>Gloss</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.vocab.map(row => (
                        <tr key={'tr-' + row[0] + row[1]}>
                          <td key='lemma' style={{whiteSpace: 'nowrap'}}>{row[LEMMA]}</td>
                          <td key='part' style={{whiteSpace: 'nowrap'}}>{row[PART]}</td>
                          <td key='chapter' style={{whiteSpace: 'nowrap'}}>{row[CHAPTER]}</td>
                          {/*<td key='gloss' style={{whiteSpace: 'nowrap'}}>{row[GLOSS]}</td>*/}
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Container>
              </div>
            </Collapse>
          </Col>
          <Col>
          <Alert variant="success" style={{ textAlign: 'left' }}>
            <Row>
              <h5>(1) I want to study...</h5>
              <InputGroup size="sm">
                <Button variant="primary" onClick={(e) => this.setOffcanvas(true, e)} className="me-2">
                  Browse Vocab
                </Button>
                <Form.Control
                  aria-label="chapter restrictions (e.g. 2 or 2,3 or 2-4)"
                  aria-describedby="basic-addon1"
                  placeholder='e.g. "ch2,10-11,πᾶς,εἰμί". Leave blank for any chapter/word.'
                  onChange={this.updateChapter}
                />
                <ToggleButtonGroup type="checkbox" size="sm">
                  <ToggleButton variant="outline-secondary" value="nouns" id="nouns-filter" onClick={(e) => this.toggleFilter(PART, NOUN, e)}>
                    nouns
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="verbs" id="verbs-filter" onClick={(e) => this.toggleFilter(PART, VERB, e)}>
                    verbs
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="adjectives" id="adjectives-filter" onClick={(e) => this.toggleFilter(PART, ADJECTIVE, e)}>
                    adjectives
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="prepositions" id="prepositions-filter" onClick={(e) => this.toggleFilter(PART, PREPOSITION, e)}>
                    preps
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="pronouns" id="pronouns-filter" onClick={(e) => this.toggleFilter(PART, PRONOUN, e)}>
                    pronouns
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="adverb" id="adverbs-filter" onClick={(e) => this.toggleFilter(PART, ADVERB, e)}>
                    adverbs
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" value="conjunctions" id="conjunctions-filter" onClick={(e) => this.toggleFilter(PART, CONJUNCTION, e)}>
                    conjunctions
                  </ToggleButton>
                </ToggleButtonGroup>
              </InputGroup>
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
            <h5>blah blah blah</h5>
            <Row>
              <div>
                <Badge pill className='me-1' bg="primary" as="button" style={{ borderWidth: 'thin' }}>
                  feminine
                </Badge>
                <Badge pill className='me-2' bg="primary" as="button" style={{ borderWidth: 'thin' }}>
                  masculine
                </Badge>
                <Badge pill className='me-1' bg="secondary" as="button" style={{ borderWidth: 'thin' }}>
                  Primary
                </Badge>
                <Badge pill className='me-2' bg="info" as="button" style={{ borderWidth: 'thin' }}>
                  Primary
                </Badge>
              </div>
            </Row>
          </Alert>
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
          <Offcanvas show={this.state.showOffcanvas} onHide={(e) => this.setOffcanvas(false, e)} placement="start" scoll="true">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Vocab</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Container>
                <Table responsive striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th key='lemma' style={{whiteSpace: 'nowrap'}}>Lemma</th>
                      <th key='part' style={{whiteSpace: 'nowrap'}}>Part</th>
                      <th key='chapter' style={{whiteSpace: 'nowrap'}}>Ch</th>
                      <th key='gloss' style={{whiteSpace: 'nowrap'}}>Gloss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.vocab.map(row => (
                        <tr key={'tr-' + row[0] + row[1]}>
                          <td key='lemma' style={{whiteSpace: 'nowrap'}}>{row[LEMMA]}</td>
                          <td key='part' style={{whiteSpace: 'nowrap'}}>{row[PART]}</td>
                          <td key='chapter' style={{whiteSpace: 'nowrap'}}>{row[CHAPTER]}</td>
                          <td key='gloss' style={{whiteSpace: 'nowrap'}}>{row[GLOSS]}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Container>
            </Offcanvas.Body>
          </Offcanvas>
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
