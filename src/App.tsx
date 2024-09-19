import React , {useEffect, useState} from 'react';
import HomePage from './componet/Home';
import ProfilePage from './componet/Profile';
import ToDosList from './componet/To-Do';
import PostForm from './componet/UsersPost';
import './App.css';
import { Routes, Route } from 'react-router-dom';


function App() {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);



  return (
    <div>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/post' element={<PostForm />} />
      <Route path='/todos' element={<ToDosList todoId={'10'} />} />
    </Routes>
    <button className="mode-toggle" onClick={toggleDarkMode}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
    
    </div>
  );
}

export default App;
