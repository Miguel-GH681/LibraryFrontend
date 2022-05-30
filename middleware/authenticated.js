var jwt = require("jwt-simple");
var moment = require("moment");
var key = "Pr0gr4m4r3sd1v3rt1d0";

exports.ensureAuth = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message: "Petición sin autenticación"});
    } else{
        var token = req.headers.authorization.replace(/['"]+/g, "");
        try {
            var payload = jwt.decode(token, key);
            if(payload.exp <= moment().unix()){
                return res.status(403).send({message: 'Token expirado'});
            }
        } catch (error) {  
            return res.status(404).send({message: 'Token no válido'})
        }
        req.user = payload
        next();
    }
}