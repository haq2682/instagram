import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Button, Avatar } from "@nextui-org/react";
import {useState} from 'react';
import {FileCopy2} from '@styled-icons/remix-fill/FileCopy2';
import axios from 'axios';
import { ShareForward2 } from "styled-icons/remix-fill";
import { PuffLoader } from "react-spinners";

export default function ShareModal(props) {
    const [caption, setCaption] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const copyLink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/post/${props.post._id}`)
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault(); 
        try {
            const response = await axios.post('/api/post/share', {caption: caption, id: (props.post?.shared_post ? props.post.shared_post._id : props.post._id)});
            console.log(response.data);
            props.setClose();
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Modal isOpen={props.open} onClose={props.setClose} placement="center" className="max-h-[90vh]" size="5xl">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex justify-center text-2xl">Share this Post</ModalHeader>
                            <form method="POST" onSubmit={handleSubmit} action="/api/post/share">
                                <ModalBody className="w-full">
                                    <Textarea
                                        label="Caption"
                                        placeholder="Enter your caption here..."
                                        className="w-full"
                                        value={caption}
                                        onChange={(event) => setCaption(event.target.value)}
                                    />
                                    <h1 className="my-1 text-lg font-bold text-center">Share this with your followers</h1>
                                    <div className="followers border-neutral-500 border-1 rounded-lg max-h-[30vh] overflow-y-scroll">
                                        <ul>
                                            <li className="p-3">
                                                <div className="flex justify-between">
                                                    <div className="flex items-center">
                                                        <div className="profile-picture">
                                                            <Avatar src="https://picsum.photos/200" />
                                                        </div>
                                                        <div className="username mx-3 whitespace-nowrap overflow-hidden text-ellipsis">Username</div>
                                                    </div>
                                                    <div>
                                                        <Button>Send</Button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="text-center text-red-500 opacity-75 font-bold text-lg">
                                        {error}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <div>
                                        <Button className="bg-purple-600 text-white font-semibold mx-1.5" onClick={copyLink}>Copy Link<FileCopy2 size="23"/></Button>
                                        <Button type="submit" className="mx-1.5 bg-blue-600 text-white font-semibold" isDisabled={loading}>Submit {loading && <span><PuffLoader color="white" size="20px"/></span>}<ShareForward2 size="23"/></Button>
                                    </div>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}