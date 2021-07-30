import logo from './logo.svg';
import './App.css';
import vocab from './vocab.tsv'

const Papa = require('papaparse');

function App() {
  Papa.parse(vocab, {
    complete: function(results) {
      console.log(results);
    },
    download: true,
    header: true
  });
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
