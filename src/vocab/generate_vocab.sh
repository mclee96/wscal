# split by word type
cat vocab.tsv | grep "Lemma\|pronoun" > pronouns.tsv
cat vocab.tsv | grep "Lemma\|noun" | grep -v "pronoun" | grep -v "verb" > nouns.tsv
cat vocab.tsv | grep "Lemma\|adverb" > adverbs.tsv
cat vocab.tsv | grep "Lemma\|verb" | grep -v "adverb" > verbs.tsv
cat vocab.tsv | grep "Lemma\|preposition" > prepositions.tsv
cat vocab.tsv | grep "Lemma\|conjunction" > conjunctions.tsv
cat vocab.tsv | grep "Lemma\|adjective" > adjectives.tsv

# split by chapter
cat vocab.tsv | grep "Lemma\|	2" | grep -v "20\|21\|22\|23\|24\|25\|26\|27\|28\|29" > ch02.tsv
cat vocab.tsv | grep "Lemma\|	3" | grep -v 30 > ch03.tsv
cat vocab.tsv | grep "Lemma\|	4" > ch04.tsv
cat vocab.tsv | grep "Lemma\|	5" > ch05.tsv
cat vocab.tsv | grep "Lemma\|	6" > ch06.tsv
cat vocab.tsv | grep "Lemma\|	7" > ch07.tsv
cat vocab.tsv | grep "Lemma\|	8" > ch08.tsv
cat vocab.tsv | grep "Lemma\|	9" > ch09.tsv
cat vocab.tsv | grep "Lemma\|	10" > ch10.tsv
cat vocab.tsv | grep "Lemma\|	11" > ch11.tsv
cat vocab.tsv | grep "Lemma\|	12" > ch12.tsv
cat vocab.tsv | grep "Lemma\|	13" > ch13.tsv
cat vocab.tsv | grep "Lemma\|	14" > ch14.tsv
cat vocab.tsv | grep "Lemma\|	15" > ch15.tsv
cat vocab.tsv | grep "Lemma\|	16" > ch16.tsv
cat vocab.tsv | grep "Lemma\|	17" > ch17.tsv
cat vocab.tsv | grep "Lemma\|	18" > ch18.tsv
cat vocab.tsv | grep "Lemma\|	19" > ch19.tsv
cat vocab.tsv | grep "Lemma\|	20" > ch20.tsv
cat vocab.tsv | grep "Lemma\|	21" > ch21.tsv
cat vocab.tsv | grep "Lemma\|	22" > ch22.tsv
cat vocab.tsv | grep "Lemma\|	23" > ch23.tsv
cat vocab.tsv | grep "Lemma\|	24" > ch24.tsv
cat vocab.tsv | grep "Lemma\|	25" > ch25.tsv
cat vocab.tsv | grep "Lemma\|	26" > ch26.tsv
cat vocab.tsv | grep "Lemma\|	27" > ch27.tsv
cat vocab.tsv | grep "Lemma\|	28" > ch28.tsv
cat vocab.tsv | grep "Lemma\|	29" > ch29.tsv
cat vocab.tsv | grep "Lemma\|	30" > ch30.tsv

# extra mi/non_mi verbs
