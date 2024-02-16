import {Input, Divider, Textarea, Button} from "@nextui-org/react";
import {useState} from "react";
import ImageUploading from 'react-images-uploading';

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

    const handleImageUpload = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setIssueImages(imageList);
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
                    <div className="float-left">
                        <ImageUploading
                            multiple
                            value={issueImages}
                            onChange={handleImageUpload}
                            maxNumber={3}
                            dataURLKey="data_url"
                            acceptType={["jpg", "png", "heic", "hevc", "gif", "webp"]}>
                            {({
                                  imageList,
                                  onImageUpload,
                              }) => (
                                <div className="upload__image-wrapper">
                                    <Button onClick={onImageUpload} className="mt-8 shadow-md bg-blue-400 text-white font-bold text-lg">
                                        Add photos of the issue
                                    </Button>
                                    <div className="flex flex-wrap mt-10">
                                        {imageList.map((image, index) => (
                                            <img key={index} src={image.data_url} alt="issue" className="w-32 h-32 object-cover mx-1.5"/>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                    <Button className="mt-8 float-right shadow-md bg-green-400 text-white font-bold text-lg">
                        Submit
                    </Button>
                </div>
            </form>
            <div className="mt-24 flex flex-wrap">

            </div>
        </div>
    );
}