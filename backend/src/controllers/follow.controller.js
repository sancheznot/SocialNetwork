const followCtrls = {}

followCtrls.follow = (req, res, next) => {
    res.status(200).send({
        message: 'Funcionando los follow'
    })
}

module.exports = followCtrls