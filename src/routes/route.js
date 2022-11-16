const express = require('express');


const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware=require("../middleware/auth")


router.post("/authors",authorController.createAuthor)
router.post("/blog",middleware.auth1, blogController.createBlog)
router.get("/detail",middleware.auth1, blogController.blogDetails)
router.put("/blogs/:blogId",middleware.auth1, middleware.auth2, blogController.updateBlog)
router.delete("/blogs/:blogId",middleware.auth1, middleware.auth2, blogController.deleteBlog)
router.delete("/blogs",middleware.auth1, blogController.deleteByQuery)
router.post("/log-in-author", authorController.logIn)



module.exports = router;