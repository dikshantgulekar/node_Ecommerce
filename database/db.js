// mongodb+srv://admin:<db_password>@cluster1.3xukv.mongodb.net/

import mongoose from "mongoose";

async function dbconnect() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster20.veja3.mongodb.net/Ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to your MongoDB database!");
}

export default dbconnect;