import { useState } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';
import { gemini_url } from '../helper';
import { ClipLoader } from 'react-spinners'; // Import the spinner

function App() {
  const [code, setCode] = useState(` function sum() {
    return 1 + 1
  }`);

  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

  async function reviewCode(code) {
    setLoading(true); // Set loading to true before API call
    try {
      const response = await axios.post(`${gemini_url}/ai/get-review`, { code });
      setReview(response.data);
      setLoading(false); // Set loading to false after receiving response
    } catch (error) {
      console.error("Error reviewing code:", error);
      setLoading(false); // Stop loading in case of error
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div onClick={() => reviewCode(code)} className="review">
            Review
          </div>
        </div>
        <div className="right">
          {loading ? (
            <div className="loading">
              <ClipLoader color="#ffffff" loading={loading} size={50} />
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
