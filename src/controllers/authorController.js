let authorModel = require("../models/authorModel")
let valid = require("../validator/validator")
let jwt=require("jsonwebtoken")


let createAuthor = async function (req, res) {
    let Data = req.body
    const { fname , lname , title , email , password } = Data
   
    const objKey = Object.keys(Data).length
    try {

 //-----------------------Data in body || not---------------------------------

        if (objKey === 0)
         { return res.satus(400).send({ status: false, msg: "No Data in Body" }) }

 //-----------------------All varibles valibation-------------------------------

        if (!fname) 
        { return res.status(400).send({ status: false, msg: "fname is required" }) }

        if(valid.isValidName(fname)){
            return res.status(400).send({status: false, msg: "fname is not valid"})
            }

        if (!lname)
        { return res.status(400).send({ status: false, msg: "Lname is required"}) }

        if(valid.isValidName(lname)){
            return res.status(400).send({status: false, msg: "lname is not valid"})
            }

        if (!title) 
        { return res.status(400).send({ status: false, msg: "Title is required" }) }

        if (!email) 
        { return res.status(400).send({ status: false, msg: "Email is required" }) }

        if (!password) 
        { return res.status(400).send({ status: false, msg: "Password is required" }) }
        if(!valid.checkPassword(password)){
            return res.status(400).send({status:false,msg:"please provide valid password"})
        }

        //--------------------- Email validation --------------------------

        if(!valid.isvalidemail(email)){
            return res.status(400).send({status:false,msg:"please enter valid email"})
        }
        const isEmailAlreadyused = await authorModel.findOne({ email: email })
        if (isEmailAlreadyused)
         { return res.status(400).send({ status: false, msg: 'Email is already used' }) }

        
            let createAuthor = await authorModel.create(Data)
            res.status(201).send({ status: true, msg: createAuthor })
        
    }
    catch (error) {
        res.status(500).send({ msz: "Error", error: error.message })
    }
}


const logIn=async function(req,res){
try {
    const data=req.body
    const {email,password}=data
    if(!data){
        return res.status(400).send({status:false,msg:"please provide data"})
    }
    if(!email){
        return res.status(400).send({status:false,msg:"please provide email Id"})
    }
    if(!password){
        return res.status(400).send({status:false,msg:"please provide password"})
    }
    const logInData=await authorModel.findOne(data)
    if(!logInData){
        return res.status(400).send({status:false,msg:"email or password is invalid"})
    }
    const token=jwt.sign(
       {
        authorId:logInData._id.toString(),
        batch:"lithium",
        organisation:"function up"
       },"project-blog-secret-key"
    )
    res.status(200).send({status:true,msg:token})
    }
    catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports={createAuthor,logIn}
