import { Input, Modal, ModalBody, ModalContent, ModalHeader, Tooltip } from "@nextui-org/react";
import { Paperclip } from "@styled-icons/feather/Paperclip";
import { ArrowForward } from "@styled-icons/typicons/ArrowForward";
import { CloseCircle } from "@styled-icons/remix-line/CloseCircle";
import { useCallback, useState, useEffect, useRef } from 'react';
import Comment from './Comment';
import axios from "axios";
import { PuffLoader } from "react-spinners";

export default function CommentSection(props) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchLoading, setFetchLoading] = useState(false);
    const commentsEndRef = useRef(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('post_id', props.post?._id);
            formData.append('description', description);
            const response = await axios.post('/api/comment/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setComments((prev) => [...prev, response.data]);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
            setDescription('');
            setFile(null);
        }
    }

    const fetchComments = useCallback(async (page_number) => {
        setFetchLoading(true);
        try {
            const response = await axios.get('/api/comment/post/' + props.post._id + '/page/' + page_number);
            setComments((prev) => [...prev, ...response.data]);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setFetchLoading(false);
        }
    }, [props.post?._id]);

    const fetchMoreComments = async () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    }

    useEffect(() => {
        if (props.open) fetchComments(pageNumber);
    }, [fetchComments, props.open, pageNumber]);

    useEffect(() => {
        scrollToBottom();
    }, [comments]);

    const scrollToBottom = () => {
        if (commentsEndRef.current) commentsEndRef.current.scrollIntoView();
    }

    const closeSection = () => {
        setPageNumber(1);
        setComments([]);
        props.setClose();
    }

    return (
        <div className="comment-modal">
            <Modal
                size={'5xl'}
                isOpen={props.open}
                onClose={closeSection}
                className="max-h-[90vh]"
                placement="center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <form method="post" className="self-center w-[95%]" onSubmit={handleSubmit}>
                                    <Input
                                        label="Write your comment..."
                                        variant="bordered"
                                        onChange={(event) => setDescription(event.target.value)}
                                        isDisabled={loading}
                                        endContent={
                                            <>
                                                <input id="comment-file-upload"
                                                    name="comment-file-upload" type="file"
                                                    className="hidden" onChange={handleFileUpload} />
                                                <label htmlFor="comment-file-upload"
                                                    className="cursor-pointer">
                                                    <Tooltip showArrow={true}
                                                        content="Upload an image/video">
                                                        <Paperclip size="25" />
                                                    </Tooltip>
                                                </label>
                                                <input id="comment-submit" type="submit"
                                                    className="hidden" />
                                                <label htmlFor="comment-submit"
                                                    className="cursor-pointer">
                                                    <Tooltip showArrow={true} content="Submit">
                                                        <ArrowForward size="30" />
                                                    </Tooltip>
                                                </label>
                                                <div className={`${loading ? 'block' : 'hidden'}`}><PuffLoader size="28px" /></div>
                                            </>
                                        }
                                    />
                                    {
                                        file ? (
                                            <div className="max-h-[150px] max-w-[150px] overflow-hidden mt-2 relative">
                                                {
                                                    (file.media === 'image') ? (<img key={file._id} src={URL.createObjectURL(file)} alt="preview" className="object-cover" />) : (
                                                        <video
                                                            muted
                                                            autoPlay
                                                            className="object-cover"
                                                        >
                                                            <source src={URL.createObjectURL(file)} />
                                                        </video>
                                                    )
                                                }
                                                <div className="text-white absolute top-0 right-1" onClick={() => setFile(null)}><CloseCircle size="30" /></div>
                                            </div>
                                        ) : (null)
                                    }
                                </form>
                            </ModalHeader>
                            <ModalBody className="overflow-scroll max-h-full">
                                {
                                    (comments.length !== 0 && !fetchLoading) ? (
                                        comments.map((comment) => { return (<Comment key={comment._id} comment={comment} />) })
                                    ) : (
                                        <div className="text-center text-2xl opacity-50 font-bold my-32">
                                            {
                                                fetchLoading ? (<div className="loader"/>) : (error)
                                            }
                                        </div>
                                    )
                                }
                                {
                                    (comments.length !== props.post.comments?.length && !fetchLoading && !error) ? (
                                        <div onClick={fetchMoreComments} className="text-purple-500 cursor-pointer hover:text-purple-700 dark:hover:text-purple-300 transition-color duration-200">View More Comments</div>
                                    ) : (null)
                                }
                                <div ref={commentsEndRef} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

