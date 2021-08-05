// case
export const CASE = "Case" 
export const NOMINATIVE = "nominative"
export const GENITIVE = "genitive"
export const DATIVE = "dative"
export const ACCUSATIVE = "accusative"
export const VOCATIVE = "vocative"

// gender
export const GENDER = "Gender";
export const FEMININE = "feminine"
export const MASCULINE = "masculine"
export const NEUTER = "neuter"

// number
export const NUMBER = "Number"
export const SINGULAR = "singular"
export const PLURAL = "plural"

// mood
export const MOOD = "Mood"
export const INDICATIVE = "indicative"
export const IMPERATIVE = "imperative"
export const INFINITIVE = "infinitive"
export const SUBJUNCTIVE = "subjunctive"
export const PARTICIPLE = "participle"

// part of speech
export const PART = "Part"
export const ADJECTIVE = "adjective"
export const ADVERB = "adverb"
export const CONJUNCTION = "conjunction"
export const NOUN = "noun"
export const PREPOSITION = "preposition"
export const PRONOUN = "pronoun"
export const VERB = "verb"

// person
export const PERSON = "Person"
export const FIRST = "first person"
export const SECOND = "second person"
export const THIRD = "third person"

// tense
export const TENSE = "Tense"
export const AORIST = "aorist"
export const PERFECT = "perfect"
export const PRESENT = "present"
export const FUTURE = "future"
export const IMPERFECT = "imperfect"

// voice
export const VOICE = "Voice"
export const MIDDLE = "middle"
export const PASSIVE = "passive"
export const ACTIVE = "active"

// other headers
export const CHAPTER = "Chapter";
export const GLOSS = "Gloss";
export const LEMMA = "Lemma";
export const RESULT = "Result"
export const TEXT = "Text"
export const ADVERB_TYPE = "Adverb/particle Type"

// bibles
export const ESV = "Esv"
export const NA28 = "Na28"
export const ABBR = "Abbr"
export const REFERENCE = "Reference"

export const ALL = {
  [PART]: [ADJECTIVE, NOUN, VERB, PRONOUN],
  [GENDER]: [FEMININE, MASCULINE, NEUTER],
  [CASE]: [NOMINATIVE, GENITIVE, DATIVE, ACCUSATIVE, VOCATIVE],
  [TENSE]: [PRESENT, IMPERFECT, FUTURE, AORIST],
  [VOICE]: [ACTIVE, MIDDLE, PASSIVE],
  [NUMBER]: [SINGULAR, PLURAL],
  [MOOD]: [INDICATIVE, IMPERATIVE, INFINITIVE, SUBJUNCTIVE, PARTICIPLE]
}

export default ALL
