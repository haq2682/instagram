import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import ExplorePosts from './pages/ExplorePosts';
import Search from './pages/Search';
import Message from './pages/Message';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from "react";
import {authenticate} from './redux/authSlice';
import axios from "axios";
import WelcomeLoader from "./components/WelcomeLoader";

function App() {
    const [loader, setLoader] = useState(true);
    const is_authenticated = useSelector(state => state.auth.is_authenticated);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoader(true);
        axios.get('/auth/user')
            .then((response) => {
                if(response.data) dispatch(authenticate(response));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=> {
                setTimeout(()=>setLoader(false), 1000);
            })
    }, []);
  return (
      <main>
          {loader ? <WelcomeLoader/> : null}
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="settings" element={is_authenticated ? <Settings/> : <Navigate to={"/"}/>}/>
                  <Route path="explore" element={is_authenticated ? <ExplorePosts/> : <Navigate to={"/"}/>}/>
                  <Route path="search" element={is_authenticated ? <Search/> : <Navigate to={"/"}/>}/>
                  <Route path="messages" element={is_authenticated ? <Message/> : <Navigate to={"/"}/>}/>
                  <Route path="saved" element={is_authenticated ? <Saved/> : <Navigate to={"/"}/>}/>
                  <Route path="profile" element={is_authenticated ? <Profile/> : <Navigate to={"/"}/>}/>
              </Routes>
          </BrowserRouter>
      </main>
  );
}

export default App;
