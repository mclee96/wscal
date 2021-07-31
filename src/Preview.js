import React from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

import {ALL, ADVERB, RESULT, LEMMA, CASE, GENDER, NUMBER, MOOD, PART, PERSON, TENSE, VOICE, CHAPTER, GLOSS, REFERENCE, ESV, NA28} from './backend/Filters.js'

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.fields,
      records: props.records,
    }
    console.log("preview")
  }

  // defines order
  static fields = [
    LEMMA, 
    RESULT, 
    GENDER, 
    CASE, 
    TENSE, 
    VOICE, 
    MOOD, 
    PERSON, 
    NUMBER, 
    GLOSS, 
    PART, 
    CHAPTER, 
    ADVERB, 
    REFERENCE, 
    ESV, 
    NA28
  ]

  render() {
    console.log(this.props)
    return (
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            {
              Preview.fields
                .filter(field => this.props.fields.includes(field))
                .map(field => (
                  <th key={field} style={{whiteSpace: 'nowrap'}}>
                    {field}
                  </th>
                ))
            }
          </tr>
        </thead>
        <tbody>
          {
            this.props.records
                .map(record => (
                  <tr key={'tr-' + record[RESULT]}>
                    {
                      Preview.fields
                        .filter(field => this.props.fields.includes(field))
                        .map(field => (
                          <td key={field} style={{whiteSpace: 'nowrap'}}>
                            {record[field]}
                          </td>
                        ))
                    }
                  </tr>
                  ))
          }
        </tbody>
      </Table>
    )
  }
}

export default Preview;
