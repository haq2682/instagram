import {Divider, Switch} from "@nextui-org/react";
import {useState} from 'react';

export default function PrivacySettings() {
    const [privateAccount, setPrivateAccount] = useState(false);
    const handleChange = () => {
        setPrivateAccount(!privateAccount);
    }
    return (
        <div className="privacy-settings">
            <h1 className="font-bold text-lg sm:text-2xl my-4">Privacy Settings</h1>
            <Divider/>
            <Switch isSelected={privateAccount} color="warning" onClick={handleChange} className="mt-8">
                Account is {privateAccount ? 'Private' : 'Public'}
            </Switch>
        </div>
    );
}