import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home"
import CreateInterview from "./components/Form/CreateInterview";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/createInterview' element={<CreateInterview/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;