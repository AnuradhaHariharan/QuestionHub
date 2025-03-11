import mongoose from "mongoose";

export const connectDb= async ()=>{
    await mongoose.connect('mongodb+srv://teachersportal:13101999@cluster0.78xgx.mongodb.net/teachers-portal').then(()=>console.log("db connected"))
}
