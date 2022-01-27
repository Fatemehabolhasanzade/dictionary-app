import './App.css';
import React, { useState, useEffect } from "react";
import Meaning from './Meaning';
import ErrorBaoundry from './ErrorBaoundry';

function App() {

  const [searchWord, setSearchWord] = useState("hello");
  const [data, setData] = useState({ "word": "hello", "phonetic": "həˈləʊ", "phonetics": [{ "text": "həˈləʊ", "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3" }, { "text": "hɛˈləʊ" }], "origin": "early 19th century: variant of earlier hollo ; related to holla.", "meanings": [{ "partOfSpeech": "exclamation", "definitions": [{ "definition": "used as a greeting or to begin a phone conversation.", "example": "hello there, Katie!", "synonyms": [], "antonyms": [] }] }, { "partOfSpeech": "noun", "definitions": [{ "definition": "an utterance of ‘hello’; a greeting.", "example": "she was getting polite nods and hellos from people", "synonyms": [], "antonyms": [] }] }, { "partOfSpeech": "verb", "definitions": [{ "definition": "say or shout ‘hello’.", "example": "I pressed the phone button and helloed", "synonyms": [], "antonyms": [] }] }] });
  const [loading, setLoading] = useState(false);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`

  useEffect(() => {
    getMeaning();
  }, [searchWord]);

  function getMeaning() {
    try {
      console.log("start loading");
      setLoading(true);
      const { error } = fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(`data recived fron api for the word "${searchWord}":`, data);
          setData(data[0]);

        })
        .then(() => {
          console.log("data saved in state 'data'", data)
          setLoading(false);
          console.log("end loading");
        })
      if (error) throw error

    } catch (error) {
      console.log(error.message);
    }
  }

  function playAudio() {
    // try {
    let sound = new Audio(data.phonetics[0].audio);
    console.log(sound);
    sound.play();
    //     if (error) {
    //       throw error
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  return (
    <div className="App ">
      <h1>Dictionary APP </h1>
      <div className="searchBox">
        {/* Taking user input */}
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getMeaning();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            width="16" height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
      {/* loading */}
      {loading && <div
        className="loading">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>
        <p>loading...</p>
      </div>}
      {/* result */}
      <ErrorBaoundry>
        {!loading && <div className="Result">

          <h2>{data.word}</h2>
          <span>/{data.phonetic}/  </span>

          <button
            onClick={() => {
              playAudio();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="16" height="10"
              fill="currentColor"
              className="bi bi-megaphone"
              viewBox="0 0 16 16">
              <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z" />
            </svg>
          </button>

          {data.meanings.map((item) => {
            return (
              <Meaning
                item={item}
                key={item.partOfSpeech}
              />
            )
          })
          }

        </div>
        }</ErrorBaoundry>

    </div>
  );
}

export default App;
