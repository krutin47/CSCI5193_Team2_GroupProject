/**
 * @file API for Profile management for the Application.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

  const router = require('express').Router();

  const UserService = require("../../services/user.service.js");

  //Fetch all users
  router.get('/', 
    async (req, res) => {
      const allUsers = await UserService.fetchAllUsers();
      return res.json({ allUsers });
  });

  //Fetch specific users
  router.get('/:id', 
    async (req, res) => {

      //Validation
      if (typeof req.params.id == 'undefined' && req.params.id.length < 0) { throw err; }
       
      const specificUser = await UserService.fetchUser(req.params.id);
      return res.json({ specificUser });
  });
  
  //Delete specific users
  router.delete('/:id', 
    async (req, res) => {

      //Validation
      if (typeof req.params.id == 'undefined' && req.params.id.length < 0) { throw err; }
       
      const deleteSpecificUser = await UserService.deleteUser(req.params.id);
      return res.json({ deleteSpecificUser });
  });
  
  //Login a users
  router.post('/login', 
    async (req, res) => {

      //Validation
      if (typeof req.body.email == 'undefined' && req.body.email.length < 0) { throw err; }
      if (typeof req.body.password == 'undefined' && req.body.password.length < 0) { throw err; }

      const allUsers = await UserService.fetchAllUsers();
      return res.json({ allUsers });
  });

  //Sign-up a users
  router.post('/create', 
    async (req, res) => {

      //Validation
      if (typeof req.body.firstName == 'undefined' && req.body.firstName.length < 0) { throw err; }
      if (typeof req.body.lastName == 'undefined' && req.body.lastName.length < 0) { throw err; }
      if (typeof req.body.email == 'undefined' && req.body.email.length < 0) { throw err; }
      if (typeof req.body.password == 'undefined' && req.body.password.length < 0) { throw err; }

      //for better readibility in creating a User object
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const password = req.body.password;
      const role = 1;
      const address = '';
      const phone = Number(0000000000);
      const gender = '';

      const newUser = new User({ 
        firstName,
        lastName,
        email,
        password,
        role,
        address,
        phone,
        gender,
      });

      const newUsers = await UserService.createUser(newUser);
      return res.json({ newUsers });
  });

  //Fetch all users
  router.post('/update', 
    async (req, res) => {

      //Validation
      if (typeof req.body.id == 'undefined' && req.body.id.length < 0) { throw err; }
      if (typeof req.body.firstName == 'undefined' && req.body.firstName.length < 0) { throw err; }
      if (typeof req.body.lastName == 'undefined' && req.body.lastName.length < 0) { throw err; }
      if (typeof req.body.address == 'undefined' && req.body.address.length < 0) { throw err; }
      if (typeof req.body.phone === NaN && req.body.address.length < 0) { throw err; }
      if (typeof req.body.gender == 'undefined' && req.body.gender.length < 0) { throw err; }      
      
      //for better readibility in creating a User object
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const address = req.body.address;
      const phone = req.body.phone;
      const gender = req.body.gender;

      const updateUser = { 
        firstName,
        lastName,
        address,
        phone,
        gender,
      };

      const updatedUser = await UserService.updateUser(req.body.id, updateUser)
      return res.json({ updatedUser })
  });

  module.exports = router;