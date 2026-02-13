import jwt from 'jsonwebtoken';
export function verifyToken(req,res,next){
    //token verfication logic

    //1.get token from req
      let signedToken=req.cookies.token;
      if(!signedToken){
        return res.status(401).json({message:"please login first"})
      }
    //2.verify the token(decode)
    jwt.verify(signedToken,"abcdef")
}