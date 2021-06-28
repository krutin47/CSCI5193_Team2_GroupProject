const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const User = require('../Models/user.model.js');

const UserServices = {

    fetchAllUser: () => {
        User.find()
          .then(user => res.json(user))
          .catch(err => res.status(400).json('Error: ' + err));
    },

    fetchUser: (userID) => {
        User.findById(userID)
            .then(user => {
                res.json(user)
                console.log(user);
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    
    login: () => {
        // Find user by email
        User.findOne({ email })
        .then(user => {
            
            // Check if user exists
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }      
            
            // Check password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
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
                            expiresIn: "7 days", // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                            });
                        }
                    );
                } else {
                    return res
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect" });
                }
            });
        });

    },

    createUser: () => {
        User.findOne({email})
        .then(user => {
            if(user) {
                res.json('Oops! Email id is already taken.');
            } else {
              // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (error_, hash) => {
                  if (error_) console.log(error_);
                  newUser.password = hash;
                  newUser.save()
                      .then(() => res.json('User added! => ' + newUser))
                      .catch(err => res.status(400).json('Error: ' + err));
                
                });
              });    
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },

    deleteUser: (userID) => {
        User.findByIdAndRemove(userID)
            .exec()
            .then(() => res.json('employee deleted.' + userID))
            .catch(err => res.status(400).json('Error: ' + err));
    },

    updateUser: (userID, userUpdates) => {
        User.findById(userID)
            .then((user) => {
                user.firstName = userUpdates.firstName;
                user.lastName = userUpdates.lastName;
                user.address = userUpdates.address;
                user.phone = Number(userUpdates.phone);
                user.gender = userUpdates.gender;

                user
                    .save()
                    .then(() =>
                        res.json("User details Updated! => " + user)
                    )
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    },
}

module.exports = UserServices;