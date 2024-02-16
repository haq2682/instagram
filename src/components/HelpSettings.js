import {Input, Divider, Textarea, Button} from "@nextui-org/react";
import {useState} from "react";

export default function HelpSettings() {
    const [issueSubject, setIssueSubject] = useState('');
    const [issueDescription, setIssueDescription] = useState('');

    const handleSubject = (event) => {
        setIssueSubject(event.target.value);
    }

    const handleDescription = (event) => {
        setIssueDescription(event.target.value)
    }
    return (
        <div className="help">
            <h1 className="font-bold text-lg sm:text-2xl my-4">Help</h1>
            <Divider/>
            <form action="/settings" method="post">
                <div className="mt-8">
                    <Input onChange={handleSubject} variant="bordered" placeholder="Subject of the issue"
                           maxLength={100}
                           className="shadow-md rounded-xl" endContent={(<div className="text-gray-500">{issueSubject.length}/100</div>)}/>
                    <Textarea onChange={handleDescription} className="mt-4 shadow-md rounded-xl" variant="bordered" size="lg"
                              placeholder="Description of the issue"/>
                    <input type="file" id="issueImage" name="issueImage" className="hidden"/>
                    <Button for="issueImage" className="mt-8 float-left shadow-md bg-blue-400 text-white font-bold text-lg">
                        Add a photo of the issue
                    </Button>
                    <Button className="mt-8 float-right shadow-md bg-green-400 text-white font-bold text-lg">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}