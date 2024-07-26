import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'


export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.header('Authorization');
        const token = authorizationHeader && authorizationHeader.startsWith('Bearer ') ? authorizationHeader.replace('Bearer ', '') : null
        if(!token) {
            return res.status(400).json({
                success: false,
                message: 'Token not found'
            })
        }
        try {
            const decode = jwt.verify(token, 'secretsuper');          //fix env varibel secret
            //inserting the payload in req object
            //@ts-ignore                                              //fix this type 
            req.user = decode;
        } catch (error) {
            console.log(error,'error in decoding jwt')
        }
        //calling next function
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}