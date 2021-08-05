import morphFilepath from './morphs.tsv'
import esvFilepath from './esv.tsv'
import na28Filepath from './na28.tsv'

import {ABBR, CHAPTER, ESV, LEMMA, NA28, REFERENCE, TEXT} from './Filters.js'

const Papa = require('papaparse');

class Data {
  static morphs = []
  static esv = {}
  static na28 = {}

  static loadFile(filepath, callback) {
    if (localStorage.getItem(filepath) != null) {
      callback(localStorage.getItem(filepath))
    } else {
      let req = new XMLHttpRequest();
      req.addEventListener("load", (e) => {
        localStorage.setItem(filepath, req.responseText)
        callback(req.responseText)
      })
      req.open("GET", filepath);
      req.send();
    }
  }

  // idempotent
  static loadData(callback) {
    if (Data.morphs.length === 0) {
      Data.loadFile(morphFilepath, (contents) => {
          let rows = []
          Papa.parse(contents.trimEnd(), { delimiter: '\t', header: true }).data
            .forEach(row => rows.push(row))
          Data.morphs = rows
          if (Data.morphs.length > 0 &&
              Object.keys(Data.esv).length > 0 &&
              Object.keys(Data.na28).length > 0) {
            callback(Data.getRecords({}))
          }
      })
    }

    if (Object.keys(Data.esv).length === 0) {
      Data.loadFile(esvFilepath, (contents) => {
        Papa.parse(contents.trimEnd(), { delimiter: '\t', header: true }).data
          .forEach(row => Data.esv[row[ABBR]] = row[TEXT])
        if (Data.morphs.length > 0 &&
            Object.keys(Data.esv).length > 0 &&
            Object.keys(Data.na28).length > 0) {
          callback(Data.getRecords({}))
        }
      })
    }

    if (Object.keys(Data.na28).length === 0) {
      Data.loadFile(na28Filepath, (contents) => {
        Papa.parse(contents.trimEnd(), { delimiter: '\t', header: true }).data
          .forEach(row => Data.na28[row[ABBR]] = row[TEXT])
        if (Data.morphs.length > 0 &&
            Object.keys(Data.esv).length > 0 &&
            Object.keys(Data.na28).length > 0) {
          callback(Data.getRecords({}))
        }
      })
    }
  }

  static getRecords(filters) {
    return Data.morphs
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
