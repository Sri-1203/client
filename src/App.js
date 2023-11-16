import React from 'react';

import Chat from "./components/Chat.js"
import Join from './components/Join.js';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
