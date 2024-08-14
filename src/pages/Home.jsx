import Feed from './Feed';
import Welcome from './Welcome';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {io} from "socket.io-client";
import {useEffect} from "react";

const socket = io(process.env.REACT_APP_SOCKET_CLIENT_URL);

export default function Home() {
    const is_authenticated = useSelector(state => state.auth.is_authenticated);
    const is_verified = useSelector(state => state.auth.is_verified);
    const loggedInUser = useSelector(state => state.auth);

    useEffect(() => {
        if(is_authenticated && is_verified) {
            socket.emit('init connection', loggedInUser);
        }
    }, [loggedInUser, is_authenticated, is_verified])

    if(is_authenticated && is_verified) return <Feed/>;
    else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>;
    else return <Welcome/>
}