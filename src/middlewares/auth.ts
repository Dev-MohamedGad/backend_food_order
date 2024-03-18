import  jwt  from "jsonwebtoken";
import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

declare global {
    namespace Express {
      interface Request {
        auth0Id?: string;
        userId?: string;
      }
    }
  }
  
export const jwtCheck = auth({
    audience: process.env.Auth0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISUSERBaseURL,
    tokenSigningAlg: process.env.AUTH0_TOKENSIGNINGALG
  });

  export const jwtParse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }
  
    const token = authorization.split(" ")[1];
  
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      const auth0Id = decoded.sub;
  
      const user = await User.findOne({ auth0Id });
  
      if (!user) {
        return res.sendStatus(401);
      }
  
      req.auth0Id = auth0Id as string;
      req.userId = user._id.toString();
      next();
    
  };
  