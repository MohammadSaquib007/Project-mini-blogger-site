const authorModel=require("../models/authorModel")
const blogModel=require("../models/blogModel")
const jwt=require("jsonwebtoken")

const auth1 = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: " token must be present for authentication " })

        jwt.verify(token, "project-blog-secret-key", function (err, decodedToken) {
            if (err) {
                return res.status(400).send({ status: false, msg: "token invalid" });
            } 
            // if(Date.now()>decodedToken.exp*1000) {
            //     return res.status(400).send({ status: false, msg: "token expired" });
            // }
                req.decodedToken = decodedToken
                next() 
        })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



const auth2=async function(req,res,next){
try{ 
       const blogId=req.param.blogId
    const token=req.headers["x-api-key"]
    const decodedToken=jwt.verify(token,"project-blog-secret-key")
        const blog=await blogModel.findById(blogId)
        const authorid=blog.authorId
        if(decodedToken.authorId==authorid){
            next()
        }
        else{
            return res.status(401).send({status:false,msg:"token does not match"})
        }
    }
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}



module.exports={
    auth1,auth2
}