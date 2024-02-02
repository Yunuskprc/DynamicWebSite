const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mysql = require('mysql');
const db = require('../data/db');


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    let mail = req.body.email;
    let password = req.body.password;

    db.query('Select *from users where mailAdress=? and password=?',[mail,sha256Hash(password)],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            req.session.user = mail;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        }else{
            res.send(error);
        }
    })
});

function sha256Hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = router;
