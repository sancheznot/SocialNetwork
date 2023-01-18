const followCtrls = {};
const Follow = require("../models/FollowModel");
const User = require("../models/UserModel");
// const { populate } = require("../models/FollowModel");

// Import helpers
const { IdServices } = require("../helpers/followServices");

followCtrls.follow = (req, res, next) => {
  res.status(200).send({
    message: "Funcionando los follow",
  });
};

// funtion save follow
followCtrls.saveFollower = (req, res) => {
  // get body data
  const { followed } = req.body;
  // get id of user
  const { id } = req.user;
  // create a object with following
  const userToFollow = new Follow({
    user: id,
    followed,
  });
  userToFollow.save((err, followedSave) => {
    if (err || !followedSave) {
      res
        .status(200)
        .json({ status: "Error", message: "Can't follow the user" });
    }

    res.status(200).json({
      status: "success",
      message: "save follow",
      followedSave,
    });
  });
};
// funtion delete follow
followCtrls.deleteFollower = (req, res) => {
  // get id user
  const { id } = req.user;
  // get id of followed user
  const followedID = req.params.id;
  // find on database
  Follow.find({
    user: id,
    followed: followedID,
  }).deleteOne((err, followInStorage) => {
    if (err || !followInStorage) {
      return res.status(500).json({
        status: "Error",
        message: "You did not unfollow the user",
      });
    }
    if (followInStorage.deletedCount <= 0) {
      return res.status(200).json({
        status: "success",
        message: "You don't follow this user",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You have unfollowed this user",
      followInStorage,
    });
  });
};

// funtion get list of following - I follow
followCtrls.following = (req, res) => {
  // get user id with token
  let userId = req.user.id;
  // get id via params
  if (req.params.id) userId = req.params.id;
  // check if get the page
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  // user per page
  itemsPerPage = 10;
  // find follow on database
  Follow.find({ user: userId })
    .populate("user followed", "-password -role -__v -email")
    .paginate(page, itemsPerPage, async (error, followInStorage, total) => {
      // array user following to me
      const followUserIds = await IdServices(userId);

      res.status(200).json({
        status: "success",
        message: "List the user following",
        followInStorage,
        total,
        page: Math.ceil(total / itemsPerPage),
        user_following: followUserIds.followings,
        user_follow_me: followUserIds.followers,
      });
    });
};

// funtion get list of followers - my followers
followCtrls.followers = (req, res) => {
  // get user id with token
  let userId = req.user.id;
  // get id via params
  if (req.params.id) userId = req.params.id;
  // check if get the page
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  // user per page
  itemsPerPage = 10;
  // find follow on database
  Follow.find({ followed: userId })
    .populate("user", "-password -role -__v -email")
    .paginate(page, itemsPerPage, async (error, followInStorage, total) => {
      // array user followed 
      const followUserIds = await IdServices(userId);

      res.status(200).json({
        status: "success",
        message: "List the user followed",
        followInStorage,
        total,
        page: Math.ceil(total / itemsPerPage),
        user_following: followUserIds.followings,
        user_follow_me: followUserIds.followers,
      });
    });
 
};

module.exports = followCtrls;
