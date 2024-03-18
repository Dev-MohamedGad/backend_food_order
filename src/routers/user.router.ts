import { Router } from "express";
import * as userControllter from "./user.controller";
import expressAsyncHandler from "express-async-handler";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";

const userRouter = Router();

userRouter.get('/',jwtCheck,jwtParse,expressAsyncHandler(userControllter.getUser))
userRouter.post(
  "/createuser",
  jwtCheck,
  expressAsyncHandler(userControllter.createCurrentuser)
);

userRouter.put(
  "/updateuser",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  expressAsyncHandler(userControllter.updateCurrentUser)
);

export default userRouter;
