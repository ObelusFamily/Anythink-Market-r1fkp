const { stringIsAValidUrl } = require("../utils/urlValidator")

const validateImg = (req, res, next) => {
    if (!stringIsAValidUrl(req.body.item.image)) {
        req.body.item.image = "/placeholder.png"
    }
    next()
}

module.exports = { validateImg }
