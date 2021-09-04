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
        Engine.getRecords(filters)
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
    let punctuation = /[·,\.;\[\]⟧—]/g
    let ignore = [
      // articles
      "ὁ",
      // people
      "Παῦλος", "Τιμόθεος", "Ἰσαάκ", "Σωσθένης", "Δαυίδ", "Σάρρα", "Ἅννα",
      "Καϊάφας", "Ζαχαρίας", "Τίτος", "Σιλουανός", "Ἀβραάμ", "Ἰωάννης",
      "Σαούλ", "Ἠλίας", "Ἁνανίας", "Ἀντιπᾶς", "Ἰησοῦς", "Μωϋσῆς", "Σίμων",
      "Πιλᾶτος", "Μαρία", "Ἰακώβ", "Ἰούδας", "Πέτρος", "Ἰωσήφ", "Μαριάμ",
      "Μελχισέδεκ", "Φίλιππος", "Μαγδαληνή", "Ἡρῴδης", "Κλήμης", "Ἰάκωβος",
      "Βαρναβᾶς", "Ζεβεδαῖος", "Ἠσαΐας", "Βαραββᾶς", "Μάρθα", "Ἐλισάβετ",
      "Στέφανος", "Ἀδάμ", "Λάζαρος", "Σαῦλος", "Θωμᾶς", "Νῶε",
      "Φῆστος", "Ἰωνᾶς", "Συμεών", "Ἀνδρέας", "Σίλας",
      "Ἀγρίππα", "Φῆλιξ", "Λευί", "Κιλικία",
      // places
      "Ἰουδαῖος", "Ἔφεσος", "Ἰερουσαλήμ", "Ἰσραήλ", "Ἰορδάνης", "Ἰουδαία",
      "Σάρδεις", "Γαλιλαία", "Ναζαρέθ", "Βαβυλών", "Ἱεροσόλυμα",
      "Αἴγυπτος", "Μακεδονία", "Σαμάρεια", "Καφαρναούμ", 
      "Ἀντιόχεια", "Καισάρεια", "Βηθλέεμ", "Δαμασκός", "Ἀσία",
      "Βηθανία", "Συρία",
      // other
      "Βεελζεβούλ", "Χριστός", "Σαδδουκαῖος", "Ἰσραηλίτης", "Σιών",
      // familiar conjunctions
      "καί", "γάρ", "ὅτι", "δέ"
      ]

    let verseRecords = {}
    Data.morphs
      .flatMap(row => row[REFERENCE].split(",")
        .map(ref => Object.assign({}, row, { [REFERENCE]: ref })))
      .forEach(row => {
        if (!verseRecords[row[REFERENCE]]) {
          verseRecords[row[REFERENCE]] = []
        }
        verseRecords[row[REFERENCE]].push(row)
      })

    let verseWords = {}
    Object.keys(verseRecords)
      .map(ref => 
        verseWords[ref] = Data.greek[ref].replaceAll(punctuation, "").split(" ").filter(word => word))

    let testableVerses = []
    Object.values(verseRecords)
      .filter(rows => {
        let words = rows.map(row => row[RESULT])
        return verseWords[rows[0][REFERENCE]].every(word => words.includes(word))
      })
      .filter(rows => {
        return rows
          .filter(row => !ignore.includes(row[LEMMA]))
          .filter(row => row[CHAPTER] !== '-')
          .filter(row => Object.keys(filters)
              .filter(field => filters[field].length !== 0)
              .every(field => row[field] === '-' || filters[field].includes(row[field])))
          .length >= 3
      })
      .filter(rows => {
        let nontestableWords = rows
          .filter(row => !ignore.includes(row[LEMMA]))
          .filter(row => {
            return row[CHAPTER] === '-' ||
            !Object.keys(filters)
                .filter(field => filters[field].length !== 0)
                .every(field => row[field] === '-' || filters[field].includes(row[field]))
          })

        return nontestableWords.length <= 1 &&
          nontestableWords
            .every(row => !row['Sense'] === '-' || !row[GLOSS] === '-')
      })
      .map(rows => testableVerses.push(rows[0][REFERENCE]))

    let translations = []
    testableVerses
      .map(ref => {
        let definitions = verseRecords[ref]
          .filter(row => !ignore.includes(row[LEMMA]))
          .filter(row => {
            return row[CHAPTER] === '-' ||
            !Object.keys(filters)
                .filter(field => filters[field].length !== 0)
                .every(field => row[field] === '-' || filters[field].includes(row[field]))
          })
          .map(row => "<" + row[LEMMA] + ", " + Engine.abbrvPOS(row[PART]) + ": " + 
              row[row['Sense'].includes("-") ? GLOSS : 'Sense'] + ">")
          .join(" ")

        let parsing = verseWords[ref]
          .map(word => verseRecords[ref]
              .filter(row => word === row[RESULT])[0])
          .filter(row => !ignore.includes(row[LEMMA]))
          .map(row => {
            let fields = []
            switch (row[PART]) {
                case "noun":
                  fields = [ LEMMA, GENDER, CASE, NUMBER ]; break;
                case "verb":
                /* TODO: fix this
                  switch (row.get(MOOD)) {
                    case "participle":
                      fields = new String[] { LEMMA, TENSE, VOICE, MOOD, GENDER, CASE }; break;
                    case "infinitive":
                      fields = new String[] { LEMMA, TENSE, VOICE, MOOD }; break;
                    default:
                      fields = new String[] { LEMMA, TENSE, VOICE, MOOD, PERSON, NUMBER }; break;
                  }
                  */
                  fields = [ LEMMA, TENSE, VOICE, MOOD, PERSON, NUMBER ]; break;
                case "adjective":
                  fields = [ LEMMA, GENDER, CASE, NUMBER ]; break;
                case "conjunction":
                case "preposition, adverb":
                case "preposition":
                  fields = [ LEMMA ]; break;
                case "pronoun":
                case "pronoun, adjective":
                case "adjective, pronoun":
                  fields = [ LEMMA, PERSON, GENDER, CASE, NUMBER ]; break;
                default:
                  // System.out.println("unhandled word type " + row.get(PART) + " for " + row.get(RESULT));
                  fields = [ LEMMA ]; break;
            }
            return "<" + row[RESULT] + ": " + fields
                .map(field => Engine.abbrv(row[field]))
                .join(" ") + ">";
          })
          .join(" ")

        let front = Data.greek[ref] + " " + definitions;
        let back = ref + " " + Data.english[ref] + " " + parsing;

        return front + "\t" + back;
      })
      .forEach(trans => translations.push(trans))

    translations.slice(5)
    .forEach(trans => console.log(trans))

    
  }

  static abbrv(str) {
    switch (str) {
      // gender
      case "masculine": return "m";
      case "feminine": return "f";
      case "neuter": return "n";

      // person
      case "first person": return "1p";
      case "second person": return "2p";
      case "third person": return "3p";

      // number
      case "singular": return "sg";
      case "plural": return "pl";

      // case
      case "nominative": return "n";
      case "genitive": return "g";
      case "dative": return "d";
      case "accusative": return "a";
      case "vocative": return "v";

      // tense
      case "present": return "P";
      case "imperfect": return "I";
      case "future": return "F";
      case "aorist": return "A";
      case "perfect": return "Pf";

      // voice
      case "active": return "A";
      case "passive": return "P";
      case "middle": return "M";
      case "middle or passive":
      case "either middle or passive":
      case "passive, middle": return "M/P";

      // mood
      case "indicative": return "I";
      case "participle": return "Ptc";
      case "subjunctive": return "S";
      case "imperative": return "Imp";
      case "infinitive": return "Inf";

      default: return str;
    }
  }

  static abbrvPOS(pos) {
    switch (pos) {
      case "noun": 
        return "noun";
      case "indeclinable, adjective":
      case "adjective": 
        return "adj";
      case "adverb, particle": 
      case "adverb": 
        return "adv";
      case "preposition": 
        return "prep";
      case "conjunction": 
        return "conj";
      case "verb": 
        return "verb";
      case "pronoun":
        return "pron";
      default: 
        return pos;
    }
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
