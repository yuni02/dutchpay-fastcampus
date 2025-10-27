import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Test } from './components/Test';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
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
          </header>
        } />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
