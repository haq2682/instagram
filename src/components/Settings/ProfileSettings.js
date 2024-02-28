import PFP from '../../assets/profile-photo.png';
import {useState} from 'react';
import {
    Button,
    Divider,
    Input,
    Textarea,
    Autocomplete,
    AutocompleteItem,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure
} from "@nextui-org/react";
import {Edit} from '@styled-icons/material/Edit';

export default function ProfileSettings() {
    const [bio, setBio] = useState('');
    const [pfpChangeOpen, setPfpChangeOpen] = useState(false);
    const {onOpenChange} = useDisclosure();
    const handleBioChange = (event) => {
        setBio(event.target.value);
    }

    const genders = ['Male', 'Female', 'Prefer not to Say'];
    return (
        <div className="profile-settings">
            <form action="/settings" method="post">
                <h1 className="font-black text-lg sm:text-2xl my-4">Profile Settings</h1>
                <Divider/>
                <div
                    className="profile-photo w-full my-8 flex justify-between rounded-lg bg-neutral-200 dark:bg-neutral-800 p-4">
                    <div className="flex mr-10">
                        <img src={PFP} alt="profile"
                             className="h-10 w-10 sm:h-14 sm:w-14 lg:h-18 lg:w-18 rounded-full"/>
                        <div className="mx-3 self-center">
                            <h1 className="font-bold text-sm sm:text-lg">khalid_ah_1 <span><Edit size="20"/></span></h1>
                            <p className="text-xs sm:text-sm">Abdul Haq Khalid <span><Edit size="15"/></span></p>
                        </div>
                    </div>
                    <span className="sm:mt-2"><Button onClick={() => setPfpChangeOpen(true)}
                                                      className="bg-fuchsia-500 sm:text-lg text-white">Edit Photo</Button></span>
                </div>
                <Divider/>
                <div className="profile-website my-8">
                    <h1 className="font-bold text-lg sm:text-2xl my-4">Website</h1>
                    <Input type="email" variant="underlined" defaultValue="www.instagramclone.org"
                           description="A website to show off your personal portfolio and such" className=""/>
                </div>
                <div className="profile-bio my-8">
                    <h1 className="font-bold text-lg sm:text-2xl my-4">Bio</h1>
                    <Textarea onChange={handleBioChange} maxLength={150} variant="bordered"
                              className="" endContent={<div
                        className="relative top-10 text-gray-400 dark:text-gray-600">{bio.length}/150</div>}/>
                </div>
                <Divider/>
                <div className="profile-gender my-8">
                    <h1 className="font-bold text-lg sm:text-2xl my-4">Gender</h1>
                    <Autocomplete variant="underlined">
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