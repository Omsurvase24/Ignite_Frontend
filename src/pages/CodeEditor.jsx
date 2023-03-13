import React, { useState } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import styles from '../styles/pages/Editor.module.css';
import Question from '../components/editor/Question';
import Submissions from '../components/editor/Submissions';
import Output from '../components/editor/Output';

const langs = ['cpp', 'c', 'java', 'python'];

const CodeEditor = () => {
  const [code, setCode] = useState(`// Write your code here`);

  const [language, setLanguage] = useState('cpp');

  const [tab, setTab] = useState('description');

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRun = async () => {};

  const handleSubmit = async () => {};

  const handleSync = async () => {};

  return (
    <div className={styles.editorPage}>
      <div className={styles.header}>
        <img
          src="/ignite-logo.png"
          alt="ignite-logo"
          style={{ width: '55px' }}
        />
      </div>
      <div className={styles.container}>
        <div className={`${styles.left} ${styles.leftHeader}`}>
          <button
            className={tab === 'description' && styles.active}
            onClick={() => setTab('description')}
          >
            Description
          </button>
          <button
            className={tab === 'submissions' && styles.active}
            onClick={() => setTab('submissions')}
          >
            Submission
          </button>
          <button
            className={tab === 'output' && styles.active}
            onClick={() => setTab('output')}
          >
            Output
          </button>
        </div>
        <div className={styles.right}>
          <div className={styles.options}>
            <select onChange={onLanguageChange}>
              {langs.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <button>Sync</button>

          <div className={styles.run}>
            <button>Run</button>
            <button className={styles.submit}>Submit</button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {tab === 'description' ? (
          <Question />
        ) : tab === 'submissions' ? (
          <Submissions />
        ) : (
          <Output />
        )}

        <div className={styles.right}>
          <MonacoEditor
            language={language}
            height="80vh"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            options={{
              theme: 'vs-dark',
              fontSize: 16,
              fontWeight: 500,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
