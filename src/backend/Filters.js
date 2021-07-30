// case
export const CASE = "Case" 
export const NOMINATIVE = "nom"
export const GENITIVE = "gen"
export const DATIVE = "dat"
export const ACCUSATIVE = "acc"
export const VOCATIVE = "voc"

// gender
export const GENDER = "Gender";
export const FEMININE = "fem"
export const MASCULINE = "mas"
export const NEUTER = "neu"

// number
export const NUMBER = "Number"
export const SINGULAR = "sg"
export const PLURAL = "pl"

// mood
export const MOOD = "Mood"

// part of speech
export const PART = "Part of Speech"
export const ADJECTIVE = "adjective"
export const NOUN = "noun"
export const VERB = "verb"

// person
export const PERSON = "Person"
export const FIRST = "1p"
export const SECOND = "2p"
export const THIRD = "3p"

// tense
export const TENSE = "Tense"
export const AORIST = "aor"
export const PRESENT = "pres"
export const FUTURE = "futr"
export const IMPERFECT = "impft"

// voice
export const VOICE = "Voice"
export const MIDDLE = "mid"
export const PASSIVE = "pass"
export const ACTIVE = "actv"

// other headers
export const CHAPTER = "Chapter";
export const GLOSS = "Gloss";
export const LEMMA = "Lemma";
export const REFERENCE = "Reference"
export const RESULT = "Result"
export const TEXT = "Text"
export const ESV = "Esv"
export const NA28 = "Na28"
export const ADVERB = "Adverb/particle Type"

export const ALL = {
  [GENDER]: [FEMININE, MASCULINE, NEUTER],
  [CASE]: [NOMINATIVE, GENITIVE, DATIVE, ACCUSATIVE, VOCATIVE],
  [PART]: [ADJECTIVE, NOUN, VERB],
  [TENSE]: [PRESENT, IMPERFECT, FUTURE, AORIST],
  [VOICE]: [ACTIVE, MIDDLE, PASSIVE],
  [NUMBER]: [SINGULAR, PLURAL],
}

export default ALL
