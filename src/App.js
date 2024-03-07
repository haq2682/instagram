import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import ExplorePosts from './pages/ExplorePosts';
import Search from './pages/Search';
import Message from './pages/Message';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import VerifiedEmail from './pages/VerifiedEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from "react";
import {authenticate} from './redux/authSlice';
import axios from "axios";
import WelcomeLoader from "./components/WelcomeLoader";

function App() {
    const [loader, setLoader] = useState(true);
    // const is_authenticated = useSelector(state => state.auth.is_authenticated);
    const is_authenticated = useState(true);
    const is_verified = useState(false);
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

    function getPage(page) {
        switch(page) {
            case "settings":
                if(is_authenticated === true && is_verified === true) return <Settings/>
                else if(is_authenticated === true && is_verified === false) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>
                break;

            case "explore":
                if(is_authenticated === true && is_verified === true) return <ExplorePosts/>
                else if(is_authenticated === true && is_verified === false) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "search":
                if(is_authenticated === true && is_verified === true) return <Search/>
                else if(is_authenticated === true && is_verified === false) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "messages":
                if(is_authenticated === true && is_verified === true) return <Message/>
                else if(is_authenticated === true && is_verified === false) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "saved":
                if(is_authenticated === true && is_verified === true) return <Saved/>
                else if(is_authenticated === true && is_verified === false) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "profile":
                if(is_authenticated === true && is_verified === true) return <Profile/>
                else if(is_authenticated === true && is_verified === false) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "verify":
                if(is_authenticated === true && is_verified === false) return <VerifyEmail/>
                else if(is_authenticated === true && is_verified === true) return <Navigate to={"/verified"}/>
                else return <Navigate to={"/"}/>

            case "verified":
                if(is_authenticated === true && is_verified === true) return <VerifiedEmail/>
                else if(is_authenticated === true && is_verified === false) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "forgotPassword":
                if(is_authenticated === false) return <ForgotPassword/>
                else return <Navigate to={"/"}/>

            case "resetPassword":
                if(is_authenticated === false) return <ResetPassword/>
                else return <Navigate to={"/"}/>
                break;

            default:
                break;
        }
    }
  return (
      <main>
          {loader ? <WelcomeLoader/> : null}
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="settings" element={getPage("settings")}/>
                  <Route path="explore" element={getPage("explore")}/>
                  <Route path="search" element={getPage("search")}/>
                  <Route path="messages" element={getPage("messages")}/>
                  <Route path="saved" element={getPage("saved")}/>
                  <Route path="profile" element={getPage("profile")}/>
                  <Route path="verify" element={getPage("verify")}/>
                  <Route path="verified" element={getPage("verified")}/>
                  <Route path="forgotPassword" element={getPage("forgotPassword")}/>
                  <Route path="resetPassword" element={getPage("resetPassword")}/>
              </Routes>
          </BrowserRouter>
      </main>
  );
}

export default App;
