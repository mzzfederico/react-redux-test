import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages';

import { Provider } from 'react-redux';
import store from './Store/store';
import Toasts from './Components/Toasts';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Toasts />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/page/:page" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </Provider>
  );
}

export default App;
