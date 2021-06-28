const bcrypt = require("./bcrypt.service.js");
const jwt = require("jsonwebtoken");
//const keys = require("../config/keys");

const User = require("../Models/user.model.js");

const UserServices = {
    fetchAllUser: async () => {
        try {
            let user = await User.find()
    
            if (user) {
                return { 
                    sucess: true, 
                    users: user 
                };
            } else {
                return { 
                    sucess: false, 
                    err: err 
                };
            }
        } catch (error) {
            throw error;
        }
    },

    fetchUser: async (userID) => {   
        try {

            let user = await User.findById(userID);

            if (user) {
                return { 
                    sucess: true, 
                    user: user 
                };
            } else {
                console.log("🚀 ~ file: user.service.js ~ line 41 ~ fetchUser: ~ else", error)
                return { 
                    sucess: false, 
                    err: err 
                };
            }
        } catch (error) {
            console.log("🚀 ~ file: user.service.js ~ line 57 ~ fetchUser: ~ error", error)
            throw error;
        }
    },

    login: async () => {      
        try {
            // Find user by email
            let user = await User.findById(userID);

            // Check if user exists
            if (!user) {
                return { 
                    sucess: false, 
                    err: "Error: Email not found"
                };
            }

            try {
                let isValid = await bcrypt.validate(password, user.password);

                if (isValid) {
                    // User matched
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    };

                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: "7 days",
                        },
                        (err, token) => {
                            if (err) {
                                return { sucess: false, err: err };
                            }
                            return {
                                success: true,
                                token: "Bearer " + token,
                            };
                        }
                    );
                } else {
                    return { success: false, err: "Password incorrect" };
                }
                
            } catch (error) {
                throw error;
            }
        } catch (error) {
            console.log("🚀 ~ file: user.service.js ~ line 103 ~ login: ~ error", error)
            throw error;
        }
    },

    createUser: async (newUserData) => {
        
        //Validation
        if (typeof newUserData == "undefined" && newUserData !== null) {
            throw new Error('user data is empty or bad, will not be able create new user!!');
        }
        if (
            Object.keys(newUserData).length === 0 &&
            newUserData.constructor === Object
        ) {
            throw new Error('user data is empty or bad, will not be able create new user!!');
        }

        const newUser = new User({
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password: newUserData.password,
            role: newUserData.role,
            address: newUserData.address,
            phone: newUserData.phone,
            gender: newUserData.gender,
        });
        console.log("🚀 ~ file: user.service.js ~ line 94 ~ newUser", newUser)

        try {
            let foundUser = await User.findOne({ email: newUser.email })

            if(foundUser){
                console.log("🚀 ~ file: user.service.js ~ line 99 ~ .then ~ user", foundUser)
                return {
                    sucess: false,
                    err: "Oops! Email id is already taken.",
                };
            } else {
                try{
                    
                    newUser.password = bcrypt.hash(newUser.password);
                    
                    let newCreatedUser = await newUser.save()
                    
                    if(newCreatedUser){
                        console.log("🚀 ~ file: user.service.js ~ line 123 ~ .then ~ return");
                        return {
                            sucess: true,
                            msg: newCreatedUser,
                        };
                    } else {
                        return {
                            sucess: false,
                            err: "System was not able to create a new record.",
                        };
                    }

                } catch(error) {
                    throw error;
                }
            }
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (userID) => {
        try {
            let user = await User.findByIdAndRemove(userID).exec();
    
            if (user) {
                return { 
                    sucess: true,
                    msg: "User deleted. =>",
                    user: user 
                };
            } else {
                return { 
                    sucess: false, 
                    err: "No user found with this specified _ID, Aborting update." 
                };
            }
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userID, userUpdates) => {
        
        userID = '60d991c930a002320c1099ab';
        //Validation
        if (typeof userUpdates == "undefined" && userUpdates !== null) {
            throw new Error('user data is empty or bad, will not be able update the user!!');
        }
        if (
            Object.keys(userUpdates).length === 0 &&
            userUpdates.constructor === Object
        ) {
            throw new Error('user data is empty or bad, will not be able update the user!!');
        }
        if (typeof userID == "undefined" && userID !== null) {
            throw new Error('user _ID is empty or bad, will not be able update the user!!');
        }
        
        try {
            let user = await User.findById(userID);
    
            if (user) {
                user.firstName = userUpdates.firstName;
                user.lastName = userUpdates.lastName;
                user.address = userUpdates.address;
                user.phone = Number(userUpdates.phone);
                user.gender = userUpdates.gender;

                try {
                    let newUser = await user.save();

                    if (newUser){
                        return {
                            sucess: true,
                            msg: "User details Updated! => ",
                            user: user,
                        };
                    } else {
                        return { 
                            sucess: false, 
                            err: "Will never reach else but added as a debug point, Aborting update."
                        };
                    }
                } catch (error) {
                    throw error;
                }
            
            } else {
                return { 
                    sucess: false, 
                    err: "No user found with this specified _ID, Aborting update." 
                };
            }
        } catch (error) {
            throw error;
        }
    },
};

module.exports = UserServices;
