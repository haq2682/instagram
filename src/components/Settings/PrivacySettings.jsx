import {Divider, Switch} from "@nextui-org/react";
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function PrivacySettings() {
    const [privateAccount, setPrivateAccount] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleChange = () => {
        setIsDisabled(true);
        axios.put('/settings/toggle_privacy', {privacy: !privateAccount}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        setPrivateAccount(!privateAccount);
        setIsDisabled(false);
    }

    useEffect(() => {
        setIsDisabled(true);
        axios.get('/auth/user')
            .then((response) => {
                setPrivateAccount(response.data.private);
            })
            .catch((error) => console.log(error))
            .finally(()=> {
                setIsDisabled(false);
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <div className="flex justify-center items-center h-full"><div className="loader"></div></div>;
    }

    return (
        <div className="privacy-settings">
            <h1 className="font-black text-lg sm:text-2xl my-4">Privacy Settings</h1>
            <Divider/>
            <Switch isSelected={privateAccount} color="warning" onClick={handleChange} className="mt-8" isDisabled={isDisabled}>
                Account is {privateAccount ? 'Private' : 'Public'}
            </Switch>
        </div>
    );
}