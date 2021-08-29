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

  addAll(criteria) {
    this.onSelect(criteria)
  }

  filter(criteria) {
    var search = criteria.trim()

    // reset if no search
    if (!search) {
      return this.vocab
    }

    if (!isNaN(criteria.replaceAll('ch', ''))) {
      search = criteria.replaceAll('ch', '')
    }

    if (!isNaN(search)) {
      return this.vocab
          .filter(row => Object.values(row)
              .join()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, "")
              .endsWith(',' + search.normalize('NFD')))
    } else {
      return this.vocab
          .filter(row => Object.values(row)
              .join()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, "")
              .includes(search.normalize('NFD')))
    }
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
              <Form onSubmit={(e) => this.search(e.target[0].value, e)}>
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
                          checked={this.state.selected.includes(this.vocab[rowIndex])}
                          onClick={ () => this.onSelect(rowIndex) }
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
