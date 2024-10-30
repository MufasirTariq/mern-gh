import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Page/Home';
import Profile from "./Page/Profile";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Navbar } from "./Components/Navbar";
import './Css/Navbar.css'
import { Feed } from "./Page/Feed";
import AddPost from "./Page/AddPost";
import EditProfile from "./Components/EditProfile";

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>} ></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/feed' element={<Feed/>}></Route>
        <Route path='/addpost' element={<AddPost/>}></Route>
        <Route path='/editprofile' element={<EditProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
