const express = require('express');


const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const MW=require("../middleware/auth")


router.post("/authors",authorController.createAuthor)
router.post("/blog",MW.authentication, blogController.createBlog)
router.get("/detail",MW.authentication, blogController.blogDetails)
router.put("/blogs/:blogId",MW.authentication,MW.authorisation, blogController.updateBlog)
router.delete("/blogs/:blogId",MW.authentication,MW.authorisation, blogController.deleteBlog)
router.delete("/blogs",MW.authentication, blogController.deleteByQuery)
router.post("/log-in-author", authorController.logIn)



module.exports = router;