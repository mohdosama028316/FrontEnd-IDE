import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import { FiCopy, FiSun, FiMoon } from 'react-icons/fi';

const Editor = () => {
  const [code, setCode] = useState('');
  const { id } = useParams();
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code)
        .then(() => toast.success('Code copied to clipboard!'))
        .catch(() => toast.error('Unable to copy code.'));
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Code copied to clipboard!');
      } catch {
        toast.error('Unable to copy code.');
      }
      document.body.removeChild(textArea);
    }
  };

  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code);
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch(() => {
        toast.error('Failed to load project.');
      });
  }, [id]);

  const saveProject = () => {
    const trimmedCode = code?.toString().trim();
    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.success ? toast.success(data.msg) : toast.error(data.msg);
      })
      .catch(() => {
        toast.error('Failed to save the project.');
      });
  };

  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveProject();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code]);

  const runProject = () => {
    fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: data?.projLanguage,
        version: data?.version,
        files: [
          {
            filename: `${data?.name}${
              data?.projLanguage === 'python'
                ? '.py'
                : data?.projLanguage === 'java'
                ? '.java'
                : data?.projLanguage === 'javascript'
                ? '.js'
                : data?.projLanguage === 'c'
                ? '.c'
                : data?.projLanguage === 'cpp'
                ? '.cpp'
                : data?.projLanguage === 'bash'
                ? '.sh'
                : ''
            }`,
            content: code,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOutput(data.run.output);
        setError(data.run.code === 1);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        {/* Code Editor Panel */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Editor2
            onChange={(newCode) => setCode(newCode || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            height="100%"
            width="100%"
            language={data?.projLanguage || 'python'}
            value={code}
          />

          {/* Desktop Buttons (Top-right) */}
          <div className="hidden md:flex absolute top-2 right-2 z-10 gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded shadow-md transition-all duration-200 active:scale-95"
            >
              <FiCopy /> Copy
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-500 text-white px-3 py-1 rounded shadow-md transition-all duration-200 active:scale-95"
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Mobile Buttons (Below Editor) */}
        <div className="flex md:hidden justify-center gap-4 py-3 bg-[#1f1f1f]">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition-all duration-200 active:scale-95"
          >
            <FiCopy /> Copy
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded shadow-md transition-all duration-200 active:scale-95"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* Output Panel */}
        <div className={`w-full md:w-1/2 h-1/2 md:h-full p-4 overflow-auto transition-all duration-300 ${theme === 'dark' ? 'bg-[#27272a]' : 'bg-white'}`}>
          <div className="flex items-center justify-between border-b border-gray-700 pb-2 px-4">
            <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Output</p>
            <button
              className="btnNormal !w-fit !px-[20px] bg-green-500 hover:bg-green-700 text-white py-1 rounded"
              onClick={runProject}
            >
              Run
            </button>
          </div>
          <pre className={`w-full h-[75vh] overflow-auto transition-all duration-300 ${error ? 'text-red-500' : theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {output}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
