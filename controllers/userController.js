const User = require('../models/User');
const ProfilePhoto = require('../models/ProfilePhoto');
const crypto = require("crypto");

module.exports = {
    generateNewToken: async (req, res) => {
        try {
            const username = req.body.username;
            const user = await User.findOne({ username }).exec();
            if (user) {
                user.verify_token = crypto.randomBytes(16).toString('hex');
                await user.save();
                res.status(200).json({ message: 'Token renewed successfully' });
            }
            else res.status(404).json({ message: 'User not found' });
        }
        catch (error) {
            res.status(500).json({ message: 'An error occurred while generating a new token' });
        }
    },
    edit: async (req, res) => {
        try {
            const { username, email, firstName, lastName, website, bio, gender } = req.body;
            const [existingUsername, existingEmail] = await Promise.all([
                username ? User.findOne({ username }).exec() : null,
                email ? User.findOne({ email }).exec() : null
            ]);
            if (existingUsername) {
                return res.status(400).json({ message: "Entered Username is already taken" });
            }
            if (existingEmail) {
                return res.status(400).json({ message: "Entered Email is already registered" });
            }
            const user = await User.findOne({ _id: req.user._id }).exec();
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.username = username || user.username;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.website = website || user.website;
            user.bio = bio || user.bio;
            user.gender = gender || user.gender;
            if (email) {
                user.email = email;
                user.email_verified = false;
            }
            user.updated_at = new Date();
            await user.save();
            return res.sendStatus(200);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    removePfp: async (req, res) => {
        const user = await User.findOne({ _id: req.user._id }).exec();
        const pfp = await ProfilePhoto.findOne({ _id: user.profile_picture._id }).exec();
        let imageFile = '/uploads/pfp/default.jpg';
        pfp.filename = imageFile;
        pfp.updated_at = new Date();
        await pfp.save();
        return res.send(pfp);
    },
    changePfp: async (req, res) => {
        const user = await User.findOne({ _id: req.user._id }).exec();
        const pfp = await ProfilePhoto.findOne({ _id: user.profile_picture._id }).exec();
        let imageFile = '/uploads/pfp/' + req.file.filename;
        pfp.filename = imageFile;
        pfp.updated_at = new Date();
        await pfp.save();
        return res.sendStatus(200);
    },
    find: async (req, res) => {
        try {
            const username = req.params.username;
            const user = await User.findOne({ username: username }).populate([
                {
                    path: 'posts',
                    model: 'Post',
                    populate: [
                        {
                            path: 'user',
                            model: 'User',
                            populate: [
                                {
                                    path: 'profile_picture',
                                    model: 'ProfilePhoto'
                                }
                            ]
                        },
                        {
                            path: 'media',
                            model: 'Media',
                        }
                    ]
                },
                {
                    path: 'profile_picture',
                    model: 'ProfilePhoto'
                }
            ]);
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.send(user);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    suggestions: async (req, res) => {
        try {
            const loggedInUserId = req.user._id;
            const loggedInUser = await User.findById(loggedInUserId).populate('followers');

            if (!loggedInUser) {
                return res.status(404).json({ message: 'Logged-in user not found' });
            }

            const followerIds = loggedInUser.followers.map(follower => follower._id);

            let users = await User.find({
                _id: { $nin: [...followerIds, loggedInUserId] }
            }).populate('profile_picture');

            users = users.sort(() => 0.5 - Math.random());
            users = users.slice(0, 5);

            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No users to suggest' });
            }

            return res.send(users);
        } catch (error) {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    search: async (req, res) => {
        try {
            const { term } = req.query;
            const users = await User.find({
                $and: [
                    { _id: { $ne: req.user._id } },
                    { _id: { $nin: req.user.blocked_users } },
                    { _id: { $nin: req.user.blocked_by } },
                    {
                        $or: [
                            { username: { $regex: term, $options: 'i' } },
                            { firstName: { $regex: term, $options: 'i' } },
                            { lastName: { $regex: term, $options: 'i' } },
                            { email: { $regex: term, $options: 'i' } }
                        ]
                    }
                ]
            })
                .limit(req.query.page_number)
                .skip((req.query.page_number - 1) * 3)
                .populate([
                    {
                        path: 'profile_picture',
                        model: 'ProfilePhoto',
                    } 
                ])

            if (users.length === 0 && req.query.page_number === 1) {
                const error = new Error('No users of the matching query found')
                error.status = 404;
                throw error;
            }
            if (users.length === 0) {
                const error = new Error('No more users found');
                error.status = 404;
                throw error;
            }
            return res.status(200).send(users);
        }
        catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            else return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    follow: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            const loggedInUser = await User.findOne({ _id: req.user._id });

            if (!user) {
                const error = new Error('This user does not exist');
                error.status = 404;
                throw error;
            }

            if (loggedInUser.follow_requests_sent_to.includes(user._id)) {
                const error = new Error('You have already sent a follow request to this user');
                error.status = 403;
                throw error;
            }

            if (loggedInUser.following.includes(user._id)) {
                const error = new Error('You already follow this user');
                error.status = 403;
                throw error;
            }

            if (user.private) {
                user.follow_requests_received_from.push(loggedInUser._id);
                loggedInUser.follow_requests_sent_to.push(user._id);
            } else {
                user.followers.push(loggedInUser._id);
                loggedInUser.following.push(user._id);
            }

            await user.save();
            await loggedInUser.save();

            return res.send(user);
        } catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            if (error.status === 403) return res.status(403).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    acceptFollowRequest: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            const loggedInUser = await User.findOne({ _id: req.user._id });

            if (!user) {
                const error = new Error('This user does not exist');
                error.status = 404;
                throw error;
            }

            if (!loggedInUser.follow_requests_received_from.includes(user._id)) {
                const error = new Error('You did not receive any follow request from this user');
                error.status = 404;
                throw error;
            }

            user.follow_requests_sent_to.pull(loggedInUser._id);
            loggedInUser.follow_requests_received_from.pull(user._id);
            loggedInUser.following.push(user._id);
            user.followers.push(loggedInUser._id);

            await user.save();
            await loggedInUser.save();

            return res.send(user);
        } catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    declineFollowRequest: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            const loggedInUser = await User.findOne({ _id: req.user._id });
            if(!user) {
                const error = new Error('This user does not exist');
                error.status = 404;
                throw error;
            }
            if(!loggedInUser.follow_requests_received_from.includes(user._id)) {
                const error = new Error('You did not receive any follow request from this user');
                error.status = 404;
                throw error;
            }

            user.follow_requests_sent_to.pull(loggedInUser._id);
            loggedInUser.follow_requests_received_from.pull(user._id);

            await user.save();
            await loggedInUser.save();

            return res.send(user);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    unfollow: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            const loggedInUser = await User.findOne({ _id: req.user._id });
            if(!user) {
                const error = new Error('This user does not exist');
                error.status = 404;
                throw error;
            }

            if(!loggedInUser.following.includes(user._id)) {
                const error = new Error('You do not follow this user');
                error.status = 404;
                throw error;
            }

            loggedInUser.following.pull(user._id);
            await loggedInUser.save();

            return res.send(user);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    cancelFollowRequest: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.params.id});
            const loggedInUser = await User.findOne({_id: req.user._id});

            if(!user) {
                const error = new Error('This user does not exist');
                error.status = 404;
                throw error;
            }

            if(!loggedInUser.follow_requests_sent_to.includes(user._id)) {
                const error = new Error('You did not send any follow request to this user previously');
                error.status = 404;
                throw error;
            }

            user.follow_requests_received_from.pull(loggedInUser._id);
            loggedInUser.follow_requests_send_to.pull(user._id);

            await user.save();
            await loggedInUser.save();

            return res.send(user);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    }
}