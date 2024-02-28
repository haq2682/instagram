import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Settings from './pages/Settings';
import ExplorePosts from './pages/ExplorePosts';
import Search from './pages/Search';
import Message from './pages/Message';
import Saved from './pages/Saved';
import Profile from './pages/Profile';

function App() {
  return (
      <main>
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="welcome" element={<Welcome/>}/>
                  <Route path="settings" element={<Settings/>}/>
                  <Route path="explore" element={<ExplorePosts/>}/>
                  <Route path="search" element={<Search/>}/>
                  <Route path="messages" element={<Message/>}/>
                  <Route path="saved" element={<Saved/>}/>
                  <Route path="profile" element={<Profile/>}/>
              </Routes>
          </BrowserRouter>
      </main>
  );
}

export default App;
