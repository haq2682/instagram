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
import {authenticate, verifyEmail} from './redux/authSlice';
import axios from "axios";
import WelcomeLoader from "./components/WelcomeLoader";

function App() {
    const [loader, setLoader] = useState(true);
    const is_authenticated = useSelector(state => state.auth.is_authenticated);
    const is_verified = useSelector(state => state.auth.is_verified);
    const is_password_reset = useSelector(state => state.auth.is_password_reset);
    const verify_token = useSelector(state => state.auth.verify_token);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoader(true);
        axios.get('/auth/user')
            .then((response) => {
                if(response.data) {
                    if(response.data.email_verified) dispatch(verifyEmail());
                    dispatch(authenticate(response));
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=> {
                setTimeout(()=>setLoader(false), 1000);
            })
    }, [dispatch]);

    function getPage(page) {
        switch(page) {
            case "settings":
                if(is_authenticated && is_verified) return <Settings/>
                else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "explore":
                if(is_authenticated && is_verified) return <ExplorePosts/>
                else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "search":
                if(is_authenticated && is_verified) return <Search/>
                else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "messages":
                if(is_authenticated && is_verified) return <Message/>
                else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "saved":
                if(is_authenticated && is_verified) return <Saved/>
                else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>
                else return <Navigate to={"/"}/>

            case "profile":
                if(is_authenticated && is_verified) return <Profile/>
                else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>
                else if(!is_authenticated) return <Navigate to={"/"}/>
                else return <Navigate to={"/profile"}/>

            case "verify":
                if(is_authenticated && !is_verified) return <VerifyEmail/>
                else if(is_authenticated && is_verified) return <Navigate to={"/verified" + verify_token}/>
                else return <Navigate to={"/"}/>

            case "verified":
                return <VerifiedEmail/>

            case "forgotPassword":
                if(!is_authenticated) return <ForgotPassword/>
                else return <Navigate to={"/"}/>

            case "resetPassword":
                if(!is_authenticated && is_password_reset) return <ResetPassword/>
                else return <Navigate to={"/"}/>

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
                  <Route path="verified/:verify_token" element={getPage("verified")}/>
                  <Route path="forgotpassword" element={getPage("forgotPassword")}/>
                  <Route path="resetpassword" element={getPage("resetPassword")}/>
              </Routes>
          </BrowserRouter>
      </main>
  );
}

export default App;
