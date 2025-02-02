import axios from 'axios';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import AppLogo from './app-logo.png';
import CGLogo from './chatGPT.png';

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  const [showGif, setShowGif] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    axios
      .post("http://localhost:8082/chat", { prompt })
      .then((res) => {
        const question = prompt;
        const answer = res.data;
        const answerLines = answer.split("\n");
  
        setLoading(false);
        setQuestions([...questions, { question, answer }]);
  
        if (answerLines.length <= 3) {
        } else {
          setShowGif(true);
          const remainingAnswer = answer.substring(answer.indexOf("\n") + 1);
          const remainingAnswerLines = remainingAnswer.split("\n");
          let i = 0;
          const intervalId = setInterval(() => {
            if (i < remainingAnswerLines.length) {
              i++;
            } else {
              setShowGif(false);
              clearInterval(intervalId);
            }
          }, 1000);
        }
  
        setPrompt("");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  
  

  const handleBack = () => {
    history.push('/dashboard');
  }

  return (
    <div className="wrapper">
      <div className="header">
        <i><h1>Chatbot</h1></i>
      </div>
      <div className="chat-area">
        {questions.map(({ question, answer }, index) => (
          <div key={index} className="chat-item">
            <div className="question">{question}</div>
            <div className="answer" style={{whiteSpace: "pre-wrap"}}>{answer}</div>
          </div>
        ))}
        {showGif && <img src={CGLogo} alt="" className="cg-logo" />}
        {!loading && response.length > 0 && (
          <div className="chat-item">
            <div className="question">{prompt}</div>
            <div className="answer" style={{whiteSpace: "pre-wrap"}}>{response}</div>
          </div>
        )}
      </div>
      <img src={AppLogo} alt="" className="app-logo" />  
      <form onSubmit={handleSubmit}>
        <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything... :)"
        />
        <button type="submit">Ask</button>
      </form>
      {loading && <p className="loading-message">Loading...</p>}
      <button onClick={handleBack} style={{ display: "block", margin: "0 auto" }}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Chatbot;
