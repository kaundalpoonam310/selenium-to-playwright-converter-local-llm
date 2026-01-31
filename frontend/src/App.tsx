
import { useState } from 'react';
import './App.css';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!inputCode.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Conversion failed');
      }

      setOutputCode(data.code);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1>Selenium ➔ Playwright</h1>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Powered by Local LLM
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="status-indicator">
            <span style={{
              height: '8px',
              width: '8px',
              borderRadius: '50%',
              backgroundColor: '#00ff88',
              display: 'inline-block',
              marginRight: '8px'
            }}></span>
            System Ready
          </div>
        </div>
      </header>

      <div className="editor-grid">
        <div className="editor-column">
          <div className="column-header">
            <span>Input (Java)</span>
          </div>
          <div className="panel" style={{ flex: 1, padding: '0.5rem' }}>
            <textarea
              placeholder="// Paste your Selenium Java code here..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="editor-column">
          <div className="column-header">
            <span>Output (Playwright TS)</span>
            {outputCode && (
              <span style={{ color: 'var(--primary)', fontSize: '0.8rem', marginLeft: 'auto' }}>
                Saved to output/
              </span>
            )}
          </div>
          <div className="panel" style={{ flex: 1, padding: '0.5rem', position: 'relative' }}>
            {error && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#ff4d4d',
                textAlign: 'center',
                width: '80%'
              }}>
                <p>❌ {error}</p>
              </div>
            )}
            <textarea
              readOnly
              placeholder="// Converted code will appear here..."
              value={outputCode}
              style={{ color: error ? 'transparent' : 'var(--primary)' }}
            />
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button
          className="btn-primary"
          onClick={handleConvert}
          disabled={isLoading || !inputCode.trim()}
        >
          {isLoading ? (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className="loader"></span> Converting...
            </span>
          ) : (
            'ACCELERATE CONVERSION'
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
