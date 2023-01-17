const publicCtrls = {};
const Publication = require("../models/PublicationModel");

publicCtrls.public = (req, res) => {
  res.status(200).send({
    message: "Public funcionando",
  });
};

// save publication
publicCtrls.save = (req, res) => {
  const { text, file } = req.body;

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
    if(error || !publicationStorage) {
        return res.status(404).json({
            status: "Error",
            message: "Publication not found or not exists"
        })
    }
    res.status(200).json({
        status: "Success",
        message: "Publication retrieved",
        publication: publicationStorage
    })
  });
};
// delete publication
// upload file
// return file
// list all publication
// list a user publication (one)

module.exports = publicCtrls;
