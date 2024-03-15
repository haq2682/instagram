import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";
import {PhotoLibrary} from "@styled-icons/material-sharp/PhotoLibrary";
import {Enter} from "@styled-icons/ionicons-solid/Enter";
import {useState} from "react";

export default function PostModal(props) {
    const [postFiles, setPostFiles] = useState([]);
    const handleUpload = (event) => {
        setPostFiles([...postFiles, ...event.target.files]);
    }
    return (
        <>
            <Modal size='4xl' isOpen={props.postModal} onOpenChange={()=>props.togglePostModal()} placement={'center'}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center text-3xl">Create Post</ModalHeader>
                            <ModalBody className="w-full">
                                <Textarea
                                    label="Caption"
                                    placeholder="Enter your caption here..."
                                    className="w-full"
                                />
                            </ModalBody>
                            <ModalFooter className="block">
                                <div>
                                    <div className="upload__image-wrapper">
                                        <div className="flex flex-wrap mb-6">
                                            {
                                                postFiles.map((file, index) => {
                                                    if(file.type.startsWith('image/')) {
                                                        return <img key={index}
                                                                    src={URL.createObjectURL(file)}
                                                                    alt="issue"
                                                                    className="w-32 h-32 object-cover mx-1.5 my-1"/>
                                                    }
                                                    else if(file.type.startsWith('video/')) {
                                                        return (
                                                            <video key={index} className="w-32 h-32 object-cover mx-1.5 my-1" autoPlay muted loop>
                                                                <source src={URL.createObjectURL(file)}
                                                                        type={file.type}/>
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        );
                                                    } else return null;
                                                })
                                            }

                                        </div>
                                        <input id="post-file-upload"
                                               name="post-file-upload" type="file"
                                               className="hidden" multiple onChange={handleUpload}/>
                                        <Button className="w-full mb-4">
                                            <label htmlFor="post-file-upload" className="h-full w-full pt-1">
                                                    Add Photos/Videos <PhotoLibrary size="33"/>
                                            </label>
                                        </Button>
                                    </div>
                                </div>
                                <Button onPress={onClose}
                                        className="w-full bg-black text-white dark:bg-white dark:text-black">
                                    Submit <Enter/>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}