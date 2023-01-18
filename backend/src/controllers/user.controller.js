const userCtrls = {};
const bycrypt = require("bcrypt");
const User = require("../models/UserModel");
const Publication = require("../models/PublicationModel")
const Follow = require("../models/FollowModel")
const path = require("path");
const fs = require("fs");

// helper token
const { tokenGenerator } = require("../helpers/jwt");
// helper follow
const { IdServices, followThisUser } = require("../helpers/followServices");

userCtrls.userpueba = (req, res) => {
  res.status(200).send({
    message: "funciona user",
    user: req.user,
  });
};

//      SINGUP
userCtrls.signup = async (req, res) => {
  const errors = [];
  //    get data from req
  let { name, username, email, password, confirm_password } = req.body;
  //    check the data
  if (!name || !username || !email || !password) {
    return res
      .status(400)
      .json({ status: "Error 404", message: "Missing credentials" });
  }
  //    check match password
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match" });
  }
  //    check password has more 4 charter
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.status(400).json({
      errors,
      name,
      username,
      email,
      password,
      confirm_password,
    });
    return;
  }
  //    duplicates user control
  User.find({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  }).exec(async (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "Error", message: "Error while saving user" });
    }
    if (user && user.length >= 1) {
      return res.status(200).send({
        status: "Success",
        message: "User already exists",
      });
    }
    const userSave = new User({ name, username, email, password });
    //   password encryption
    userSave.password = await bycrypt.hash(password, 10);
    //   save user to database
    userSave.save((err, userStored) => {
      if (err || !userStored) {
        return res
          .status(500)
          .send({ status: "Error", message: "Error while saving user" });
      }
      //   return data
      res.status(200).json({
        status: "Success",
        message: "Register successfully",
        user: userStored,
      });
    });
  });
};

// signin controller
userCtrls.signin = async (req, res) => {
  // Get params from body
  const { username, email, password } = req.body;
  // Search on the database
  if (email && password) {
    if (!email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Missing credentials (email)",
      });
    }
    User.findOne({ email: email.toLowerCase() })
      // .select({ "password": 0 })
      .exec((err, user) => {
        if (err || !user) {
          return res
            .status(404)
            .json({ status: "Error", message: "Email not found" });
        }
        // Check password
        const pwd = bycrypt.compareSync(password, user.password);
        if (!pwd) {
          return res.status(400).json({
            status: "Error",
            message: "Password incorrect",
          });
        }
        // Token
        // Return User data
        res.status(200).json({
          status: "Success",
          message: "Signin successfully",
          user: { id: user._id, name: user.name, username: user.email },
        });
      });
  } else if (!email) {
    if (!username || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Missing credentials (username)",
      });
    }
    User.findOne({ username: username.toLowerCase() })
      // .select({ "password": 0 })
      .exec((err, user) => {
        if (err || !user) {
          return res
            .status(404)
            .json({ status: "Error", message: "Username not found" });
        }
        // Check password
        const pwd = bycrypt.compareSync(password, user.password);
        if (!pwd) {
          return res.status(400).json({
            status: "Error",
            message: "Password incorrect",
          });
        }
        // Token
        const token = tokenGenerator(user);
        // Return User data
        res.status(200).json({
          status: "Success",
          message: "Signin successfully",
          user: { id: user._id, name: user.name, username: user.username },
          token,
        });
      });
  }
};

userCtrls.getOneProfile = (req, res) => {
  // receive id
  const id = req.params.id;
  // get data from database
  User.findById(id)
    .select({ password: 0, role: 0 })
    .exec(async (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          status: "Error",
          message: "User not found or something went wrong",
        });
      }
      const followInfo = await followThisUser(req.user.id, id);
      res.status(200).json({
        status: "Success",
        user: user,
        following: followInfo.followings,
        followed: followInfo.follower,
      });
    });
};

userCtrls.userList = (req, res) => {
  const userId = req.user.id;
  // controls page
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  page = parseInt(page);
  // ask with mongoose pagination
  let itemsPerPage = 5;
  User.find()
    .select({ password: 0, email: 0 , __v: 0  })
    .sort("_id")
    .paginate(page, itemsPerPage, async (error, users, total) => {
      if (error || !users) {
        res.status(404).json({
          status: "Error",
          message: "No users found",
          error,
        });
      }
      const followUserIds = await IdServices(userId);
      // return result
      res.status(200).json({
        status: "Success",
        users,
        page,
        itemsPerPage,
        total,
        pages: Math.ceil(total / itemsPerPage),
        user_following: followUserIds.followings,
        user_follow_me: followUserIds.followers,
      });
    });
};

userCtrls.updateProfile = (req, res) => {
  // get user data to update profile
  const userIdentity = req.user;
  let userToUpdate = req.body;

  delete userIdentity.password;
  delete userIdentity.role;
  delete userIdentity.iat;
  delete userIdentity.exp;

  // check if user already exists
  User.find({
    $or: [
      { email: userToUpdate.email.toLowerCase() },
      { username: userToUpdate.username.toLowerCase() },
    ],
  }).exec(async (error, users) => {
    if (error) {
      return res.status(500).json({
        status: "Error",
        message: "Error on the request",
      });
    }
    let userIsset = false;
    users.forEach((user) => {
      if (user && user._id != userIdentity.id) userIsset = true;
    });
    if (userIsset) {
      return res.status(200).json({
        status: "Success",
        message: "User already exists",
      });
    }
    if(userToUpdate.email === '' || userToUpdate.username === null){
      delete userToUpdate.email
    }
    if(userToUpdate.username === '' || userToUpdate.username === null){
      delete userToUpdate.username
    }

    // if get the password encryted
    if (userToUpdate.password) {
      let pwd = await bycrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = pwd;
    }else{
      delete userToUpdate.password;
    }
    try {
      let userUpdated = await User.findByIdAndUpdate(
        userIdentity.id,
        userToUpdate,
        {
          new: true,
        }
      );
      if (!userUpdated) {
        return res.status(400).json({
          status: "Error",
          message: "Error on updating",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "update",
        user: userUpdated,
      });
    } catch {
      return res.status(500).json({
        status: "Error",
        message: "Error on updating",
        error,
      });
    }
  });
};

userCtrls.imageProfile = (req, res) => {
  // get file and check if it exists
  if (!req.file) {
    return res.status(404).json({
      status: "Error",
      message: "File not found, please try again, including a image",
    });
  }
  // get image name
  const images = req.file.originalname;
  // get extension
  const imageSplit = images.split(".");
  const imageExt = imageSplit[1];
  // check the image's extension
  if (
    imageExt != "jpg" &&
    imageExt != "png" &&
    imageExt != "jpeg" &&
    imageExt != "gif"
  ) {
    // delete file
    const fileToDelete = req.file.path;
    const fileDeleted = fs.unlinkSync(fileToDelete);
    // return message
    return res.status(400).json({
      status: "Error",
      message: `Extension (.${imageExt}) not valid or file not valid, please try again`,
      fileName: images,
    });
  }
  // if the file is valid, update the image on database
  // get the data user
  const { id, image } = req.user;
  const { filename } = req.file;
  User.findByIdAndUpdate(
    id,
    { image: filename },
    { new: true },
    (err, userImageProfile) => {
      if (err || !userImageProfile) {
        return res.status(500).json({
          status: "Error",
          message: "Upload error occurred",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "update image profile success",
        user: userImageProfile,
        file: req.file,
      });
    }
  );
};

userCtrls.showAvatar = (req, res) => {
  // get params from url
  const file = req.params.file;
  // mount path of image
  const imagePath = path.join(__dirname, "../uploads/avatars/" + file);
  // check if exists
  fs.stat(imagePath, (err, exists) => {
    if (!exists) {
      return res.status(404).json({
        status: "Error",
        message: "Image not found",
      });
    }
    // return the file

    res.sendFile(imagePath);
  });
};

userCtrls.counter = async(req, res) => {
  let userId = req.user
  if(req.params.id){
    userId = req.params.id
  }
  try{
    const following = await Follow.count({"user": userId})
    const followed = await Follow.count({"user": userId})
    const publications = await Publication.count({"user": userId})

    return res.status(200).json({
      status: "Success",
      user: userId,
      following: following,
      followed: followed,
      publications
    })
  }catch(err) {
    return res.status(500).json({
      status: "Error",
      message: "Failed to get user"
    })
  }
}
module.exports = userCtrls;
