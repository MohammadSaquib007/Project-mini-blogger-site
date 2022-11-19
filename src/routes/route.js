const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const MW = require("../middleware/auth")

router.post("/authors",authorController.createAuthor)
router.post("/login",authorController.login)
router.post("/blogs",MW.authentication,blogController.createBlog)
router.get("/blogs",MW.authentication,blogController.getBlog)
router.put("/blogs/:blogId",MW.authentication,MW.authorisation,blogController.updateBlog)
router.delete("/blogs/:blogId",MW.authentication,MW.authorisation,blogController.deleteBlog)
router.delete("/blogs",MW.authentication,blogController.deleteByQuery)



module.exports = router;
