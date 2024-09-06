import {
    Input,
    Tooltip
} from "@nextui-org/react";
import { useState, useMemo, useCallback, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Paperclip } from "@styled-icons/feather/Paperclip";
import { Close } from "@styled-icons/ionicons-solid/Close";
import { ArrowForward } from "@styled-icons/typicons/ArrowForward";
import { CloseCircle } from "@styled-icons/remix-line/CloseCircle";
import { PuffLoader } from "react-spinners";
import { Emoji } from "@styled-icons/fluentui-system-filled/Emoji";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput(props) {
    const [description, setDescription] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const loggedInUser = useSelector(state => state.auth);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const typingTimeoutRef = useRef(null);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const toggleEmojiPicker = () => {
        setEmojiPickerOpen(!emojiPickerOpen);
    }

    const handleEmojiClick = (emoji) => {
        setDescription(prev => prev + emoji.emoji);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file || description) {
            try {
                setSubmitLoading(true);
                let response;
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    response = await axios.post('/api/chat/new/message', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                // // const formData = new FormData();
                // // if (file) formData.append('file', file);
                // // if (description.length > 0) formData.append('description', description);
                // // if (replyingToMessage) formData.append('reply_to', replyingToMessage._id);
                // // formData.append('chatId', currentRoom._id);
                // // const response = await axios.post('/api/chat/new/message', formData, {
                // //     headers: {
                // //         'Content-Type': 'multipart/form-data'
                // //     }
                // // });
                // // setMessages((previous) => [...previous, response.data]);
                const data = {}
                if (file) data.file = response.data;
                if (description.length > 0) data.description = description;
                if (props.replyingToMessage) data.reply_to = props.replyingToMessage._id;
                data.chatId = props.currentRoom._id;
                data.authId = loggedInUser._id;

                props.socket.emit('chat message', data);

                let typingData = {};
                typingData.roomId = props.currentRoom._id;
                typingData.username = loggedInUser.username;
                props.socket.emit('stopTyping', typingData);

                props.socket.on('message sent', (data) => setSubmitLoading(data));

                props.socket.on('chat error', (data) => {
                    setError(data);
                });
            }
            catch (error) {
                setError(error.response.data.message);
            }
            finally {
                setDescription('');
                setFile(null);
                props.setReplyingToMessage(null);
                const messagesDiv = document.querySelector('.messages');
                window.scrollTo(0, messagesDiv.scrollHeight);
            }
        }
    }

    const handleDescriptionChange = useCallback((event) => {
        const value = event.target.value;
        setDescription(value);

        const data = { roomId: props.currentRoom?._id, username: loggedInUser.username };
        props.socket.emit('typing', data);

        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            props.socket.emit('stopTyping', data);
        }, 2000);
    }, [props.currentRoom?._id, loggedInUser, props.socket]);

    const handleFileChange = useCallback((event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    }, []);

    const endContent = useMemo(() => {
        return (
            <>
                {submitLoading && <PuffLoader size="28px" color="gray" />}
            </>
        )
    }, [submitLoading]);

    return (
        <>
            <form method="post" onSubmit={handleSubmit} className="relative">
                {props.replyingToMessage && (
                    <div>
                        <div className="message opacity-40">
                            <div className="float-right" onClick={() => props.setReplyingToMessage(null)}><Close size="20" /></div>
                            {props.replyingToMessage.user.username === loggedInUser.username ? (
                                <div className="sender-reply text-xs inline-block bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white bg-opacity-60 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                    <div className="font-bold mb-1">
                                        <img src={loggedInUser.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />You
                                    </div>
                                    {props.replyingToMessage.media ? (
                                        props.replyingToMessage.media.media_type === 'image' ? (
                                            <div className="font-bold italic underline">Image</div>
                                        ) : (
                                            <div className="font-bold italic underline">Video</div>
                                        )
                                    ) : (props.replyingToMessage.description)}
                                </div>
                            ) : (
                                <div className="recepient-reply text-xs inline-block bg-neutral-200 dark:bg-neutral-800 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                    <div className="font-bold mb-1">
                                        <img src={props.replyingToMessage.user.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />{props.replyingToMessage.user.username}
                                    </div>
                                    {props.replyingToMessage.media ? (
                                        props.replyingToMessage.media.media_type === 'image' ? (
                                            <div className="font-bold italic underline">Image</div>
                                        ) : (
                                            <div className="font-bold italic underline">Video</div>
                                        )
                                    ) : (props.replyingToMessage.description)}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {file && (
                    <div className="max-h-[150px] max-w-[150px] overflow-hidden mt-2 relative">
                        {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt="preview" className="object-cover" />
                        ) : (
                            <video muted autoPlay className="object-cover">
                                <source src={URL.createObjectURL(file)} />
                            </video>
                        )}
                        <div className="text-red-500 absolute top-0 right-1" onClick={() => setFile(null)}>
                            <CloseCircle size="30" />
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Tooltip showArrow={true} content="Emoticons">
                        <Emoji size="30" className="cursor-pointer" onClick={toggleEmojiPicker}/>
                    </Tooltip>
                    <Input
                        label="Write your message..."
                        variant="bordered"
                        isDisabled={!props.currentRoom || submitLoading}
                        value={description}
                        onChange={handleDescriptionChange}
                        endContent={endContent}
                        radius="full"
                    />
                    <input
                        id="message-file-upload"
                        name="message-file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="message-file-upload" className="cursor-pointer">
                        <Tooltip showArrow={true} content="Upload an image">
                            <Paperclip size="25" />
                        </Tooltip>
                    </label>
                    <input id="comment-submit" type="submit" className="hidden" />
                    <label htmlFor="comment-submit" className="cursor-pointer">
                        <Tooltip showArrow={true} content="Submit">
                            <ArrowForward size="30" />
                        </Tooltip>
                    </label>
                    
                </div>
                <div className="absolute bottom-12">
                    <EmojiPicker open={emojiPickerOpen} theme={localStorage.theme === 'dark' ? 'dark' : 'light'} lazyLoadEmojis={true} onEmojiClick={handleEmojiClick}/>
                </div>
            </form>
        </>
    )
}