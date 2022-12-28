const publicCtrls = {};

publicCtrls.public = (req ,res) => {
    res.status(200).send({
        message: 'Public funcionando'
    })
}

module.exports = publicCtrls