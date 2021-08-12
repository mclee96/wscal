import morphFilepath from './morphs.tsv'
import esvFilepath from './esv.tsv'
import na28Filepath from './na28.tsv'
import vocabFilepath from './vocab.tsv'

import { ABBR, CHAPTER, ESV, PART, RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, NA28, REFERENCE, TEXT, PARTICIPLE } from './Filters.js'

const Papa = require('papaparse');

class Data {
  static vocab = []
  static morphs = []
  static esv = {}
  static na28 = {}

  // idempotent
  static loadData(callback) {
    // legacy reset
    if (Object.keys(localStorage).some(key => key.includes('/wscal/static/media'))) {
      localStorage.clear()
    }

    if (Data.vocab.length === 0) {
      Data.loadFile('vocab', vocabFilepath, (contents) => {
        let rows = []
        Papa.parse(contents, { delimiter: '\t', header: true }).data
          .forEach(row => rows.push(row))
        Data.vocab = rows
      })
    }

    if (Data.morphs.length === 0) {
      Data.loadFile('morphs', morphFilepath, (contents) => {
          let rows = []
          Papa.parse(contents, { delimiter: '\t', header: true }).data
            .forEach(row => rows.push(row))
          Data.morphs = rows
      })
    }

    if (Object.keys(Data.esv).length === 0) {
      Data.loadFile('esv', esvFilepath, (contents) => {
        Papa.parse(contents, { delimiter: '\t', header: true }).data
          .forEach(row => Data.esv[row[ABBR]] = row[TEXT])
      })
    }

    if (Object.keys(Data.na28).length === 0) {
      Data.loadFile('na28', na28Filepath, (contents) => {
        Papa.parse(contents, { delimiter: '\t', header: true }).data
          .forEach(row => Data.na28[row[ABBR]] = row[TEXT])
      })
    }
  }

  static loadFile(id, filepath, callback) {
    if (localStorage.getItem(id) != null && localStorage.getItem(id + '_filepath') === filepath) {
      // cached result
      if (callback) {
        callback(localStorage.getItem(id))
      }
    } else {
      localStorage.setItem(id + '_filepath', filepath)
      let req = new XMLHttpRequest();
      req.addEventListener("load", (e) => {
        localStorage.setItem(id, req.responseText.trim())
        if (callback) {
          callback(req.responseText.trim())
        }
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

  static getFlashcards(filters, validFields) {
    return Object.values(
        Data.getRecords(filters)
          .map(row => {
            var fields;
            switch (row[PART]) {
              case "noun":
                fields = [ RESULT, LEMMA, GLOSS, GENDER, CASE, NUMBER, ESV ]; break;
              case "verb":
                fields = (row[MOOD] === PARTICIPLE)
                  ? [ RESULT, LEMMA, GLOSS, TENSE, VOICE, MOOD, GENDER, CASE, NUMBER, ESV ]
                  : [ RESULT, LEMMA, GLOSS, TENSE, VOICE, MOOD, PERSON, NUMBER, ESV ]; 
                break;
              case "adjective":
                fields = [ RESULT, LEMMA, GLOSS, GENDER, CASE, NUMBER, ESV ]; break;
              case "conjunction":
              case "preposition, adverb":
              case "preposition":
                fields = [ RESULT, LEMMA, GLOSS, ESV ]; break;
              case "pronoun":
              case "pronoun, adjective":
              case "adjective, pronoun":
                fields = [ RESULT, LEMMA, GLOSS, PERSON, GENDER, CASE, NUMBER, ESV ]; break;
              default:
                fields = [ RESULT ]; break;
            }
            return [row, fields.filter(field => validFields.includes(field))]
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
                  return '("' + row[GLOSS]+ '")';
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

  static getVocab(chapters) {
    if (chapters) {
      return Data.vocab
        .filter(row => chapters.includes(row[CHAPTER]))
    } else {
      return Data.vocab
    }
  }
}

export default Data;
