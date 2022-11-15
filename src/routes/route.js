const express = require('express');


const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController=require("../controllers/blogController")


router.post("/authors",authorController.createAuthor)
router.post("/blog",blogController.createBlog)
router.get("/detail",blogController.blogDetails)
router.put("/blogs/:blogId",blogController.updateBlog)


router.delete("/blogs/:blogId",blogController.deleteBlog)

router.delete("/blogs",blogController.deleteByQuery)



module.exports = router;