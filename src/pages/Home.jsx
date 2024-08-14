import Feed from './Feed';
import Welcome from './Welcome';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function Home() {
    const is_authenticated = useSelector(state => state.auth.is_authenticated);
    const is_verified = useSelector(state => state.auth.is_verified);

    if(is_authenticated && is_verified) return <Feed/>;
    else if(is_authenticated && !is_verified) return <Navigate to={"/verify"}/>;
    else return <Welcome/>
}