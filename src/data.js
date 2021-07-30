//import vocab from './vocab.tsv'
//import morphs from './morphs.tsv'

const Papa = require('papaparse');
sessionStorage.clear();
Papa.parse('./vocab.tsv', {
  complete: function(results) {
    sessionStorage.setItem('vocab', results.data);
  },
  download: true,
  header: true
});
