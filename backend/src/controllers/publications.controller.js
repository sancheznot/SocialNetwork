const publicCtrls = {};
const Publication = require("../models/PublicationModel");
const path = require("path");
const fs = require("fs");

// helper follow
const { IdServices, followThisUser } = require("../helpers/followServices");

publicCtrls.public = (req, res) => {
  res.status(200).send({
    message: "Public funcionando",
  });
};

// save publication
publicCtrls.save = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      status: "Error",
      message: "You need write something",
    });
  }
  let newPublication = new Publication({ text });
  newPublication.user = req.user.id;
  newPublication.save((error, newPublicationStorage) => {
    if (error || !newPublicationStorage) {
      return res.status(400).json({
        status: "Error",
        message: "Error saving publication",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Publication Posted",
      publication: newPublicationStorage,
    });
  });
};
// get a publication
publicCtrls.getPublication = (req, res) => {
  // get id via params
  const publicID = req.params.id;
  // find on database
  Publication.findById(publicID, (error, publicationStorage) => {
    if (error || !publicationStorage) {
      return res.status(404).json({
        status: "Error",
        message: "Publication not found or not exists",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Publication retrieved",
      publication: publicationStorage,
    });
  });
};
// delete publication
publicCtrls.deletePublication = (req, res) => {
  const publicID = req.params.id;
  // find on database
  Publication.find({ user: req.user.id, _id: publicID }).deleteOne((error) => {
    if (error || !req.user.id) {
      return res.status(500).json({
        status: "Error",
        message: "Publication can't delete  ",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Publication deleted",
      publication: publicID,
      
    });
    
  });
};

// list a user publication (one)
publicCtrls.getOnePublicationUser = (req, res) => {
  // get user id
  const userID = req.params.id;
  // page
  let page = 1;
  if (req.params.page) page = req.params.page;
  const itemsPerPage = 999999;

  Publication.find({ user: userID })
    .sort("-created_At")
    .populate("user", "-password -__v -role -email")
    .paginate(page, itemsPerPage, (error, publication, total) => {
      if (error || !publication || !userID) {
        return res.status(404).json({
          status: "Error",
          message: "Publication can't find",
        });
      }
      if (publication.length <= 0) {
        return res.status(200).json({
          status: "Success",
          message: "You don't have any publication",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Publication user",
        page: page,
        total,
        pages: Math.ceil(total / itemsPerPage),
        publication: publication,
      });
      
    });
};
// upload file
publicCtrls.uploadFile = (req, res) => {
  const publicationID = req.params.id;
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
  const { id } = req.user;
  const { filename } = req.file;
  Publication.findOneAndUpdate(
    { user: id, _id: publicationID },
    { file: filename },
    { new: true },
    (err, publicationUpdate) => {
      if (err || !publicationUpdate) {
        return res.status(500).json({
          status: "Error",
          message: "Upload error occurred",
        });
      }
      res.status(200).json({ 
        status: "Success",
        message: "Publication Posted with image",
        publication: publicationUpdate,
        file: req.file,
      });
    }
  );
};
// return file
publicCtrls.media = (req, res) => {
  // get params from url
  const file = req.params.file;
  // mount path of image
  const imagePath = path.join(__dirname, "../uploads/publication/" + file);
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
// list all publication (FEED)
publicCtrls.feed = async (req, res) => {
  // page
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  // set max per page
  const itemsPerPage = 20;
  // get user array I follow
  try {
    const myFollow = await IdServices(req.user.id);

    Publication.find({
      user: myFollow.followings,
    })
      .sort("-created_At")
      .populate("user", "-password -__v ")
      .paginate(page, itemsPerPage, (err, publication, total) => {
        if (err || !publication) {
          return res.status(404).json({
            status: "Error",
            message: "No publication",
          });
        }
        res.status(200).json({
          status: "Success",
          message: "Feed",
          page,
          total,
          publication,
          pages: Math.ceil(total / itemsPerPage),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: "Not list user",
    });
  }
};

module.exports = publicCtrls;
