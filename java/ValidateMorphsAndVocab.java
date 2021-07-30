import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;

import org.apache.commons.csv.*;

/*
    java -cp ~/Developer/commons-csv-1.8/commons-csv-1.8.jar ValidateMorphsAndVocab.java
*/
public class ValidateMorphsAndVocab {

  private static final String CHAPTER = "Chapter";
  private static final String GLOSS = "Gloss";
  private static final String LEMMA = "Lemma";
  private static final String LEMMA_GREEK = "Lemma (Greek)";
  private static final String PART = "Part";

  private static Map<String, CSVRecord> loadAllVocab(String path) throws Exception {
    return CSVFormat.DEFAULT
      .withFirstRecordAsHeader()
      .withDelimiter('\t')
      .parse(new FileReader(new File(path)))
      .getRecords()
      .stream()
      .collect(Collectors.toMap(record -> record.get(LEMMA), Function.identity()));
  }

  public static void main(String[] args) throws Exception {
    // validate vocab data is fine
    final Map<String, CSVRecord> allVocab = loadAllVocab("../vocab/vocab.tsv");
    for (Map.Entry<String, CSVRecord> vocab : allVocab.entrySet()) {
      try {
        if (vocab.getValue().get(LEMMA).isEmpty() ||
            vocab.getValue().get(GLOSS).isEmpty() ||
            vocab.getValue().get(PART).isEmpty() ||
            vocab.getValue().get(CHAPTER).isEmpty()) {
          System.out.println("Failed vocab validation for " + vocab.getKey());
        }
      } catch (Exception e) {
        System.out.println("Failed vocab validation for " + vocab.getKey());
      }
    }

    System.out.println();

    // validate vocabs have morph file
    final Set<String> vocabWithMorphFiles = 
      Arrays.stream(new File("../morph").listFiles())
          .filter(file -> file.getName().startsWith("Morph Search") && 
                          file.getName().endsWith(".csv"))
          .map(File::getName)
          .map(filename -> filename.replace("Morph Search for lemma:", "")
                                   .replace(".csv", "")
                                   .trim())
          .collect(Collectors.toSet());

    allVocab.keySet().stream()
      .filter(v -> !vocabWithMorphFiles.contains(v))
      .forEach(v -> System.out.println("No morph file for " + v));

    System.out.println();

    // validate morph file names match contents
    final List<File> morphFiles =
      Arrays.stream(new File("../morph").listFiles())
          .filter(file -> file.getName().startsWith("Morph Search") && 
                          file.getName().endsWith(".csv"))
          .collect(Collectors.toList());

    for (File morphFile : morphFiles) {
      String lemmaFromFilename = 
        morphFile.getName()
                 .replace("Morph Search for lemma:", "")
                 .replace(".csv", "")
                 .trim();
      String lemmaFromRecords =
        CSVFormat.DEFAULT.withFirstRecordAsHeader()
                 .parse(new FileReader(morphFile))
                 .getRecords()
                 .get(0)
                 .get(LEMMA_GREEK);
      if (!lemmaFromFilename.equals(lemmaFromRecords)) {
        System.out.println("File content does not match name for " + morphFile.getName());
      }
    }
  }
}
