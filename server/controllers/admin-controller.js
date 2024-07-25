import User from "../models/user-model.js"
import Contact from "../models/contact-model.js"


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(400).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error); 
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error); 
    }
};

export const updateUserById = async (req, res) => {
    try {
        const id  = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, {$set: updateUserData});
        return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        next(error)
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const id  = req.params.id;
        await User.deleteOne({ _id: id });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error)
    }
};

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(400).json({ message: "No contacts found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error); 
    }
};


export const deleteContactById = async (req, res) => {
    try {
        const id  = req.params.id;
        await Contact.deleteOne({ _id: id });
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        next(error)
    }
};


