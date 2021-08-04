import React, { useReducer } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import '@fontsource/poppins/500.css';
import './App.css';
import { reducer, initialState } from './utils/view-reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="app">
      <Header dispatch={dispatch} state={state} />
      <Main state={state} />
    </div>
  );
}

export default App;
