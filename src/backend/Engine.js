import Data from './Data.js'

import { ABBR, CHAPTER, ENGLISH, PART, RESULT, LEMMA, GENDER, CASE, NUMBER, GLOSS, TENSE, VOICE, MOOD, PERSON, GREEK, REFERENCE, TEXT, PARTICIPLE } from './Filters.js'

class Engine {
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
              [ENGLISH]: Data.english[reference],
              [GREEK]: Data.greek[reference],
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
                fields = [ RESULT, LEMMA, GLOSS, GENDER, CASE, NUMBER, ENGLISH ]; break;
              case "verb":
                fields = (row[MOOD] === PARTICIPLE)
                  ? [ RESULT, LEMMA, GLOSS, TENSE, VOICE, MOOD, GENDER, CASE, NUMBER, ENGLISH ]
                  : [ RESULT, LEMMA, GLOSS, TENSE, VOICE, MOOD, PERSON, NUMBER, ENGLISH ]; 
                break;
              case "adjective":
                fields = [ RESULT, LEMMA, GLOSS, GENDER, CASE, NUMBER, ENGLISH ]; break;
              case "conjunction":
              case "preposition, adverb":
              case "preposition":
                fields = [ RESULT, LEMMA, GLOSS, ENGLISH ]; break;
              case "pronoun":
              case "pronoun, adjective":
              case "adjective, pronoun":
                fields = [ RESULT, LEMMA, GLOSS, PERSON, GENDER, CASE, NUMBER, ENGLISH ]; break;
              default:
                fields = [ RESULT ]; break;
            }
            return [row, fields.filter(field => validFields.includes(field))]
          })
          .reduce((l, r) => {
            let groupby = r[1].filter(field => field !== ENGLISH).map(field => r[0][field]).join()
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
                } else if (field === ENGLISH) {
                  return "<> " + row[REFERENCE] + " " + row[ENGLISH]
                } else {
                  return row[field]
                }
              })
              .join(" ")
            return [front, back]
          })
  }

  static getTranslations(filters) {
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

export default Engine;
