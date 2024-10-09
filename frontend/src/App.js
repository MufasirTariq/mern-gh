import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Page/Home';
import Profile from "./Page/Profile";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
