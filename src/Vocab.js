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
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import { VariableSizeGrid } from 'react-window'

import Data from './backend/Data.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';


import {ALL, ADVERB_TYPE, RESULT, LEMMA, CASE, GENDER, NUMBER, MOOD, PERSON, TENSE, VOICE, CHAPTER, GLOSS, REFERENCE, ESV, NA28} from './backend/Filters.js'
import {PART, NOUN, VERB, ADJECTIVE, PREPOSITION, PRONOUN, ADVERB, CONJUNCTION } from './backend/Filters.js'

class Vocab extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      vocab: Data.getVocab(),
    }
  }

  componentDidMount() {
    Data.loadData().then((vocab) => this.setState({ vocab: vocab }));
  }

  render() {
    const vocabHeadings = [LEMMA, CHAPTER, PART, GLOSS]
    const columnWidths = [70, 120, 30, 50]

    return (
      <Container>
        <InputGroup size="sm">
          <Form.Control
            aria-label="chapter restrictions (e.g. 2 or 2,3 or 2-4)"
            aria-describedby="basic-addon1"
            placeholder='e.g. "ch2,10-11,πᾶς,εἰμί". Leave blank for any chapter/word.'
            onChange={this.updateChapter} />
        </InputGroup>
        <VariableSizeGrid 
          height={500}
          width={300}
          columnCount={4}
          columnWidth={index => columnWidths[index]}
          rowCount={this.state.vocab.length} 
          rowHeight={index => 40}>
          {({ columnIndex, rowIndex, style }) => (
            <div style={Object.assign({}, style, { textAlign: 'left' })}>
              {columnIndex === 0 
                ?  <Badge bg="primary" as="Button" style={{ borderWidth: 'thin' }}>+ add</Badge>
                : this.state.vocab[rowIndex][vocabHeadings[columnIndex - 1]]
              }
            </div>
          )}
        </VariableSizeGrid>
      </Container>
    );
  }
}

export default Vocab;
