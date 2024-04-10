import PFP from '../../assets/profile-photo.png';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Button,
    Divider,
    Input,
    Textarea,
    Autocomplete,
    AutocompleteItem,
    Modal,
    ModalContent,
} from "@nextui-org/react";
import {Edit} from '@styled-icons/material/Edit';

export default function ProfileSettings() {
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [website, setWebsite] = useState('');
    const [gender, setGender] = useState('');
    const [pfpChangeOpen, setPfpChangeOpen] = useState(false);
    const [usernameChangeOpen, setUsernameChangeOpen] = useState(false);
    const [nameChangeOpen, setNameChangeOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/auth/user')
            .then((response) => {
                setUsername(response.data.username);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setWebsite(response.data.website);
                setGender(response.data.gender);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);
    const handleBioChange = (event) => {
        setBio(event.target.value);
    }

    const genders = ['Male', 'Female', 'Prefer not to Say'];

    if(loading) {
        return <div className="flex justify-center items-center h-full"><div className="loader"></div></div>;
    }
    return (
        <div className="profile-settings">
            <form action="/src/pages/Settings" method="post">
                <h1 className="font-black text-lg sm:text-2xl my-4">Profile Settings</h1>
                <Divider/>
                <div
                    className="profile-photo w-full my-8 flex justify-between rounded-lg bg-neutral-200 dark:bg-neutral-800 p-4">
                    <div className="flex mr-10">
                        <img src={PFP} alt="profile"
                             className="h-10 w-10 sm:h-14 sm:w-14 lg:h-18 lg:w-18 rounded-full"/>
                        <div className="mx-3 self-center">
                            <h1 className="font-bold text-sm sm:text-lg">{username}<span className="hover:text-neutral-600 dark:hover:text-neutral-400 cursor-pointer transition-colors duration-200"><Edit size="20"/></span></h1>
                            <p className="text-xs sm:text-sm">{firstName} {lastName} <span className="hover:text-neutral-600 dark:hover:text-neutral-400 cursor-pointer transition-colors duration-200"><Edit size="15"/></span></p>
                        </div>
                    </div>
                    <span className="sm:mt-2"><Button onClick={() => setPfpChangeOpen(true)}
                                                      className="bg-fuchsia-500 sm:text-lg text-white">Edit Photo</Button></span>
                </div>
                <Divider/>
                <div className="profile-website my-8">
                    <h1 className="font-bold text-lg sm:text-2xl my-4">Website</h1>
                    <Input type="email" variant="underlined" defaultValue={website}
                           description="A website to show off your personal portfolio and such"/>
                </div>
                <div className="profile-bio my-8">
                    <h1 className="font-bold text-lg sm:text-2xl my-4">Bio</h1>
                    <Textarea onChange={handleBioChange} maxLength={150} variant="bordered" value={bio} endContent={<div
                        className="relative top-10 text-gray-400 dark:text-gray-600">{bio.length}/150</div>}/>
                </div>
                <Divider/>
                <div className="profile-gender my-8">
                    <h1 className="font-bold text-lg sm:text-2xl my-4">Gender</h1>
                    <Autocomplete variant="underlined" defaultSelectedKey={gender}>
                        {genders.map((gender) => (
                            <AutocompleteItem key={gender} value={gender}>
                                {gender}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>
                <Button isDisabled
                        className="float-right text-md px-12 py-7 shadow-lg bg-yellow-500 text-white font-bold">Submit</Button>
                <Modal placement={'center'} size="sm" isOpen={pfpChangeOpen} onClose={() => setPfpChangeOpen(false)}>
                    <ModalContent>
                        {() => (
                            <div className="py-10 text-center flex flex-col">
                                <Button className="text-lg mx-5 my-2 py-10">Change Photo</Button>
                                <Button className="text-lg mx-5 my-2 py-10">Remove Photo</Button>
                            </div>
                        )}
                    </ModalContent>
                </Modal>
            </form>
        </div>
    );
}