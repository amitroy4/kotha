import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import firebaseConfig from './firebaseConfig';
import Home from './pages/home/Home';
import Rootlayout from './components/rootlayout/Rootlayout';
import Chat from './pages/chat/Chat';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/kotha" element={<Rootlayout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="chat" element={<Chat />}></Route>
      </Route>
    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
