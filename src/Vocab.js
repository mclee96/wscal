import React from 'react'

import Badge from 'react-bootstrap/Badge'
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
      vocab: [],
      display:[],
      selected: [],
    }

    this.toggleSelect = this.toggleSelect.bind(this)
    this.search = this.search.bind(this)
    this.addAll = this.addAll.bind(this)
  }

  componentDidMount() {
    Data.loadData().then((vocab) => this.setState({ vocab: vocab, display: vocab }));
  }

  toggleSelect(vocabIndex) {
    this.setState((state, props) => { 
      if (!state.selected.includes(vocabIndex)) {
        // select vocab
        return { selected: state.selected.concat([vocabIndex]) }
      } else {
        // deselect vocab
        let sliceIndex = state.selected.indexOf(vocabIndex)
        return { selected: state.selected.slice(0, sliceIndex)
                   .concat(state.selected.slice(sliceIndex + 1)) }
      }
    })
  }

  search(text, e) {
    e.preventDefault()

    this.setState((state, props) => {
      return {
        display: state.vocab
          .filter(row => Object.values(row).join().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(text.normalize('NFD')))
      }
    })
  }

  addAll() {
  }

  render() {
    const vocabHeadings = [LEMMA, CHAPTER, PART, GLOSS]
    const columnWidths = [50, 120, 30, 100, 500]

    return (
      <div style={{ maxWidth: '19em' }}>
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
                        id={rowIndex}
                        type="checkbox"
                        value={rowIndex}
                        variant="outline-primary"
                        size="sm"
                        checked={this.state.selected.includes(rowIndex)}
                        onClick={ () => this.toggleSelect(rowIndex) }
                        text="primary"
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
        <Row>
          <Col>
            {this.state.selected.map(index => (
                <Badge pill
                  key={index}
                  className='me-1'
                  bg="primary"
                  as="button" 
                  style={{ borderWidth: 'thin' }}
                  onClick={ () => this.toggleSelect(index) }>
                  { this.state.vocab[index][LEMMA] }
                </Badge>
              ))
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default Vocab;
