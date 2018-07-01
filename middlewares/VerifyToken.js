const jwt = require('jsonwebtoken');
 
let verifyToken = (req, res, next) => {        
    let token = req.body.jwt;

    if(!token) return res.status(401).send({
        accepted: false,
        message: 'Security Error',
        errors: [{msg: 'No token provided'}]         
    });

    jwt.verify(token, global.env.JWT_SECRET, (err, decoded) => {      
        if(err) return res.status(500).send({
            accepted: true, 
            message: 'Security Error',
            errors: [{msg: 'Failed to authenticate token'}] 
        });
        
        req.id = decoded.id;
        next();
    });
}

module.exports = verifyToken;