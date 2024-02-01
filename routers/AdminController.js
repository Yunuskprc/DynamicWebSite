const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../data/db');
const { mode } = require('crypto-js');

router.get('/',(req,res)=>{

    if(req.session.user == null){
        res.redirect('/login')
    }else{
        res.render('AdminBitkiYönetim')
    }
    
})

router.get('/iletisim',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        res.render('AdminİletişimBilgiYönetim')
    }
    
})



module.exports = router;