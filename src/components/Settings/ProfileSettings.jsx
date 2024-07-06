import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    Button,
    Divider,
    Input,
    Textarea,
    Autocomplete,
    AutocompleteItem,
    Modal,
    ModalContent, ModalHeader, ModalBody
} from "@nextui-org/react";
import { Edit } from '@styled-icons/material/Edit';
import { useSelector, useDispatch } from "react-redux";
import { authenticate, unVerifyEmail } from '../../redux/authSlice';

export default function ProfileSettings() {
    const pfpRef = useRef(null);
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);
    const [error, setError] = useState('');
    const [details, setDetails] = useState({
        username: null,
        firstName: null,
        lastName: null,
        website: null,
        gender: null,
        bio: null,
        email: null,
        profile_picture: null,
    });
    const [auth, setAuth] = useState({
        username: state.username,
        firstName: state.firstName,
        lastName: state.lastName,
        website: state.website,
        gender: state.gender,
        bio: state.bio,
        email: state.email,
        profile_picture: state.profile_picture
    });
    const [pfpChangeOpen, setPfpChangeOpen] = useState(false);
    const [usernameChangeOpen, setUsernameChangeOpen] = useState(false);
    const [nameChangeOpen, setNameChangeOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [emailFlag, setEmailFlag] = useState(false);

    const handleChange = (type, event) => {
        setDetails({
            ...details,
            [type]: (type === 'gender') ? event : event.target.value
        });
        setAuth({
            ...auth,
            [type]: (type === 'gender') ? event : event.target.value
        });
        setIsDisabled(false);
    }
    useEffect(() => {
        if (auth.email !== state.email) setEmailFlag(true);
        else setEmailFlag(false);
    }, [state.email, auth.email]);
    const handleEmailChange = (event) => {
        setError('');
        setDetails({
            ...details,
            email: event.target.value
        });
        setAuth({
            ...auth,
            email: event.target.value
        })
        setIsDisabled(false);
    }
    const handleSubmit = async () => {
        setSubmitLoading(true);
        setIsDisabled(true);
        try {
            if (details.profile_picture) {
                const formData = new FormData();
                formData.append('profile_picture', details.profile_picture);
                try {
                    await axios.put('/user/changepfp', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                }
                catch (error) {
                    console.log(error);
                }
            }
            const response = await axios.put('/user/edit', details, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response) {
                axios.get('/auth/user')
                    .then((response) => {
                        dispatch(authenticate(response));
                        if (emailFlag) dispatch(unVerifyEmail());
                        setDetails({
                            username: null,
                            firstName: null,
                            lastName: null,
                            website: null,
                            gender: null,
                            bio: null,
                            profile_picture: null,
                        });
                    });
            }
        }
        catch (error) {
            setError(error.response.data.message);
        }
        setSubmitLoading(false);
    }

    const removePfp = async () => {
        try {
            const response = await axios.get('/user/removepfp');
            if (response) {
                setAuth({ ...auth, profile_picture: response.data });
                setPfpChangeOpen(false);
                axios.get('/auth/user').then((res) => {
                    dispatch(authenticate(res));
                })
            }
        }
        catch (error) {
            console.log("An error occurred while removing the profile picture.");
        }
    }

    const imageUpload = (event) => {
        setDetails({ ...details, profile_picture: event.target.files[0] });
        setAuth({ ...auth, profile_picture: URL.createObjectURL(event.target.files[0]) });
        setIsDisabled(false);
    }

    const genders = ['Male', 'Female', 'Prefer not to Say'];

    return (
        <div className="profile-settings">
            <h1 className="font-black text-lg sm:text-2xl my-4">Profile Settings</h1>
            <Divider />
            <div
                className="profile-photo w-full my-8 flex justify-between rounded-lg bg-neutral-200 dark:bg-neutral-800 p-4">
                <div className="flex mr-10">
                    <img src={`${auth.profile_picture.filename}`} alt="profile"
                        className="h-10 w-10 sm:h-14 sm:w-14 lg:h-18 lg:w-18 rounded-full object-cover" />
                    <div className="mx-3 self-center">
                        <h1 className="font-bold text-sm sm:text-lg">{auth.username}<span
                            onClick={() => setUsernameChangeOpen(true)}
                            className="hover:text-neutral-600 dark:hover:text-neutral-400 cursor-pointer transition-colors duration-200"><Edit
                                size="20" /></span></h1>
                        <p className="text-xs sm:text-sm">{auth.firstName} {auth.lastName} <span
                            onClick={() => setNameChangeOpen(true)}
                            className="hover:text-neutral-600 dark:hover:text-neutral-400 cursor-pointer transition-colors duration-200"><Edit
                                size="15" /></span></p>
                    </div>
                </div>
                <span className="sm:mt-2"><Button onClick={() => setPfpChangeOpen(true)}
                    className="bg-fuchsia-500 sm:text-lg text-white">Edit Photo</Button></span>
            </div>
            <Divider />
            <div className="profile-email my-8">
                <h1 className="font-bold text-lg sm:text-2xl my-4">Email</h1>
                <Input aria-label="email" type="email" variant="underlined" value={auth.email}
                    description="Once you change your email, you will have to re-verify your email address"
                    onChange={handleEmailChange} />
            </div>
            <div className="profile-website my-8">
                <h1 className="font-bold text-lg sm:text-2xl my-4">Website</h1>
                <Input aria-label="website" type="email" variant="underlined" value={auth?.website}
                    description="A website to show off your personal portfolio and such"
                    onChange={event => handleChange('website', event)} />
            </div>
            <div className="profile-bio my-8">
                <h1 className="font-bold text-lg sm:text-2xl my-4">Bio</h1>
                <Textarea aria-label="bio" onChange={event => handleChange('bio', event)} maxLength={150} variant="bordered"
                    value={auth?.bio} endContent={<div
                        className="relative top-10 text-gray-400 dark:text-gray-600">{auth?.bio?.length}/150</div>} />
            </div>
            <Divider />
            <div className="profile-gender my-8">
                <h1 className="font-bold text-lg sm:text-2xl my-4">Gender</h1>
                <Autocomplete aria-label="gender" variant="underlined" defaultSelectedKey={auth?.gender}
                    onInputChange={event => handleChange('gender', event)}>{genders.map((gender) => (
                        <AutocompleteItem key={gender} value={gender}>
                            {gender}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>
            <div className="overflow-hidden"><Button onClick={handleSubmit} isDisabled={isDisabled}
                className="float-right text-md px-12 py-7 shadow-lg bg-yellow-500 text-white font-bold"
                isLoading={submitLoading}>Submit</Button></div>
            <div className={`text-center mt-4 text-xl text-red-500 ${error ? 'block' : 'hidden'}`}>{error}</div>
            <Modal placement={'center'} size="sm" isOpen={pfpChangeOpen} onClose={() => setPfpChangeOpen(false)}>
                <ModalContent>
                    {() => (
                        <div className="py-10 text-center flex flex-col">
                            <input type="file" name="profile_picture" onChange={imageUpload} style={{ display: 'none' }} ref={pfpRef} accept="image/*" />
                            <Button className="text-lg mx-5 my-2 py-10" onClick={() => pfpRef.current.click()}>Change Photo</Button>
                            <Button onClick={removePfp} className="text-lg mx-5 my-2 py-10">Remove Photo</Button>
                            {(details.profile_picture) ? <p>Image Selected, Click on 'Submit'</p> : ''}
                        </div>
                    )}
                </ModalContent>
            </Modal>
            <Modal placement={'center'} size="lg" isOpen={usernameChangeOpen}
                onClose={() => setUsernameChangeOpen(false)}>
                <ModalContent className="pb-4">
                    {() => (
                        <>
                            <ModalHeader className="flex justify-center">
                                Change Username
                            </ModalHeader>
                            <ModalBody>
                                <Input variant="bordered" label="Username" value={auth.username}
                                    onChange={event => handleChange('username', event)} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal placement={'center'} size="lg" isOpen={nameChangeOpen} onClose={() => setNameChangeOpen(false)}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex justify-center">
                                Change Name
                            </ModalHeader>
                            <ModalBody>
                                <div className="pb-2 flex flex-col">
                                    <Input variant="bordered" label="First Name" value={auth.firstName}
                                        onChange={event => handleChange('firstName', event)} className="my-2.5" />
                                    <Input variant="bordered" label="Last Name" value={auth.lastName}
                                        onChange={event => handleChange('lastName', event)} className="my-2.5" />
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}