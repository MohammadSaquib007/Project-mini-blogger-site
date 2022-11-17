const blogModel = require("../models/blogModel")
const jwt = require("jsonwebtoken")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: " token must be present for authentication " })

        jwt.verify(token, "project-blog-secret-key", function (err, decodedToken) {
            if (err) {
                return res.status(400).send({ status: false, msg: "token invalid" });
            }
            req.decodedToken = decodedToken
            next()
        })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



const authorisation = async function (req, res, next) {
    try {
        const blogId = req.params.blogId
        const decodedToken = req.decodedToken
        const blog = await blogModel.findById(blogId)
        const authorid = blog.authorId
        if (decodedToken.authorId == authorid) {
            next()
        }
        else {
            return res.status(401).send({ status: false, msg: "token does not match" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports = {
    authentication, authorisation
}