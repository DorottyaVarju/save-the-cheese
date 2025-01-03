import './App.css';
import CategoryAndNumOfLettersToChoose from './components/CategoryAndNumOfLettersToChoose.js';
import WordToGuess from './components/WordToGuess.js';
import PageNotFound from './components/PageNotFound.js';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/game" element={<WordToGuess />} />
          <Route exact path="/" element={<CategoryAndNumOfLettersToChoose />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
