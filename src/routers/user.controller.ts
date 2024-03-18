import { Request, Response, NextFunction } from "express";
import User from "../models/user";

  
export const getUser=async(req:Request,res:Response ,next:NextFunction)=>{

const currentUser=await User.findOne({_id:req.userId})
if(!currentUser){
  return next({ message: "User Not Found", cause: 404 });
}
res.json(currentUser);
}
export const createCurrentuser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth0Id } = req.body;
  const existingUser = await User.findOne({ auth0Id });
  if (existingUser) {
    next({ message: "User Found", cause: 200 });
  }
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser.toObject())
};

export const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, addressLine1, country, city } = req.body;

  
    const user = await User.findById(req.userId);

    if (!user) {
       next({ message: "User Found", cause: 200 });
    }

  else{  user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();}

    res.send(user);}