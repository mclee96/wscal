import vocabFile from './vocab.tsv'
import morphsFile from './morphs.tsv'
import esvFile from './esv.tsv'
import na28File from './na28.tsv'

import {CHAPTER, ESV, LEMMA, NA28, REFERENCE, TEXT} from './Filters.js'

const Papa = require('papaparse');

class Data {
  static vocab = []
  static morphs = []
  static esv = {}
  static na28 = {}
  static full = []

  static loadFull() {
    let vocabMap = {}
    Data.vocab.forEach(v => vocabMap[v[LEMMA]] = v)

    let temp = []
    Data.morphs
      .filter(morph => {
        if (!vocabMap[morph[LEMMA]]) {
          console.log("no vocab corresponding to morph for " + morph[LEMMA])
        }
        return vocabMap[morph[LEMMA]]
      })
      .forEach(
        morph => 
          temp.push(
            Object.assign(
              {}, 
              morph, 
              vocabMap[morph[LEMMA]],
              { [CHAPTER]: parseInt(vocabMap[morph[LEMMA]][CHAPTER], 10) })))
    Data.full = temp
  }

  static loadData(callback) {
    console.log("loadData")
    if (Data.vocab.length === 0) {
      Papa.parse(vocabFile, {
        delimiter: '\t',
        download: true,
        header: true,
        complete: results => {
          let temp = []
          results.data
            .filter(result => result['Lemma'])
            .forEach(result => temp.push(result))
          Data.vocab = temp

          // post-processing
          if (Data.vocab.length > 0 && Data.morphs.length > 0) {
            Data.loadFull()
          }
          if (Data.vocab.length > 0 && 
              Data.morphs.length > 0 &&
              Object.keys(Data.esv).length > 0 &&
              Object.keys(Data.na28).length > 0) {
            callback(Data.full)
          }
        },
      });
    }

    if (Data.morphs.length === 0) {
      Papa.parse(morphsFile, {
        delimiter: '\t',
        download: true,
        header: true,
        complete: results => {
          let temp = []
          results.data
            .filter(result => result['Lemma'])
            .forEach(result => temp.push(result))
          Data.morphs = temp

          // post-processing
          if (Data.vocab.length > 0 && Data.morphs.length > 0) {
            Data.loadFull()
          }
          if (Data.vocab.length > 0 &&
              Data.morphs.length > 0 &&
              Object.keys(Data.esv).length > 0 &&
              Object.keys(Data.na28).length > 0) {
            callback(Data.full)
          }
        },
      });
    }

    if (Object.keys(Data.esv).length === 0) {
      Papa.parse(esvFile, {
        delimiter: '\t',
        download: true,
        header: true,
        complete: results => {
          results.data.forEach(result => Data.esv[result[REFERENCE]] = result[TEXT])
          if (Data.vocab.length > 0 &&
              Data.morphs.length > 0 &&
              Object.keys(Data.esv).length > 0 &&
              Object.keys(Data.na28).length > 0) {
            callback(Data.full)
          }
        }
      });
    }

    if (Object.keys(Data.na28).length === 0) {
      Papa.parse(na28File, {
        delimiter: '\t',
        download: true,
        header: true,
        complete: results => {
          results.data.forEach(result => Data.na28[result[REFERENCE]] = result[TEXT])
          if (Data.vocab.length > 0 &&
              Data.morphs.length > 0 &&
              Object.keys(Data.esv).length > 0 &&
              Object.keys(Data.na28).length > 0) {
            callback(Data.full)
          }
        }
      });
    }
  }

  static getRecords(filters) {
    return Data.full
      .filter(
          row => Object.keys(filters).every(
              fil => Array.isArray(filters[fil]) 
                  ? filters[fil].length === 0 || filters[fil].includes(row[fil])
                  : row[fil] === filters[fil]))
      .map(row => {
        let refs = row[REFERENCE].split(',')
        let ref = refs[Math.floor((Math.random() * refs.length))]
        return Object.assign(
            {}, 
            row, 
            { 
              [REFERENCE]: ref,
              [ESV]: Data.esv[ref],
              [NA28]: Data.na28[ref],
            })
      })
  }
}

export default Data;
