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

  /*
  static loadDataIntoSessionStorage() {
    sessionStorage.clear()
    Papa.parse(vocabFile, {
      complete: function(results) {
        results.data.forEach(result => Data.vocab.push(result))
        sessionStorage.setItem('vocab', JSON.stringify(results.data));
      },
      delimiter: '\t',
      download: true,
      header: true
    });
  }
  */

  static loadFull() {
    if (Data.vocab.length > 0 && Object.keys(Data.morphs).length > 0) {
      let vocabMap = {}
      Data.vocab.forEach(v => vocabMap[v[LEMMA]] = v)

      Data.full = []
      Data.morphs
        .filter(morph => {
          if (!vocabMap[morph[LEMMA]]) {
            console.log("no vocab corresponding to morph for " + morph[LEMMA])
          }
          return vocabMap[morph[LEMMA]]
        })
        .forEach(
          morph => 
            Data.full.push(
              Object.assign(
                {}, 
                morph, 
                vocabMap[morph[LEMMA]],
                { [CHAPTER]: parseInt(vocabMap[morph[LEMMA]][CHAPTER], 10) })))
    }
  }

  static loadData() {
    Data.vocab = []
    Papa.parse(vocabFile, {
      delimiter: '\t',
      download: true,
      header: true,
      complete: results => {
        results.data
          .filter(result => result['Lemma'])
          .forEach(result => Data.vocab.push(result))
        Data.loadFull()
      },
    });

    Data.morphs = []
    Papa.parse(morphsFile, {
      delimiter: '\t',
      download: true,
      header: true,
      complete: results => {
        results.data
          .filter(result => result['Lemma'])
          .forEach(result => Data.morphs.push(result))
        Data.loadFull()
      },
    });

    Data.esv = {}
    Papa.parse(esvFile, {
      delimiter: '\t',
      download: true,
      header: true,
      complete: results =>
        results.data.forEach(result => Data.esv[result[REFERENCE]] = result[TEXT]),
    });

    Data.na28 = {}
    Papa.parse(na28File, {
      delimiter: '\t',
      download: true,
      header: true,
      complete: results => 
        results.data.forEach(result => Data.na28[result[REFERENCE]] = result[TEXT]),
    });
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
