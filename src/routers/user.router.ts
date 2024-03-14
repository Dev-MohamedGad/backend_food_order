import { Router } from "express";
 import * as userControllter from './user.controller'
import expressAsyncHandler from "express-async-handler";

const userRouter =Router()

userRouter.post('/',expressAsyncHandler(userControllter.createCurrentuser))



export default userRouter