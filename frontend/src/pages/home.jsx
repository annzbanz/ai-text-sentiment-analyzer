import { useState, useRef } from "react";

import "../App.css";


function Home() {

  const [text, setText] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const recognitionRef = useRef(null);


  const startVoiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported in this browser."
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.start();

    recognitionRef.current = recognition;


    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setText(transcript);
    };


    recognition.onerror = (event) => {

      console.error(event.error);
    };
  };


  const analyzeSentiment = async () => {

    if (!text.trim()) {

      setError("Please enter some text.");

      return;
    }

    setError("");

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            text: text,
          }),
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (err) {

      setError("Server error. Please try again.");

    }

    setLoading(false);
  };


  return (

    <div className="container">

      <div className="card">

        <h1 className="main-title">
          TEXT SENTIMENT ANALYZER
        </h1>


        <p className="subtitle">
          Share your thoughts, feelings, or opinions and let AI
          understand the emotion behind your words.
        </p>


        <div className="textarea-wrapper">

          <textarea
            placeholder="Type something here..."

            value={text}

            onChange={(e) => setText(e.target.value)}

            rows="7"
          />


          <button
            className="mic-btn"
            onClick={startVoiceInput}
          >
            🎤
          </button>

        </div>


        <button onClick={analyzeSentiment}>
          Analyze Sentiment
        </button>


        {loading && (

          <p className="loading">
            Analyzing sentiment...
          </p>
        )}


        {error && (

          <p className="error">
            {error}
          </p>
        )}


        {result && (

          <div className="result">

            <h2>
              Analysis Result :
            </h2>


            <p className="sentiment-text">

              <strong>Sentiment:</strong>{" "}

              {result.sentiment}

            </p>


            <div className="confidence-container">

              <div className="confidence-circle">

                <svg width="140" height="140">

                  <circle
                    className="bg"
                    cx="70"
                    cy="70"
                    r="55"
                  />


                  <circle
                    className="progress"
                    cx="70"
                    cy="70"
                    r="55"
                    style={{
                      strokeDashoffset:
                        345 -
                        (345 * result.confidence) / 100,
                    }}
                  />

                </svg>


                <div className="confidence-text">

                  {result.confidence}%

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Home;