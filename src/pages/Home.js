import Feed from './Feed';
import Welcome from './Welcome';
import {useSelector} from 'react-redux';

export default function Home() {
    const is_authenticated = useSelector(state => state.auth.is_authenticated);
    if(is_authenticated) return <Feed/>;
    else return <Welcome/>;
}