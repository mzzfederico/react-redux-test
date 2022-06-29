import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import Home from './pages';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </Provider>
  );
}

export default App;
