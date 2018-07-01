const url = require('url');
let urls = [    
    { name: '/fee', schema: ['amount'] },
    { name: '/request', schema: ['amount', 'account', 'email'] },
    { name: '/paid', schema: ['order'] },
    { name: '/login', schema: ['login', 'password'] },
    { name: '/set_wallet', schema: ['jwt', 'account', 'token'] },
    { name: '/get_wallet', schema: ['jwt', 'id'] },
    { name: '/remove_wallet', schema: ['jwt', 'id'] },
    { name: '/update_qiwi_token', schema: ['jwt', 'wallet', 'token'] },
    { name: '/set_checker', schema: ['jwt', 'id'] },    
    { name: '/set_wex', schema: ['jwt', 'key', 'secret'] },
    { name: '/add_comment', schema: ['name', 'email', 'text'] },
    { name: '/admin_comments', schema: ['jwt'] },
    { name: '/accept_comment', schema: ['jwt', 'comment'] },
    { name: '/delete_comment', schema: ['jwt', 'comment'] },
    { name: '/comments', schema: ['offset'] },
    { name: '/update_fee', schema: ['jwt', 'fee'] },
    { name: '/update_limit', schema: ['jwt', 'limit'] },
    { name: '/update_coupon_letter', schema: ['jwt', 'subject', 'text'] },
    { name: '/update_payout_letter', schema: ['jwt', 'subject', 'text'] },
    { name: '/add_contact', schema: ['jwt', 'name', 'value'] },
    { name: '/update_contact', schema: ['jwt', 'name', 'value'] },
];
let compare = (schema, pattern) => {   
    if(schema.sort().join(',') === pattern.sort().join(',')) {
        return true;
    } else {
        return false;
    }
}

function empty(obj) {
    return !Object.keys(obj).length;
}

let verifier = (req, res, next) => {       
    let req_url = url.parse(req.url).pathname;
    let req_schema = empty(req.body) ? req.query : req.body;  
    for (let i in urls) {
        let url = urls[i];
        if(url.name.match(req_url)) {                       
            if(compare(Object.keys(req_schema), url.schema)) {               
                return next();                
            }
        }
    }
    
    res.status(400).send({
        accepted: false
    });
}

module.exports = verifier;