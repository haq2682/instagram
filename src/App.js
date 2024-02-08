import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Settings from './pages/Settings';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
