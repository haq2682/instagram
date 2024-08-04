import { Modal, ModalContent, ModalHeader, ModalBody, Avatar, Divider} from "@nextui-org/react";
import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ViewLikes(props) {
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fetchLikes = useCallback(async () => {
        setLoading(true);
        setError('');
        setLikes([]);
        try {
            const response = await axios.get(`/api/${props.type}/getLikes/${props.content._id}`);
            setLikes(response.data);
        }
        catch(error) {
            setError(error.response?.data.message);
        }
        finally {
            setLoading(false);
        }
    }, [props.type, props.content?._id]);

    useEffect(() => {
        if(props.open) fetchLikes();
    }, [fetchLikes, props.open]);

    return (
        <>
            <Modal isOpen={props.open} onClose={props.setClose} size={'xl'} placement="center">
                <ModalContent>
                    <ModalHeader>
                        <h1 className="text-lg font-bold text-center w-full">Likes</h1>
                    </ModalHeader>
                    <ModalBody>
                        {
                            loading && <div className="mx-auto my-16"><div className="loader"/></div>
                        }
                        {
                            likes.map((like) => {
                                return (
                                    <>
                                        <Divider/>
                                        <div key={like._id} className="liker flex items-center mb-3">
                                            <div>
                                                <Avatar src={like.profile_picture?.filename} alt="liker-pfp"/>
                                            </div>
                                            <div>
                                                <Link to={`/profile/${like.username}`} className="text-md font-bold ml-3 w-full text-ellipsis hover:text-neutral-700 dark:hover:text-neutral-300 transition-color duration-200 cursor-pointer">{like.username}</Link>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        {
                            error && <div className="text-center font-bold text-lg opacity-75 my-16">{error}</div>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}