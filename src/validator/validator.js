const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false

    return true; 
}

const isValidRequestBody = function
    (requestBody) {
    return Object.keys(requestBody).length >
        0;
}

const isvalidemail=function(value){
   return  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value) 
    
}



const checkPassword=function(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}


const NAME_REGEX = /^\\w+$/
const isValidName = (name) => NAME_REGEX.test(name)



module.exports={isValid,isValidRequestBody,isvalidemail,checkPassword,isValidName}
