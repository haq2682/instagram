import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    Tooltip,
} from "@nextui-org/react";
import {PhotoLibrary} from "@styled-icons/material-sharp/PhotoLibrary";
import {Enter} from "@styled-icons/ionicons-solid/Enter";
import {useCallback, useMemo, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {PeopleCommunityAdd} from "@styled-icons/fluentui-system-filled/PeopleCommunityAdd";
import axios from 'axios';
import EmojiPicker from "emoji-picker-react";
import { Emoji } from "styled-icons/fluentui-system-filled";

export default function PostModal(props) {
    const [caption, setCaption] = useState('');
    const [postFiles, setPostFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const toggleEmojiPicker = useCallback(() => {
        setEmojiPickerOpen(!emojiPickerOpen);
    }, [emojiPickerOpen]);

    const handleEmojiClick = (emoji) => {
        setCaption(prev => prev + emoji.emoji);
    }

    const handleUpload = (event) => {
        event.target.files.forEach((file) => {
            if(file.type.startsWith('image/') || file.type.startsWith('video/')) setPostFiles(prev => [...prev, file]);
        })
    }

    const onDrop = useCallback(files => {
        files.forEach((file) => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) setPostFiles(prev => [...prev, file]);
        })
    }, []);

    const openChange = () => {
        props.togglePostModal();
        setPostFiles([]);
        setEmojiPickerOpen(false);
        setCaption('');
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            if (postFiles.length > 0) {
                postFiles.forEach((file) => {
                    formData.append('files', file);
                })
            }
            if (caption.length > 0) formData.append('caption', caption);
            await axios.post('/api/post/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        catch(error) {
            console.error(error);
        }
        finally {
            setLoading(false);
            setPostFiles([]);
            setCaption('');
            props.togglePostModal();
        } 
    }

    const endContent = useMemo(() => {
        return (
            <>
                <Tooltip showArrow={true} content="Emoticons">
                    <Emoji size="30" className="cursor-pointer" onClick={toggleEmojiPicker} />
                </Tooltip>
            </>
        )
    }, [toggleEmojiPicker])
    const {getRootProps, getInputProps} = useDropzone({onDrop});
    return (
        <>
            <Modal size='4xl' isOpen={props.postModal} onOpenChange={openChange} placement={'center'}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex justify-center text-3xl">Create Post</ModalHeader>
                            <ModalBody className="w-full relative">
                                <Textarea
                                    label="Caption"
                                    placeholder="Enter your caption here..."
                                    className="w-full"
                                    value={caption}
                                    endContent={endContent}
                                    onChange={(event) => setCaption(event.target.value)}
                                />
                                <div className="absolute right-20 -top-8 z-50 overflow-visible">
                                    <EmojiPicker className="overflow-visible" open={emojiPickerOpen} theme={localStorage.theme === 'dark' ? 'dark' : 'light'} lazyLoadEmojis={true} onEmojiClick={handleEmojiClick} />
                                </div>
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
                                        <div className="flex flex-wrap mb-3 overflow-scroll max-h-[400px]">
                                            {
                                                postFiles.map((file, index) => {
                                                    if(file.type.startsWith('image/')) {
                                                        return <img key={index}
                                                                    src={URL.createObjectURL(file)}
                                                                    alt="issue"
                                                                    className="w-full mx-auto max-h-[400px] object-center my-1"/>
                                                    }
                                                    else if(file.type.startsWith('video/')) {
                                                        return (
                                                            <video key={index} className="w-full max-h-[400px] object-center mx-auto my-1" autoPlay muted loop>
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
                                            className="hidden" multiple onChange={handleUpload} />
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
                                <Button onClick={handleSubmit} className="w-full bg-black text-white dark:bg-white dark:text-black" isDisabled={postFiles.length === 0 && !caption} isLoading={loading}>
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