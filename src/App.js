import logo from './logo.svg';
import './App.css';
import React from 'react'
import vocab from './vocab.tsv'
import morphs from './morphs.tsv'
import esv from './esv.tsv'
import na28 from './na28.tsv'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const Papa = require('papaparse');
    sessionStorage.clear();
    Papa.parse(vocab, {
      complete: function(results) {
        sessionStorage.setItem('vocab', JSON.stringify(results.data));
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
        //console.log(JSON.parse(sessionStorage.getItem('ζάω')))
      },
      download: true,
      header: true
    });

    Papa.parse(esv, {
      complete: function(results) {
        sessionStorage.setItem('esv', JSON.stringify(results.data));
      },
      download: true,
      header: true
    });

    Papa.parse(na28, {
      complete: function(results) {
        sessionStorage.setItem('na28', JSON.stringify(results.data));
      },
      download: true,
      header: true
    });
  }

  render() {
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
}

export default App;
