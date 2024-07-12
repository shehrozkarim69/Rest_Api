import cookie from "../middlewares";

const cookie = (req,res)=>{
const user = jwt.verify(token, process.env.TOKKENSECRET);
req.user = user;

    res.cookie('token',req.body.token,{
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true
    })
}

export default cookie;