const Follow = require("../models/FollowModel");
const followHelpers = {};

followHelpers.IdServices = async (identityUserId) => {
  try {
    // get id's
    let followings = await Follow.find({ user: identityUserId })
      .select({ followed: 1, _id: 0 })
      .exec();

    let followers = await Follow.find({ followed: identityUserId })
      .select({ user: 1, _id: 0 })
      .exec();

    // clean array
    let followingClean = [];
    followings.forEach((follow) => {
      followingClean.push(follow.followed);
    });
    let followersClean = [];
    followers.forEach((follow) => {
      followersClean.push(follow.user);
    });

    return {
      followings: followingClean,
      followers: followersClean,
    };
  } catch (err) {
    return {};
  }
};

followHelpers.followThisUser = async (identityUserId, profileIdUser) => {
    try{
        let followings = await Follow.findOne({ user: identityUserId, followed: profileIdUser })

        let follower = await Follow.findOne({user: profileIdUser, followed: identityUserId})

        return {
            followings,
            follower
        }
    }
    catch(err) {
        return {};
    }

};

module.exports = followHelpers;
