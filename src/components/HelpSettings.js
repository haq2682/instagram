import {Input, Divider, Textarea, Button} from "@nextui-org/react";
import {useState} from "react";

export default function HelpSettings() {
    const [issueSubject, setIssueSubject] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [issueImages, setIssueImages] = useState([]);

    const handleSubject = (event) => {
        setIssueSubject(event.target.value);
    }

    const handleDescription = (event) => {
        setIssueDescription(event.target.value)
    }

    const handleImageUpload = (event) => {
        setIssueImages([...issueImages, event.target.files]);
        issueImages.map((img) => {
            console.log(img.File);
        })
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
                    <input onChange={handleImageUpload} type="file" multiple id="issueImage" name="issueImage" className="hidden" accept="image/gif, image/jpeg, image/png, image/heic, image/hevc, image/webp"/>
                    <Button className="mt-8 float-left shadow-md bg-blue-400 text-white font-bold text-lg">
                        <label htmlFor="issueImage" className="py-8 px-8 cursor-pointer w-full">
                            Add a photo of the issue
                        </label>
                    </Button>
                    <Button className="mt-8 float-right shadow-md bg-green-400 text-white font-bold text-lg">
                        Submit
                    </Button>
                </div>
            </form>
            <div className="mt-24 flex flex-wrap">
                <img src="https://cdn.pixabay.com/photo/2022/01/28/18/32/leaves-6975462_1280.png" alt="issue" className="h-32 w-32 object-cover"/>
            </div>
        </div>
    );
}