
import './App.css';
import React from "react";
import {Route,Routes} from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from './routes/ProtectedRoute';
import Registration from './pages/Registration';
import SinglePost from './pages/SinglePost';
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/post/:postId" element ={<ProtectedRoute> <SinglePost /> </ProtectedRoute>} />
        <Route path = "/login/" element = {<Login />} />
        <Route path = "/register/" element = {<Registration />} />
        <Route path="/profile/:profileId/edit/" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path = "/profile/:profileId/" element = {<ProtectedRoute> <Profile /> </ProtectedRoute>} />
       
      </Routes>
      </BrowserRouter>

  );
}

export default App;
