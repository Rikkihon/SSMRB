const User = require('../../../models/users');
const UserSession = require('../../../models/UserSession');
const router = require("express").Router();

router.route("/signup").post( (req, res, next) => {
  
  const { body } = req;
  console.log(body);

  const { password } = body;

  let { email, first, last, InstagramHandle, TwitterHandle, title, website, artistBio, LinkedIn, artistBoolean } = body;

  if (!email) {
    console.log("no email")
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }

  email = email.toLowerCase();
  email = email.trim();
  console.log(email);
  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find({
    email: email
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }

    // Save the new user
    const newUser = new User();

    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.first = first;
    newUser.last = last;

    console.log(newUser);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      console.log(res.success);
      return res.send({
        success: true,
        message: 'Signed up'
      });
    });
  });

});

router.route("/signin").post( (req, res, next) => {
  const { body } = req;
  const {
    password
  } = body;
  let {
    email
  } = body;


  if (!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find({
    email: email
  }, (err, users) => {
    if (err) {
      console.log('err 2:', err);
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
    if (users.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    const user = users[0];
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    // Otherwise correct user
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }

      return res.send({
        success: true,
        message: 'Valid sign in',
        token: doc._id
      });
    });
  });
});


router.route('/verify').get( (req, res, next) => {  

  // Get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  // Verify the token is one of a kind and it's not deleted.

  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }

    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    } else {
      return res.send({
        success: true,
        message: 'Good'
      });
    }
  });
});

router.route('/logout').get( (req, res, next) => {  

//     // Get the token
  const { query } = req;
  const { token } = query;
   //token=test

  // Verify the token is one of a kind and it's not deleted.

  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set: {
      isDeleted:true
    }
  }, null, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }

    return res.send({
      success: true,
      message: 'Good'
//we should try to send the user back to the main page here
    });
  });
});

module.exports = router;

