import logo from './logo.svg';
import './App.css';

const Papa = require('papaparse');

function App() {
  /*
  sessionStorage.clear();
  Papa.parse('./vocab.tsv', {
    complete: function(results) {
      sessionStorage.setItem('vocab', results.data);
    },
    download: true,
    header: true
  });

  Papa.parse(morphs, {
    complete: function(results) {
      let dict = new Map()
      results.data.forEach(
          result => {
            if (!dict.get(result['Lemma'])) {
              dict.set(result['Lemma'], [])
            }
            dict.get(result['Lemma']).push(result)
          }
      );
      dict.forEach(
        (v, k) => {
          sessionStorage.setItem(k, JSON.stringify(v))
        })
      console.log(JSON.parse(sessionStorage.getItem('ζάω')))
    },
    download: true,
    header: true
  });
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href="./vocab/vocab.tsv">vocab.tsv</a>
      </header>
    </div>
  );
}

export default App;
