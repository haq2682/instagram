import {Accordion, AccordionItem, Divider, Switch} from '@nextui-org/react';
import {useState} from 'react';

export default function NotificationSettings() {
    const [pushLike, setPushLike] = useState(false);
    const [pushComment, setPushComment] = useState(true);
    const [pushShare, setPushShare] = useState(true);
    const [pushMention, setPushMention] = useState(false);

    const [emailLike, setEmailLike] = useState(true);
    const [emailComment, setEmailComment] = useState(true);
    const [emailShare, setEmailShare] = useState(false);
    const [emailMention, setEmailMention] = useState(false);

    const handleChange = (type) => {
        switch(type) {
            case 'pushLike':
                setPushLike(!pushLike);
                break;
            case 'pushComment':
                setPushComment(!pushComment);
                break;
            case 'pushShare':
                setPushShare(!pushShare);
                break;
            case 'pushMention':
                setPushMention(!pushMention);
                break;
            case 'emailLike':
                setEmailLike(!emailLike);
                break;
            case 'emailComment':
                setEmailComment(!emailComment);
                break;
            case 'emailShare':
                setEmailShare(!emailShare);
                break;
            case 'emailMention':
                setEmailMention(!emailMention);
                break;
            default:
                break;
        }
    }
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
                                <Switch color="success" isSelected={pushLike} onChange={()=>handleChange('pushLike')}>
                                    {pushLike ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Comment</h1>
                                <Switch color="success" isSelected={pushComment} onChange={()=>handleChange('pushComment')}>
                                    {pushComment ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Share</h1>
                                <Switch color="success" isSelected={pushShare} onChange={()=>handleChange('pushShare')}>
                                    {pushShare ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Mention</h1>
                                <Switch color="success" isSelected={pushMention} onChange={()=>handleChange('pushMention')}>
                                    {pushMention ? 'On' : 'Off'}
                                </Switch>
                            </div>
                        </AccordionItem>
                        <AccordionItem key="2" title="Email Notifications Settings">
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Like</h1>
                                <Switch color="danger" isSelected={emailLike} onChange={()=>handleChange('emailLike')}>
                                    {emailLike ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Comment</h1>
                                <Switch color="danger" isSelected={emailComment} onChange={()=>handleChange('emailComment')}>
                                    {emailComment ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Share</h1>
                                <Switch color="danger" isSelected={emailShare} onChange={()=>handleChange('emailShare')}>
                                    {emailShare ? 'On' : 'Off'}
                                </Switch>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg sm:text-xl my-4">Mention</h1>
                                <Switch color="danger" isSelected={emailMention} onChange={()=>handleChange('emailMention')}>
                                    {emailMention ? 'On' : 'Off'}
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