import React from 'react'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { VariableSizeGrid } from 'react-window'

import Data from './backend/Data.js'

import 'bootstrap/dist/css/bootstrap.min.css';

import {LEMMA, CHAPTER, GLOSS, PART } from './backend/Filters.js'

class Vocab extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      display: [],
      selected: props.selected,
    }

    this.searchTimeout = 0
    this.vocab = []
    this.onSelect = props.onSelect.bind(this)

    this.search = this.search.bind(this)
    this.addAll = this.addAll.bind(this)
  }

  componentDidMount() {
    Data.loadData().then((vocab) => {
      this.vocab = vocab
      this.setState({ display: vocab })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({ selected: this.props.selected })
    }
  }

  search(criteria, e) {
    e.preventDefault()

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.searchTimeout = 
      setTimeout(() => this.setState({ display: this.filter(criteria) }), 100)
  }

  addAll(criteria, e) {
    e.preventDefault()

    this.onSelect(criteria, this.filter(criteria), 'add')
  }

  filter(criteria) {
    let filtered = []
    criteria.trim().split(',')
      .map(crit => {
          var search = crit.trim()

          // reset if no search
          if (!search) {
            return this.vocab
          }

          // handle number searching
          var range = crit.replaceAll('ch', '').split('-')
          if (range.every(num => !isNaN(num))) {
            if (range.length < 2) {
              range.push(parseInt(range[0]))
            }
            var rows = []
            for (var i = parseInt(range[0]); i < parseInt(range[1]) + 1; i++) {
              rows = rows.concat(
                this.vocab
                    .filter(row => Object.values(row)
                        .join()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, "")
                        .endsWith(',' + i.toString())))
            }
            return rows
          }

          // handle plural and abbreviations
          switch (search) {
            case 'nouns':
            case 'nns':
            case 'nn': search = 'noun'; break;
            case 'verbs':
            case 'vbs':
            case 'vb': search = 'verb'; break;
            case 'adjectives':
            case 'adjs':
            case 'adj': search = 'adjective'; break;
            case 'prepositions':
            case 'preps':
            case 'prep': search = 'preposition'; break;
            case 'conjunctions':
            case 'conjs':
            case 'conj': search = 'conjunction'; break;
            case 'adverbs':
            case 'advbs':
            case 'advb':
            case 'adv': search = 'adverb'; break;
          }

          let parts = ['noun', 'verb', 'adjective', 'preposition', 'conjunction', 'adverb']

          // handle part searching
          if (parts.includes(search)) {
            return this.vocab
                .filter(row => Object.values(row)
                    .join()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(',' + search.normalize('NFD') + ','))
          }

          // default search
          return this.vocab
              .filter(row => Object.values(row)
                  .join()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(search.normalize('NFD')))
      })
      .forEach(arr => filtered = filtered.concat(arr))

    return filtered
  }

  render() {
    const vocabHeadings = [LEMMA, CHAPTER, PART, GLOSS]
    const columnWidths = [50, 120, 30, 100, 500]

    return (
      <div style={{ maxWidth: '19em' }}>
        <Alert variant='light' style={{ textAlign: 'left', borderColor: 'lightgrey' }}>
          <h5>(1) vocab</h5>
          <Row className="me-1">
            <Col>
              <Form onSubmit={(e) => this.addAll(e.target[0].value, e)}>
                <InputGroup size="sm">
                  <Form.Control
                    type="text"
                    id="wat"
                    aria-label="chapter restrictions (e.g. 2 or 2,3 or 2-4)"
                    aria-describedby="basic-addon1"
                    placeholder='e.g. "ch2,10-11,πᾶς,εἰμί". Leave blank for any chapter/word.' 
                    onChange={(e) => this.search(e.target.value, e)} />
                  <Button
                    size="sm"
                    type="submit">Add All</Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <VariableSizeGrid
                height={480}
                width={300}
                columnCount={5}
                columnWidth={index => columnWidths[index]}
                rowCount={this.state.display.length}
                rowHeight={index => 30}>
                {({ columnIndex, rowIndex, style }) => (
                  <div style={Object.assign({}, style, { textAlign: 'left' })}>
                    {columnIndex === 0
                      ? <ToggleButton
                          className="ms-2"
                          id={rowIndex}
                          type="checkbox"
                          value={rowIndex}
                          variant="outline-primary"
                          checked={this.state.selected.includes(this.state.display[rowIndex])}
                          onClick={ () => this.onSelect(
                              this.state.display[rowIndex][LEMMA], 
                              [this.state.display[rowIndex]],
                              'toggle') }
                          style={{ lineHeight: 1, 
                                   fontSize: '.75em', 
                                   padding: '.35em .65em',
                                   fontWeight: 700 }}>
                          +
                        </ToggleButton>
                      : this.state.display[rowIndex][vocabHeadings[columnIndex - 1]]
                    }
                  </div>
                )}
              </VariableSizeGrid>
            </Col>
          </Row>
          <div>
            <hr />
          </div>
        <div>
        * chapters 1-30 cover S.M. Baugh's "A Greek Primer"
        </div>
        <div>
        * chapters  31-42 cover S.M. Baugh's "First John Reader"
        </div>
        <div>
        * so-called "chapters" beyond that are just...
        </div>
        </Alert>
      </div>
    );
  }
}

export default Vocab;
