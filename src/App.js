import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Sidebar from './component/main/Sidebar'
import Main from './component/main/Main'
function App() {
  return(
    <div className="wrapper">
    <Router>
      <Sidebar />
      <Route path='/' component={Main} />
    </Router>
  </div>
  );
}

export default App;
