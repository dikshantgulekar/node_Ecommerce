import express from "express";
import { registerpage,loginpage,passwordpage,forgotpage,profilepage,indexpage, loginactionpage, registeractionpage,  passwordactionpage, singleproductpage, filterproductbycategory, addInCart, cartPage, deleteFromCart, checkoutPage,failureData,successData,paymentAction} from "../../controllers/user/controller.js";
const userroute = express.Router();



userroute
.get("/" , indexpage)
.get("/single-product/:productid" , singleproductpage)
.get("/register", registerpage)
.get("/login", loginpage)
.get("/password", passwordpage)
.get("/forgot-password", forgotpage)
.get("/profile", profilepage)
.get("/cart", cartPage)
.get("/checkout", checkoutPage)
.post("/login-action", loginactionpage )
.post("/register-action", registeractionpage)
.post("/password-action", passwordactionpage)
.post("/filter-by-category", filterproductbycategory)
.post("/add-in-cart", addInCart)
.post("/delete-from-cart", deleteFromCart)
.post('/failure', failureData)
.post('/success', successData)
.post('/payment-action', paymentAction)

export default userroute;