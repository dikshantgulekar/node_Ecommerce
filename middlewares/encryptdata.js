import bcrypt from "bcryptjs";

var salt = bcrypt.genSaltSync(10);

function dataEncrypt(data){
    var hash = bcrypt.hashSync(data, salt);
    return hash;
}

function checkEncryptValue(content, encryptedString){
    return bcrypt.compareSync(content, encryptedString); 
}

export {
    dataEncrypt, checkEncryptValue
}