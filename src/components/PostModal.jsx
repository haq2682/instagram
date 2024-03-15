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
import {useCallback, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {PeopleCommunityAdd} from "@styled-icons/fluentui-system-filled/PeopleCommunityAdd";

export default function PostModal(props) {
    const [caption, setCaption] = useState('');
    const [postFiles, setPostFiles] = useState([]);
    const handleUpload = (event) => {
        setPostFiles([...postFiles, ...event.target.files]);
    }

    const onDrop = useCallback(files => {
        setPostFiles(prev => [...prev, ...files]);
    }, []);

    const openChange = () => {
        props.togglePostModal();
        setPostFiles([]);
        setCaption('');
    }
    const {getRootProps, getInputProps} = useDropzone({onDrop});
    return (
        <>
            <Modal size='4xl' isOpen={props.postModal} onOpenChange={openChange} placement={'center'}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex justify-center text-3xl">Create Post</ModalHeader>
                            <ModalBody className="w-full">
                                <Textarea
                                    label="Caption"
                                    placeholder="Enter your caption here..."
                                    className="w-full"
                                    value={caption}
                                    onChange={(event) => setCaption(event.target.value)}
                                />
                                <div {...getRootProps({className: 'border border-neutral-300 dark:border-neutral-700 border-dashed hidden lg:block w-full h-[150px]'})}>
                                    <input {...getInputProps()} />
                                    <div className="h-full flex items-center justify-center">
                                        <p className="text-neutral-300 dark:text-neutral-700">Drop files here or click to select</p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="block">
                                <div>
                                    <div className="upload__image-wrapper">
                                        <div className="flex flex-wrap mb-3">
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
                                        <Button className="w-full mb-4 lg:hidden">
                                            <label htmlFor="post-file-upload" className="h-full w-full pt-1">
                                                    Add Photos/Videos <PhotoLibrary size="33"/>
                                            </label>
                                        </Button>
                                        <Button className="w-full mb-4">
                                            Tag People <PeopleCommunityAdd size="33"/>
                                        </Button>
                                    </div>
                                </div>
                                <Button className="w-full bg-black text-white dark:bg-white dark:text-black" isDisabled={postFiles.length === 0 && !caption}>
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