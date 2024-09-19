import React , {useEffect, useState} from 'react';
import NavBar from './componet/Navigation';
import HomePage from './componet/Home';
import ProfilePage from './componet/Profile';
import ToDosList from './componet/To-Do';
import PostForm from './componet/UsersPost';
import Comments from './componet/Comments';
import './App.css';
import AlbumPage from './componet/Album';
import { Routes, Route } from 'react-router-dom';


function App() {

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ==='true'
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  useEffect (() => {
    document.body.className = darkMode ? 'Dark Mode' : 'Light Mode';
  }, [darkMode])

  const userId = "3";

  return (
    
    <div>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/post' element={<PostForm />} />
      <Route path='/post/:id' element={<Comments userId={'1'} />} />
      <Route path='/todos' element={<ToDosList todoId={'9'} />} />
      <Route path='album' element={<AlbumPage userId={'2'} />} />
    </Routes>
    
    </div>
  );
}

export default App;
