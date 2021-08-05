import morphFilepath from './morphs.tsv'
import esvFilepath from './esv.tsv'
import na28Filepath from './na28.tsv'

import { ABBR, CHAPTER, ESV, PART, RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, NA28, REFERENCE, TEXT } from './Filters.js'

const Papa = require('papaparse');

class Data {
  static morphs = []
  static esv = {}
  static na28 = {}

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

  static getRecords(filters) {
    return Data.morphs
      .filter(row => Object.keys(filters)
          .filter(field => filters[field].length !== 0)
          .every(field => row[field] === '-' || filters[field].includes(row[field])))
      .filter(row => row[CHAPTER] !== '-')
      .map(row => {
        let references = row[REFERENCE].split(',')
        let reference = references[Math.floor((Math.random() * references.length))]
        return Object.assign(
            {}, 
            row, 
            { 
              [REFERENCE]: reference,
              [ESV]: Data.esv[reference],
              [NA28]: Data.na28[reference],
            })
      })
  }

  static getFlashcards(filters) {
    console.log(filters)
    return Object.values(
        Data.getRecords(filters)
          .map(row => {
            var fields;
            switch (row[PART]) {
              case "noun":
                fields = [ RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, ESV ]; break;
              case "verb":
                fields = [ RESULT, LEMMA, TENSE, VOICE, MOOD, PERSON, NUMBER, GLOSS, ESV ]; break;
              case "adjective":
                fields = [ RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, ESV ]; break;
              case "conjunction":
              case "preposition, adverb":
              case "preposition":
                fields = [ RESULT, LEMMA, GLOSS, ESV ]; break;
              case "pronoun":
              case "pronoun, adjective":
              case "adjective, pronoun":
                fields = [ RESULT, LEMMA, GENDER, CASE, PERSON, NUMBER, GLOSS, ESV ]; break;
              default:
                fields = [ RESULT ]; break;
            }
            return [row, fields]
          })
          .reduce((l, r) => {
            let groupby = r[1].filter(field => field !== ESV).map(field => r[0][field]).join()
            l[groupby] = (l[groupby] || r)
            return l
          }, {}))
          .map(arr => {
            let row = arr[0]
            let fields = arr[1]

            let front = row[RESULT]
            let back = fields
              .map(field => {
                if (field === GLOSS) {
                  return '"' + row[GLOSS] + '"'
                } else if (field === ESV) {
                  return "<> " + row[REFERENCE] + " " + row[ESV]
                } else {
                  return row[field]
                }
              })
              .join(" ")
            return [front, back]
          })
  }
}

export default Data;
