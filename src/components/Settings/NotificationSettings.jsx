import {Accordion, AccordionItem, Divider, Switch} from '@nextui-org/react';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function NotificationSettings() {
    useEffect(() => {
        axios.get('/auth/user')
            .then((response) => {
                setUserId(response.data._id);
                let data = response.data.settings;
                setSettings(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const [userId, setUserId] = useState(null);

    const [settings, setSettings] = useState({
        push_like: false,
        push_comment: false,
        push_share: false,
        push_mention: false,
        email_like: false,
        email_comment: false,
        email_share: false,
        email_mention: false
    });

    const [isDisabled, setIsDisabled] = useState(false);

    const handleChange = async (type) => {
        setIsDisabled(true);
        let newSettings = { ...settings };
        newSettings[type] = !newSettings[type];
        setSettings(newSettings);
        try {
            const response = await axios.post('/settings/edit_notifications', { id: userId, [type]: newSettings[type], type: type });
            console.log(response);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setIsDisabled(false);
        }
    };
    return (
        <div className="notifications-settings">
            <form action="/src/pages/Settings" method="post">
                <h1 className="font-black text-lg sm:text-2xl my-4">Notification Settings</h1>
                <Divider/>
                <div className="my-8">
                    <Accordion variant="shadow">
                        <AccordionItem key="1" title="Push Notifications Settings">
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Like</h1>
                                <Switch color="success" isSelected={settings.push_like} onChange={()=>handleChange('push_like')} isDisabled={isDisabled}>
                                    {settings.push_like ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Comment</h1>
                                <Switch color="success" isSelected={settings.push_comment} onChange={()=>handleChange('push_comment')} isDisabled={isDisabled}>
                                    {settings.push_comment ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Share</h1>
                                <Switch color="success" isSelected={settings.push_share} onChange={()=>handleChange('push_share')} isDisabled={isDisabled}>
                                    {settings.push_share ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Mention</h1>
                                <Switch color="success" isSelected={settings.push_mention} onChange={()=>handleChange('push_mention')} isDisabled={isDisabled}>
                                    {settings.push_mention ? 'On' : 'Off'}
                                </Switch>
                            </div>
                        </AccordionItem>
                        <AccordionItem key="2" title="Email Notifications Settings">
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Like</h1>
                                <Switch color="danger" isSelected={settings.email_like} onChange={()=>handleChange('email_like')} isDisabled={isDisabled}>
                                    {settings.email_like ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Comment</h1>
                                <Switch color="danger" isSelected={settings.email_comment} onChange={()=>handleChange('email_comment')} isDisabled={isDisabled}>
                                    {settings.email_comment ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Share</h1>
                                <Switch color="danger" isSelected={settings.email_share} onChange={()=>handleChange('email_share')} isDisabled={isDisabled}>
                                    {settings.email_share ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Mention</h1>
                                <Switch color="danger" isSelected={settings.email_mention} onChange={()=>handleChange('email_mention')} isDisabled={isDisabled}>
                                    {settings.email_mention ? 'On' : 'Off'}
                                </Switch>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
                <Divider/>
            </form>
        </div>
    )
}