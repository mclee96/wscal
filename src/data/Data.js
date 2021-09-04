import morphFilepath from './morphs.tsv'
import englishFilepath from './net.tsv'
import greekFilepath from './na28.tsv'
import vocabFilepath from './vocab.tsv'

import { ABBR, CHAPTER, ENGLISH, PART, RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, GREEK, REFERENCE, TEXT, PARTICIPLE } from '../backend/Filters.js'

const Papa = require('papaparse');

class Data {
  static vocab = []
  static morphs = []
  static english = {}
  static greek = {}

  // idempotent
  static loadData() {
    return new Promise((resolve, reject) => {
      // legacy reset
      if (Object.keys(localStorage).some(key => key.includes('esv_filepath') || key.includes('na28_filepath'))) {
        localStorage.clear()
      }

      if (Data.vocab.length === 0) {
        Data.loadFile('vocab', vocabFilepath, (contents) => {
          let rows = []
          Papa.parse(contents, { delimiter: '\t', header: true }).data
            .forEach(row => rows.push(row))
          Data.vocab = rows
          resolve(Data.vocab)
        })
      } else {
        resolve(Data.vocab)
      }

      if (Data.morphs.length === 0) {
        Data.loadFile('morphs', morphFilepath, (contents) => {
            let rows = []
            Papa.parse(contents, { delimiter: '\t', header: true }).data
              .forEach(row => rows.push(row))
            Data.morphs = rows
        })
      }

      if (Object.keys(Data.english).length === 0) {
        Data.loadFile('english', englishFilepath, (contents) => {
          Papa.parse(contents, { delimiter: '\t', header: true, quoteChar: '`' }).data
            .forEach(row => Data.english[row[ABBR]] = row[TEXT])
        })
      }

      if (Object.keys(Data.greek).length === 0) {
        Data.loadFile('greek', greekFilepath, (contents) => {
          Papa.parse(contents, { delimiter: '\t', header: true }).data
            .forEach(row => Data.greek[row[ABBR]] = row[TEXT])
        })
      }
    })
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
}

export default Data;
