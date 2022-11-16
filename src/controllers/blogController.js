const blogModel = require("../models/blogModel")


const Valid = require("../validator/validator")
const {isValidObjectId} = require("mongoose")

const authorModel = require("../models/authorModel")

const createBlog = async function(req,res){
    try{  
        const requestBody  = req.body
        const Id = req.body.authorId
        
        const { title,authorId ,body,tags,  category , subcategory } = requestBody

        if(!Valid.isValidRequestBody(requestBody)){
            return res.status(400).send({status:false,msg:" Pls Provide requestBody"})
        }
        if(!Valid.isValid(title)){
            return res.status(400).send({status:false,msg:" Pls Provide title for blog"})
        }
        if(!isValidObjectId(Id)){
            return res.status(400).send({status:false,msg:" Pls provide Valid author Id"})
        }
        if(!Valid.isValid(body)){
            return res.status(400).send({status:false,msg:" Pls Provide body"})
        }
       
        if(!Valid.isValid(tags)){
            return res.status(400).send({status:false,msg:"Pls provide tags"})
        }
        if(!Valid.isValid(category)){
            return res.status(400).send({status:false,msg:"pls provide category of Blog"})
        }
        if(!Valid.isValid(subcategory)){
            return res.status(400).send({status:false,msg:"pls provide subcategory of Blog"})
        }
        
        if(!Valid.isValid(authorId)){
            return res.status(400).send({status:false,msg:" Pls provide author Id"})
        }
        
        const validId = await authorModel.findById(Id)
        
        if (validId) {
            const blogCreated = await blogModel.create(requestBody)
            return res.status(201).send({ status: true, msg: 'blog created succesfully ', data: blogCreated })

        } else { res.status(400).send({ statusbar: false, msg: 'invalid authorid' }) }
    }

    catch(err){

     return res.status(500).send({status:false,msg:err.msg })

    }
} 


const blogDetails = async function (req, res) {
    try {
        const data = req.query
        const {authorId,category,tags,subcategory}=data
    if(authorId){
        if(!isValidObjectId(authorId)){
        return res.status(400).send({status:false,msg:"provide valid id"})
    }
}

        const blogs = await blogModel.find({$and : [data, { isDeleted: false }, { isPublished: true }]}).populate("authorId")
        if (blogs.length == 0) {
            return res.status(404).send({ status: false, msg: "No blogs Available." })
        }
        return res.status(200).send({ status: true,count:blogs.length, data: blogs });
    }

     catch (error) {
        return res.status(500).send({ status: false, msg: error.message});
    }
}


const deleteByQuery= async function(req,res){
 try
    {  
     const data=req.query 
     const decodedToken=req.decodedToken
   const {category, authorId, tags, subcategory,isPublished}=data
   if(Object.keys(data).length==0){
    return res.status(400).send({status:false,msg:"no data is provided"})
   }
   if(isPublished==true){
    return res.status(400).send({status:false,msg:"blog is published"})
   }
    if(!authorId){
        const blogData=await blogModel.find(req.query)
        for(let i=0;i<blogData.length;i++){
            if(blogData[i].authorId=decodedToken.authorId){
             const deleteBlog=await blogModel.updateOne({authorId:blogData[i].authorId}, {isDeleted:true,deletedAt:new Date()},
             {new:true}
             )
             if(!deleteBlog){
                return res.status(404).send({status:false,msg:"blog not found"}) 
             }
             return res.status(200).send({status:true,msg:deleteBlog})
            }
        }}

   const deletedBlogs=await blogModel.updateMany(
    data,
   {isDeleted:true,deletedAt:new Date()},
   {new:true}
    )
    if(!deletedBlogs){
        return res.status(404).send({status:false,msg:"blog not found"})
    }
    return res.status(200).send({status:true,msg:deletedBlogs})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}


//============================================delete blog by path param ==============================================================
const deleteBlog = async function (req,res) {

    try{

        let blogId =req.params.blogId
        let blog=await blogModel.findById(blogId)
        if(blog){  
            if(blog.isDeleted==false)    {
                   let deleteBlog=await blogModel.findByIdAndUpdate({_id:blogId},{$set:{isDeleted:true}},{new: true})
        res.status(200).send({status:true, msg: deleteBlog})
        if(!deleteBlog) res.status(404).send({status:false, msg:"Blogs are not found"})
    }
    else{
        return res.status(400).send({status:false,msg:"blog is already deleted"})
    }
    }
    else{
        return res.status(400).send({status:false,msg:"blog id is not present"})
    }
}
    catch(error){res.status(500).send({msg:error})
    console.log({msg: error})
}};




//------------------------------------------putApi----------------------------

const updateBlog = async function (req, res) {

    try {
           const blogId = req.params.blogId
           const checkId = await blogModel.findById(blogId)
           if(checkId ){
            if(checkId.isDeleted==false){
              const requestBody=req.body
           const {title, body, tags, subcategory ,isPublished}= requestBody
           if (!Valid.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })
        }
        if (!Valid.isValid(title)) {
            return res.status(400).send({ status: false, msg: " Pls Provide title for blog" })
        }
        if (!Valid.isValid(body)) {
            return res.status(400).send({ status: false, msg: "Body is Mandtory" })
        }
        if (!Valid.isValid(tags)) {
            return res.status(400).send({ status: false, msg: "Pls provide tags of blog" })
        }
        if (!Valid.isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: "Pls provide subCategory of blog" })
        }
        if (!Valid.isValid(isPublished)) {
            return res.status(400).send({ status: false, msg: "Pls provide  blog is published or not " })
        }

        let savedData= await blogModel.findOneAndUpdate({_id:blogId},{ $set: { "title": req.body.title, "body": req.body.body, "category": req.body.category ,isPublished:true},
        $push: { "tags": req.body.tags, "subcategory": req.body.subcategory } }
        ,{new:true})

        res.status(200).send({status:true,msg:"blog updated successfuly",data:savedData})
    }
    else{
        return res.status(404).send({status:false,msg:"Id is deleted"})
    }
    }else{
        return res.status(404).send({status:false,msg:"blog id does not exist "})
    }

    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})

    }



}



module.exports={createBlog,blogDetails,updateBlog,deleteBlog,deleteByQuery}






