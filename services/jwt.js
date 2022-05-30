var jwt = require("jwt-simple");
var moment = require('moment');
var key = 'Pr0gr4m4r3sd1v3rt1d0';

exports.createToken = (user) =>{
    var payload = {
        sub: user.id_usuario,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role:user.role,
        iat: moment().unix(),
        exp: moment().add(2, "days").unix()
    }
    return jwt.encode(payload, key)
}