import payUMoney from "payumoney_nodejs";

payUMoney.setProdKeys("6PqKSK15", "sAOVPuJG2X");
payUMoney.isProdMode(true);


import { emailvalidation,passwordvalidation,stringmatchvalidation,mobilevalidation,emptyvalidator } from "../../middlewares/validation.js";
import brandmodel from "../../models/brand/model.js";
import categorymodel from "../../models/category/model.js";
import productmodel from "../../models/product/model.js";
import { dataEncrypt, checkEncryptValue } from "../../middlewares/encryptdata.js";
import userModel from "../../models/user/model.js";

const registerpage = function(req,res){
    res.render("user/registerpage");
}
const loginpage = function(req,res){
    res.render("user/loginpage");
}
const passwordpage = function(req,res){
    res.render("user/passwordpage");
}
const forgotpage = function(req,res){
    res.render("user/forgotpasswordpage");
}
const profilepage = function(req,res){
    res.render("user/profilepage");
}
const indexpage = async function(req,res){
    try {
        var ansbrand = await brandmodel.find();
        var anscategory = await categorymodel.find();
        var ansproduct = await productmodel.find();
        res.render("index" , {x1:ansbrand , x2:anscategory , x3:ansproduct});

        
    } catch (err) {
         
    }
    
}


const loginactionpage = async function(req,res){
//    console.log(req.body);
var{email,password} = req.body;
var msg = "";
if(emailvalidation(email)){
    msg = "Email Id Required or Invalid"
}
else if(passwordvalidation(password)){
    msg = "Password is  Required or Invalid"
}
else{

    var resultFromDB = await userModel.find({email:email});
    if(resultFromDB.length>0){
        var dbPassword = resultFromDB[0].password;
        console.log(dbPassword);
        var answerAfterCompare = checkEncryptValue(password, dbPassword);
        console.log(answerAfterCompare , 'After')
        if(password == dbPassword){
            msg = 'Success';
        }
        else{
            msg = "Invalid Email ID or Password"
        }
    }
    else{
        msg = "Invalid Email Id or Password"
    }
}
res.send({message:msg});
}
const registeractionpage = async function(req,res){
    // console.log(req.body);

    var {name,mobile,confirmpassword,email,password} = req.body;
    var msg = "";
    if(emptyvalidator(name)){
        msg = "Name Required"
    }
    else if(mobilevalidation(mobile)){
        msg = "Mobile Required or Invalid"
    }

    else if(emailvalidation(email)){
        msg = "Email Id Required or Invalid"
    }
    else if(passwordvalidation(password)){
        msg = "Password is  Required or Invalid"
    }
    else if(stringmatchvalidation(password,confirmpassword)){
        msg = "Password and Confirm Password Does Not Match"
    }
    else{
        var dataSet = await userModel.find({email:email});
        console.log(dataSet);
        if(dataSet.length>0){
            msg = "User Exist with Given Email ID"
        }
        else{
            var ansPassword = dataEncrypt(password);
            console.log(ansPassword);

            var dataToInsert ={
                name:name,
                mobile:mobile,
                email:email,
                password:password
            }
            var instance = new userModel(dataToInsert);
            var resultAfterInsert = await instance.save();
            msg = "User Added SuccessFully";
        }
    }
    res.send({message:msg});


}
const passwordactionpage = function(req, res){
    var{cpassword, npassword, cnpassword} = req.body;

    var msg = "";
    if(emptyvalidator(cpassword) || passwordvalidation(cpassword)){
        msg = 'Current Password is incorrect';
    }
    else if(emptyvalidator(npassword) || passwordvalidation(npassword)){
        msg = 'New Password is incorrect';
    }    
    else if(cpassword == npassword){
        msg = 'New Password must be different from current password';
    }
    else if(npassword != cnpassword){
        msg = 'New Passsword does not match confirm new password';
    }
    else{
        msg = 'update password';
    }
    res.send({message:msg});
}

const singleproductpage = async function(req,res){
    var {productid} = req.params;
    try {
        var resultfromdb = await productmodel.findById(productid);
        res.render("singleproductpage",{x1:resultfromdb});
        
    } catch (err) {
        
    }
    
} 
const filterproductbycategory = async function(req,res){
    var {catid} = req.body;

    try {
        var resultfromDb = await productmodel.find({categoryid:catid});
        console.log(resultfromDb);
        res.send({resultfromDb:resultfromDb});
        
    } catch (err) {
        
    }

}

const addInCart = (req, res)=>{
    var proid = req.body.proid;
    console.log(req.cookies);
    let count = Object.keys(req.cookies).length;
    console.log(count);
    var expiryDate = new Date(Date.now() + 3600000);
    if(count == 0){
        var arr = [proid];
        res.cookie('mycart', JSON.stringify(arr), {expires:expiryDate}).send({msg:"Record Added In Cart"});
    }
    else{
        console.log('2nd Product onword');
        var arrnew = JSON.parse(req.cookies.mycart);
        if(arrnew.includes(proid)){
            res.send({msg:"Product Exist In Cart"});
        }
        else{
            arrnew.push(proid);
            res.cookie('mycart', JSON.stringify(arrnew), {expires:expiryDate}).send({msg:'Record Added in Cart'})
        }
    }
}

const cartPage = async function(req,res){
    // console.log(req.cookies);
    // console.log(req.cookies["mycart"] != undefined);  // console.log(req.cookies);
    // console.log(req.cookies["mycart"] != undefined);
    if(req.cookies["mycart"]!== undefined){
    var allId = JSON.parse(req.cookies["mycart"]);
    // console.log(allId);

    try{
        var dataSet = await productmodel.find({_id:{$in:allId}});
        console.log(dataSet);

        res.render('cartPageView', {status:true, data:dataSet});
    }
    catch(err){

    }
}
    else{
        res.render('cartPageView', {status:false});
    }
}


function deleteFromCart(req,res){
  console.log(req.body);
  var id = req.body.proid;
  console.log(id);
  
  var dataSet = JSON.parse(req.cookies.mycart);
  console.log(dataSet);

  if(dataSet.length == 1){
    res.clearCookie('mycart').send({msg:"Product Deleted"});
  }
  else{
    var indexNo = dataSet.indexOf(id);
    console.log(indexNo)
    dataSet.splice(indexNo,1);
    console.log(dataSet);

    var expiryDate = new Date(Date.now() + 3600000);
    res.cookie('mycart',JSON.stringify(dataSet), {expires:expiryDate}).send({msg:"Record Deleted From Cart"});
  }
}

const checkoutPage = async function(req,res){
    if(req.cookies["mycart"]!== undefined){
        var allId = JSON.parse(req.cookies["mycart"]);
        // console.log(allId);
    
        try{
            var dataSet = await productmodel.find({_id:{$in:allId}});
            console.log(dataSet);
    
            res.render('checkoutPageView', {status:true, data:dataSet});
        }
        catch(err){
    
        }
    }
}

const successData = function(req,res){
    console.log(req.body);
    res.send('success');
}

const failureData = function(req,res){
    console.log(req.body);
    res.send('failure');
}


const paymentAction = function(req,res){

    var randomNumber = Math.round(Math.random()*1000000000000);
    req.body.txnid = randomNumber;
    req.body.surl = 'http:localhost:9009/success';
    req.body.furl = 'http:localhost:9009/failure';
    console.log(req.body);

    payUMoney.pay(req.body, function(error, response) {
        if (error) {
           console.log(response);
        } else {
           console.log(response);
           res.redirect(response);
        }
      });
}
export{
    registerpage,
    loginpage,
    passwordpage,
    forgotpage,
    profilepage,
    indexpage,
    loginactionpage,
    registeractionpage,
    passwordactionpage,
    singleproductpage,
    filterproductbycategory,
    addInCart,
    cartPage,
    deleteFromCart,
    checkoutPage,
    failureData,
    successData,
    paymentAction

}