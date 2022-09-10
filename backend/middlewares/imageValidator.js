const { stringIsAValidUrl } = require("../utils/urlValidator")

const validateImg = (req, res, next) => {
    if (!stringIsAValidUrl(req.body.item.image)) {
        req.body.item.image = null
    }
    next()
}

module.exports = { validateImg }
