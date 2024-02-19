import {Avatar, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Tooltip} from "@nextui-org/react";
import {Paperclip} from "@styled-icons/feather/Paperclip";
import {ArrowForward} from "@styled-icons/typicons/ArrowForward";
import {LinkIt, LinkItEmail, LinkItUrl} from "react-linkify-it";
import {Heart} from "@styled-icons/boxicons-solid/Heart";
import {FC, useState} from "react";
import {ReadMoreWeb} from "react-shorten";

export default function Comment(props) {
    const [replyInput, setReplyInput] = useState(false);
    const mention = /@([\w_]+)/;
    const hashTag = /#([\w_]+)/;
    const StyledReadMore: FC<{
        truncate?: number;
        children: React.ReactNode;
    }> = ({ truncate, children }) => (
        <ReadMoreWeb
            truncate={truncate}
            showMoreText="Show more"
            showLessText="Show less"
            className="read-more-btn text-yellow-600 hover:text-yellow-400 dark:text-yellow-400 dark:hover:text-yellow-600"
        >
            {children}
        </ReadMoreWeb>
    );
    return (
        <div className="comment-modal">
            <Modal
                size={'5xl'}
                isOpen={props.open}
                onClose={props.setClose}
                className="max-h-[90vh]"
                placement="center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <form action="/" method="post" className="self-center w-[95%]">
                                    <Input
                                        label="Write your comment..."
                                        variant="bordered"
                                        endContent={
                                            <>
                                                <input id="comment-file-upload"
                                                       name="comment-file-upload" type="file"
                                                       className="hidden"/>
                                                <label htmlFor="comment-file-upload"
                                                       className="cursor-pointer">
                                                    <Tooltip showArrow={true}
                                                             content="Upload an image">
                                                        <Paperclip size="25"/>
                                                    </Tooltip>
                                                </label>
                                                <input id="comment-submit" type="submit"
                                                       className="hidden"/>
                                                <label htmlFor="comment-submit"
                                                       className="cursor-pointer">
                                                    <Tooltip showArrow={true} content="Submit">
                                                        <ArrowForward size="30"/>
                                                    </Tooltip>
                                                </label>
                                            </>

                                        }
                                    />
                                </form>
                            </ModalHeader>
                            <ModalBody className="overflow-scroll max-h-full">
                                <div
                                    className="comment mb-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                    <div className="flex">
                                        <div className="comment-pfp mb-2.5 mr-2.5">
                                            <Avatar
                                                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                                className="w-10 h-10"/>
                                        </div>
                                        <div className="comment-text mb-1.5">
                                            <p className="font-black text-lg cursor-pointer">Username</p>
                                            <p>
                                                <StyledReadMore truncate={255}>
                                                    <LinkItEmail
                                                        className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                                        <LinkItUrl
                                                            className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                                            <LinkIt component={(match, key) => <a
                                                                className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300"
                                                                href={match.substring(1)}
                                                                key={key}>{match}</a>}
                                                                    regex={mention}>
                                                                <LinkIt
                                                                    component={(match, key) => <a
                                                                        className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300"
                                                                        href={'search?' + match.substring(1)}
                                                                        key={key}>{match}</a>}
                                                                    regex={hashTag}>
                                                                    Lorem Ipsum is simply dummy text
                                                                    of the printing and typesetting
                                                                    industry.
                                                                    Lorem Ipsum has been the
                                                                    industry's standard dummy text
                                                                    ever since the
                                                                    1500s, when an unknown printer
                                                                    took a galley of type and
                                                                    scrambled it to
                                                                    make a type specimen book. It
                                                                    has survived not only five
                                                                    centuries, but also
                                                                    the leap into electronic
                                                                    typesetting, remaining
                                                                    essentially unchanged. It
                                                                    was popularised in the 1960s
                                                                    with the release of Letraset
                                                                    sheets containing
                                                                    Lorem Ipsum passages, and more
                                                                    recently with desktop publishing
                                                                    software
                                                                    like Aldus PageMaker including
                                                                    versions of Lorem Ipsum.
                                                                    @khalid_ah_1
                                                                    #khalid_ah_1
                                                                    www.github.com
                                                                    haq2682@gmail.com
                                                                </LinkIt>
                                                            </LinkIt>
                                                        </LinkItUrl>
                                                    </LinkItEmail>
                                                </StyledReadMore>
                                                <img
                                                    src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                                                    alt="comment pic"
                                                    className="object-contain mt-2 rounded-lg w-[300px] h-auto max-h-[300px]"/>
                                            </p>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="comment-actions flex justify-between text-sm">
                                        <div className="flex">
                                            <div className="text-neutral-500 mr-1.5">
                                                1m
                                            </div>
                                            <div
                                                className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                Like
                                            </div>
                                            <div onClick={() => setReplyInput(!replyInput)}
                                                 className="comment-reply ml-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                Reply
                                            </div>
                                        </div>
                                        <div className="text-cyan-600 dark:text-cyan-400">
                                            <Heart size="15" className="mr-1 mb-0.5"/>96 Likes
                                        </div>
                                    </div>
                                    <div>
                                        <form action="/" method="post"
                                              className="self-center w-[95%] mb-3">
                                            <Input
                                                placeholder="Write your reply..."
                                                variant="bordered"
                                                size={'sm'}
                                                endContent={
                                                    <>
                                                        <input id="comment-file-upload"
                                                               name="comment-file-upload"
                                                               type="file" className="hidden"/>
                                                        <label htmlFor="comment-file-upload"
                                                               className="cursor-pointer">
                                                            <Tooltip showArrow={true}
                                                                     content="Upload an image">
                                                                <Paperclip size="25"/>
                                                            </Tooltip>
                                                        </label>
                                                        <input id="comment-submit" type="submit"
                                                               className="hidden"/>
                                                        <label htmlFor="comment-submit"
                                                               className="cursor-pointer">
                                                            <Tooltip showArrow={true}
                                                                     content="Submit">
                                                                <ArrowForward size="30"/>
                                                            </Tooltip>
                                                        </label>
                                                    </>

                                                }
                                                className={`${replyInput ? 'block' : 'hidden'} mt-3`}
                                            />
                                        </form>
                                        <div className="text-neutral-500 mb-1.5">
                                            Replies to Username's comment
                                        </div>
                                        <div className="reply mt-3 ml-10">
                                            <div className="flex ml-12">
                                                <div className="comment-pfp mb-2.5 mr-2.5">
                                                    <Avatar
                                                        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                                        className="w-10 h-10"/>
                                                </div>
                                                <div className="comment-text mb-1.5">
                                                    <p className="font-black text-md cursor-pointer">Username</p>
                                                    <p className="text-sm">
                                                        <StyledReadMore truncate={255}>
                                                            <LinkItEmail
                                                                className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                                                <LinkItUrl
                                                                    className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                                                    <LinkIt
                                                                        component={(match, key) =>
                                                                            <a
                                                                                className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300"
                                                                                href={match.substring(1)}
                                                                                key={key}>{match}</a>}
                                                                        regex={mention}>
                                                                        <LinkIt
                                                                            component={(match, key) =>
                                                                                <a
                                                                                    className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300"
                                                                                    href={'search?' + match.substring(1)}
                                                                                    key={key}>{match}</a>}
                                                                            regex={hashTag}>
                                                                            Lorem Ipsum is simply
                                                                            dummy
                                                                            text
                                                                            of the printing and
                                                                            typesetting
                                                                            industry.
                                                                            Lorem Ipsum has been the
                                                                            industry's standard
                                                                            dummy
                                                                            text
                                                                            ever since the
                                                                            1500s, when an unknown
                                                                            printer
                                                                            took a galley of type
                                                                            and
                                                                            scrambled it to
                                                                            make a type specimen
                                                                            book.
                                                                            It
                                                                            has survived not only
                                                                            five
                                                                            centuries, but also
                                                                            the leap into electronic
                                                                            typesetting, remaining
                                                                            essentially unchanged.
                                                                            It
                                                                            was popularised in the
                                                                            1960s
                                                                            with the release of
                                                                            Letraset
                                                                            sheets containing
                                                                            Lorem Ipsum passages,
                                                                            and
                                                                            more
                                                                            recently with desktop
                                                                            publishing
                                                                            software
                                                                            like Aldus PageMaker
                                                                            including
                                                                            versions of Lorem Ipsum.
                                                                            @khalid_ah_1
                                                                            #khalid_ah_1
                                                                            www.github.com
                                                                            haq2682@gmail.com
                                                                        </LinkIt>
                                                                    </LinkIt>
                                                                </LinkItUrl>
                                                            </LinkItEmail>
                                                        </StyledReadMore>
                                                        <img
                                                            src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                                                            alt="comment pic"
                                                            className="object-contain mt-2 rounded-lg w-[300px] h-auto max-h-[300px]"/>
                                                    </p>
                                                </div>
                                            </div>
                                            <Divider/>
                                            <div
                                                className="comment-actions flex justify-between text-sm">
                                                <div className="flex">
                                                    <div className="text-neutral-500 mr-1.5">
                                                        1m
                                                    </div>
                                                    <div
                                                        className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                        Like
                                                    </div>
                                                </div>
                                                <div className="text-cyan-600 dark:text-cyan-400">
                                                    <Heart size="15" className="mr-1 mb-0.5"/>96
                                                    Likes
                                                </div>
                                            </div>
                                        </div>
                                        <div className="reply mt-3 ml-10">
                                            <div className="flex ml-12">
                                                <div className="comment-pfp mb-2.5 mr-2.5">
                                                    <Avatar
                                                        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                                        className="w-10 h-10"/>
                                                </div>
                                                <div className="comment-text mb-1.5">
                                                    <p className="font-black text-md cursor-pointer">Username</p>
                                                    <p className="text-sm">
                                                        <StyledReadMore truncate={255}>
                                                            <LinkItEmail
                                                                className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                                                <LinkItUrl
                                                                    className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                                                    <LinkIt
                                                                        component={(match, key) =>
                                                                            <a
                                                                                className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300"
                                                                                href={match.substring(1)}
                                                                                key={key}>{match}</a>}
                                                                        regex={mention}>
                                                                        <LinkIt
                                                                            component={(match, key) =>
                                                                                <a
                                                                                    className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300"
                                                                                    href={'search?' + match.substring(1)}
                                                                                    key={key}>{match}</a>}
                                                                            regex={hashTag}>
                                                                            Lorem Ipsum is simply
                                                                            dummy
                                                                            text
                                                                            of the printing and
                                                                            typesetting
                                                                            industry.
                                                                            Lorem Ipsum has been the
                                                                            industry's standard
                                                                            dummy
                                                                            text
                                                                            ever since the
                                                                            1500s, when an unknown
                                                                            printer
                                                                            took a galley of type
                                                                            and
                                                                            scrambled it to
                                                                            make a type specimen
                                                                            book.
                                                                            It
                                                                            has survived not only
                                                                            five
                                                                            centuries, but also
                                                                            the leap into electronic
                                                                            typesetting, remaining
                                                                            essentially unchanged.
                                                                            It
                                                                            was popularised in the
                                                                            1960s
                                                                            with the release of
                                                                            Letraset
                                                                            sheets containing
                                                                            Lorem Ipsum passages,
                                                                            and
                                                                            more
                                                                            recently with desktop
                                                                            publishing
                                                                            software
                                                                            like Aldus PageMaker
                                                                            including
                                                                            versions of Lorem Ipsum.
                                                                            @khalid_ah_1
                                                                            #khalid_ah_1
                                                                            www.github.com
                                                                            haq2682@gmail.com
                                                                        </LinkIt>
                                                                    </LinkIt>
                                                                </LinkItUrl>
                                                            </LinkItEmail>
                                                        </StyledReadMore>
                                                        <img
                                                            src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                                                            alt="comment pic"
                                                            className="object-contain mt-2 rounded-lg w-[300px] h-auto max-h-[300px]"/>
                                                    </p>
                                                </div>
                                            </div>
                                            <Divider/>
                                            <div
                                                className="comment-actions flex justify-between text-sm">
                                                <div className="flex">
                                                    <div className="text-neutral-500 mr-1.5">
                                                        1m
                                                    </div>
                                                    <div
                                                        className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                        Like
                                                    </div>
                                                </div>
                                                <div className="text-cyan-600 dark:text-cyan-400">
                                                    <Heart size="15" className="mr-1 mb-0.5"/>96
                                                    Likes
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}